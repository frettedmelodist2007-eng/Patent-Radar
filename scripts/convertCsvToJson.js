const fs = require('fs');
const { parse } = require('csv-parse/sync');
const path = require('path');

const inputPath = "C:\\Users\\acer\\Desktop\\abcd_backup\\patents_dataset.csv";
const outputPath = path.join(__dirname, '..', 'src', 'data', 'fullPatents.json');

console.log("Reading CSV...");
try {
  const fileContent = fs.readFileSync(inputPath, 'utf8');
  console.log("Parsing CSV...");
  const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true
  });

  const formattedData = records.map((r, i) => {
    // Generate keywords from the abstract (simple tokenization for the JSON to save time later, or just keep the abstract)
    // We'll keep just what's needed for the backend to remain fast.
    const titleText = `${r["Field of Patent"]} Innovation in ${r["Country of Registration"]} (${r["Year of Patent"]})`;
    
    return {
      id: `PAT-2026-${String(i+1).padStart(5, '0')}`,
      title: titleText,
      abstract: r["Patent Description"],
      category: r["Field of Patent"],
      year: r["Year of Patent"],
      country: r["Country of Registration"]
    };
  });

  console.log(`Writing ${formattedData.length} records to JSON...`);
  // Ensure dir exists
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(formattedData, null, 0), 'utf8');
  console.log(`Successfully created ${outputPath}. File size: ${(fs.statSync(outputPath).size / 1024 / 1024).toFixed(2)} MB`);
} catch (error) {
  console.error("Error processing dataset:", error);
}
