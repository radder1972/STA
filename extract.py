import fitz
import json
import os
import re

def extract_pdf_questions(pdf_path, type):
    doc = fitz.open(pdf_path)
    text = ""
    for page in doc:
        text += page.get_text()
    
    questions = []
    # Match "Vraag <num>" followed by the text until the next "Vraag" or "Waarde tussen"
    pattern = re.compile(r'Vraag \d+\n(.*?)\n(?:Waarde tussen|Vraag \d+|In welke mate|Naar resultaat)', re.DOTALL)
    matches = pattern.findall(text)
    
    # Alternatively, just split by Vraag
    parts = text.split('Vraag ')
    for i in range(1, len(parts)):
        part = parts[i]
        # First word is the number
        num_str = part.split()[0]
        if num_str.isdigit():
            # Get the rest until "Waarde tussen"
            q_text = part[len(num_str):].split('Waarde tussen')[0].strip()
            q_text = q_text.split('Vraag')[0].strip() # in case it misses
            if q_text:
                q_text = q_text.replace('\n', ' ')
                questions.append({'id': int(num_str), 'text': q_text})
                
    return questions

ysq_path = '/Users/matthias/.gemini/antigravity/brain/acd87751-da16-4243-b024-dac813b45d2f/media__1790153114641.pdf'
smi_path = '/Users/matthias/.gemini/antigravity/brain/acd87751-da16-4243-b024-dac813b45d2f/media__1790153114644.pdf'

ysq_questions = extract_pdf_questions(ysq_path, 'ysq')
smi_questions = extract_pdf_questions(smi_path, 'smi')

print(f"Extracted {len(ysq_questions)} YSQ questions and {len(smi_questions)} SMI questions.")

os.makedirs('/Users/matthias/.gemini/antigravity/scratch/schema-therapy-app/src', exist_ok=True)
with open('/Users/matthias/.gemini/antigravity/scratch/schema-therapy-app/src/ysq-s3.json', 'w') as f:
    json.dump(ysq_questions, f, indent=2, ensure_ascii=False)

with open('/Users/matthias/.gemini/antigravity/scratch/schema-therapy-app/src/smi.json', 'w') as f:
    json.dump(smi_questions, f, indent=2, ensure_ascii=False)
