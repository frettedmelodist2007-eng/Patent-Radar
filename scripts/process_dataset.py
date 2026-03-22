import csv
import json
import random

input_file = "C:\\Users\\acer\\Desktop\\abcd_backup\\patents_dataset.csv"
output_file = "C:\\Users\\acer\\Desktop\\abcd\\src\\data\\mockPatents.js"

try:
    with open(input_file, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        all_patents = list(reader)

    random.seed(123)
    sample_patents = random.sample(all_patents, 100)

    formatted_patents = []
    for i, p in enumerate(sample_patents):
        formatted_patents.append({
            "id": f"PAT-2026-{str(i+1).zfill(4)}",
            "year": p["Year of Patent"],
            "country": p["Country of Registration"],
            "category": p["Field of Patent"],
            "title": f"{p['Field of Patent']} Innovation in {p['Country of Registration']}",
            "abstract": p["Patent Description"],
            "score": random.randint(60, 98)
        })

    js_content = f"export const mockPatents = {json.dumps(formatted_patents, indent=2)};\n"

    # Ensure dir exists
    import os
    os.makedirs(os.path.dirname(output_file), exist_ok=True)

    with open(output_file, "w", encoding="utf-8") as f:
        f.write(js_content)
    
    print("Successfully created mockPatents.js")
except Exception as e:
    print(f"Error: {e}")
