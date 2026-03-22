const fs = require('fs');
const path = require('path');

const NUM_PATENTS = 20000;
const OUTPUT_FILE = path.join(__dirname, '..', 'src', 'data', 'fullPatents.json');

const categories = {
  "Smart Appliances": {
    apps: ["IoT enabled water purifier", "smart ceiling fan", "AI powered induction cooktop", "automated chapati maker", "energy efficient refrigerator", "smart microwave oven", "voice-controlled lighting", "automated washing machine", "smart geyser", "UV automated sterilizer"],
    methods: ["sensor-based optimization", "IoT connectivity module", "machine learning pattern recognition", "app-based remote control", "automated diagnostic system", "energy management chip"]
  },
  "FinTech & Business": {
    apps: ["UPI integration method", "micro-lending risk assessment", "kirana store inventory management", "peer-to-peer payment gateway", "blockchain land registry", "smart contract escrow", "automated GST billing", "rural banking kiosk", "fraud detection algorithm", "digital gold investment platform"],
    methods: ["distributed ledger technology", "predictive risk modeling", "automated clearing house protocol", "biometric authentication", "QR payment settlement", "machine learning credit scoring"]
  },
  "Consumer Products": {
    apps: ["ergonomic office chair", "sustainable bamboo toothbrush", "biodegradable packaging", "pollution-filtering face mask", "smart water bottle", "fitness tracking ring", "anti-theft backpack", "solar-powered power bank", "cooling mattress", "copper-infused water dispenser"],
    methods: ["advanced composite materials", "aerodynamic design", "sustainable manufacturing process", "nanotech filtering", "thermo-regulating fabric", "shock-absorbent mechanism"]
  },
  "Agritech": {
    apps: ["smart irrigation controller", "soil moisture sensor network", "drone-based pesticide sprayer", "solar-powered cold storage", "automated seed drill", "crop disease detection app", "livestock health monitor", "hydroponic yield optimizer", "farm-to-market logistics platform", "weather prediction model"],
    methods: ["multispectral imaging", "IoT sensor fusion", "predictive weather algorithms", "solar energy harvesting", "automated dispensing system", "blockchain traceability"]
  },
  "HealthTech": {
    apps: ["affordable ECG strip", "telemedicine kiosk", "portable oxygen concentrator", "diabetic foot scanner", "ayurvedic formulation analyzer", "smart pill dispenser", "AI radiology screener", "remote fetal monitor", "wearable asthma detector", "non-invasive glucose monitor"],
    methods: ["optical sensor array", "computer vision diagnostics", "telemetry communication protocol", "machine learning anomaly detection", "microfluidic analysis", "secure cloud synchronization"]
  }
};

const adjectives = ["Advanced", "Efficient", "Integrated", "Low-cost", "Smart", "Automated", "Adaptive", "Portable", "Scalable", "Robust", "Sustainable", "Predictive"];
const countries = ["India", "India", "India", "India", "India", "India", "India", "India", "India", "United States", "Singapore", "Japan"];

function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateDescription(category, data) {
  const app = randomChoice(data.apps);
  const method = randomChoice(data.methods);
  const adj = randomChoice(adjectives);
  
  const templates = [
    `A ${adj.toLowerCase()} system detailing a ${app} utilizing a ${method} to improve efficiency and lower costs in the Indian market.`,
    `An invention relating to a ${adj.toLowerCase()} ${method} deployed within a ${app}, providing real-time data analysis and operational optimization.`,
    `A novel architecture for a ${app} comprising a ${adj.toLowerCase()} ${method} designed specifically to function reliably under varying network and power conditions.`,
    `Method and apparatus for an ${adj.toLowerCase()} ${app} using ${method} for enhanced consumer experience and automated diagnostics.`,
    `A scalable integration of a ${method} into a ${app}, featuring scalable controls and a robust ${adj.toLowerCase()} framework.`
  ];
  
  return randomChoice(templates);
}

console.log("Loading existing patents...");
let existingPatents = [];
try {
  if (fs.existsSync(OUTPUT_FILE)) {
    const fileContent = fs.readFileSync(OUTPUT_FILE, 'utf8');
    existingPatents = JSON.parse(fileContent);
    console.log(`Found ${existingPatents.length} existing patents.`);
  }
} catch (e) {
  console.log("Could not load existing patents. Starting fresh.");
}

console.log(`Generating ${NUM_PATENTS} new Indian-focused patents...`);
let newPatents = [];

// Determine starting ID suffix
let startId = existingPatents.length + 1;

const categoryKeys = Object.keys(categories);

for (let i = 0; i < NUM_PATENTS; i++) {
  const category = randomChoice(categoryKeys);
  const fieldData = categories[category];
  const country = randomChoice(countries);
  const year = Math.floor(Math.random() * (2026 - 2015 + 1)) + 2015; // 2015 to 2026
  
  const description = generateDescription(category, fieldData);
  const title = `${randomChoice(adjectives)} ${randomChoice(fieldData.apps)} Technology in ${country}`;
  
  newPatents.push({
    id: `PAT-2026-${String(startId + i).padStart(5, '0')}`,
    title: title,
    abstract: description,
    category: category,
    year: String(year),
    country: country
  });
}

const finalDataset = existingPatents.concat(newPatents);

console.log(`Writing total ${finalDataset.length} patents to JSON...`);
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(finalDataset, null, 0), 'utf8');

console.log(`Successfully augmented database. New file size: ${(fs.statSync(OUTPUT_FILE).size / 1024 / 1024).toFixed(2)} MB`);
