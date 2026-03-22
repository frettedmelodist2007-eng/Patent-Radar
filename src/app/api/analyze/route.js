import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

// Simple in-memory cache
const analysisCache = new Map();

export async function POST(request) {
  try {
    const { idea } = await request.json();

    if (!idea) {
      return NextResponse.json({ error: "Idea description is required" }, { status: 400 });
    }

    const cacheKey = idea.toLowerCase().trim();
    if (analysisCache.has(cacheKey)) {
      console.log("Serving from cache for:", cacheKey);
      return NextResponse.json(analysisCache.get(cacheKey));
    }

    const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "AIzaSyDZPe2tsc2W6c24OdB8OJPIXzWrZ0Ktm84";
    const SERPAPI_KEY = process.env.SERPAPI_KEY;

    // STEP 1: Extract Keywords using Gemini
    const keywordPrompt = `Extract 3 to 6 highly relevant technical keywords from the following invention idea for a patent search.
Return ONLY a comma-separated list of keywords, nothing else.

Invention Idea: "${idea}"`;

    let keywords = [];
    try {
      const kwResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: keywordPrompt }] }],
            generationConfig: { temperature: 0.1 }
          }),
        }
      );
      if (kwResponse.ok) {
        const kwData = await kwResponse.json();
        const kwText = kwData.candidates[0].content.parts[0].text;
        keywords = kwText.split(',').map(k => k.trim().replace(/['"]/g, '')).filter(k => k.length > 0);
      }
    } catch (e) {
      console.error("Keyword extraction failed", e);
    }

    // Default keywords if extraction fails
    if (keywords.length === 0) {
      keywords = ["smart device", "system", "method"];
    }

    // STEP 2: Fetch from SerpAPI
    let patents = [];
    if (SERPAPI_KEY) {
      try {
        const query = `${keywords.join(" OR ")} patent`;
        // Limit top 5 patents
        const serpUrl = `https://serpapi.com/search.json?engine=google_patents&q=${encodeURIComponent(query)}&num=5&api_key=${SERPAPI_KEY}`;
        const serpResponse = await fetch(serpUrl);
        if (serpResponse.ok) {
          const serpData = await serpResponse.json();
          if (serpData.organic_results) {
            patents = serpData.organic_results.slice(0, 5).map(p => ({
              title: p.title,
              snippet: p.snippet,
              link: p.link,
              patent_id: p.patent_id || p.publication_number
            }));
          }
        } else {
             console.error("SerpAPI returned error", await serpResponse.text());
        }
      } catch (e) {
        console.error("SerpAPI fetch failed", e);
      }
    }

    // Handle Empty/Weak Results
    let finalPatentsContext = "";
    if (!patents || patents.length === 0) {
      finalPatentsContext = "No strong patent matches found. Proceed with standard AI evaluation. Note: The database search returned 0 results.";
    } else {
      finalPatentsContext = patents.map((p, i) => `[${i+1}] Title: ${p.title}\nSnippet: ${p.snippet}\nLink: ${p.link}`).join('\n\n');
    }

    // STEP 3: Deep Comparison + Similarity Scores via Gemini
    const analysisPrompt = `You are an expert patent analyst. Your task is to review the User's Invention Idea and a pre-retrieved list of Existing Patents.

User Invention Idea: "${idea}"

Existing Patents:
${finalPatentsContext}

INSTRUCTIONS:
1. Evaluate the similarity between the user idea and each existing patent.
2. For each patent provided in the Existing Patents list, assign a similarity score (0-100) and concisely describe the overlap.
3. Compute a Novelty Score (0-100). Important logic:
   - If patents were found, the NOVELTY SCORE MUST BE CALCULATED AS: 100 - (average similarity of top patents). Adjust slightly based on unique points.
   - If no patent matches were found in the database, set the novelty score to 85.
4. Set a risk_level ("Low", "Medium", "High").
5. Determine confidence ("High", "Medium", "Low") based on the number and quality of matches. High if multiple strong matches exist, Low if no strong patent matches found.

Respond STRICTLY with a raw JSON object (NO markdown tags, NO \`\`\`json) matching this schema:
{
  "summary": "2-3 paragraphs explaining the patentability",
  "novelty_score": 85,
  "risk_level": "Low",
  "confidence": "Low",
  "similarities": ["point 1"],
  "unique_points": ["point 1"],
  "improvements": ["suggestion 1"],
  "patent_analysis": [
    {
      "title": "<patent title from Existing Patents list>",
      "similarity": 75,
      "overlap": "<brief description of overlap>"
    }
  ]
}

If no patents were provided in the Existing Patents list, return an empty array [] for patent_analysis and state a warning in the summary.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: analysisPrompt }] }],
          generationConfig: { temperature: 0.1, responseMimeType: "application/json" }
        }),
      }
    );

    if (response.ok) {
      const result = await response.json();
      const text = result.candidates[0].content.parts[0].text;
      const parsed = JSON.parse(text);

      const finalResult = {
        ...parsed,
        keywords
      };

      // Ensure links are present in patent_analysis if they matched
      if (finalResult.patent_analysis && Array.isArray(finalResult.patent_analysis)) {
        finalResult.patent_analysis = finalResult.patent_analysis.map(pa => {
           const matchedPatent = patents.find(p => p.title.toLowerCase().includes(pa.title.toLowerCase()) || pa.title.toLowerCase().includes(p.title.toLowerCase()));
           if (matchedPatent) {
               pa.link = matchedPatent.link;
           }
           return pa;
        });
      } else {
        finalResult.patent_analysis = [];
      }

      // Cache the result
      analysisCache.set(cacheKey, finalResult);

      return NextResponse.json(finalResult);
    } else {
      const errText = await response.text();
      console.error("Gemini Analysis Failure:", errText);
      throw new Error("Gemini API rejected request");
    }

  } catch (error) {
    console.error("Analysis route error:", error);
    return NextResponse.json({ error: "Internal server error: " + error.message }, { status: 500 });
  }
}
