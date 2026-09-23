import json
import re

transcript_path = '/Users/matthias/.gemini/antigravity/brain/acd87751-da16-4243-b024-dac813b45d2f/.system_generated/logs/transcript_full.jsonl'

with open(transcript_path, 'r') as f:
    lines = f.readlines()

first_message = ""
for line in lines:
    data = json.loads(line)
    if data.get('type') == 'SYSTEM_MESSAGE':
        # the system message might contain the pdfs
        content = data.get('content', '')
        if 'YSQ S3 vragenlijst' in content and 'Schemamodi vragenlijst' in content:
            first_message = content
            break
    if data.get('type') == 'USER_INPUT':
        content = data.get('content', '')
        if 'YSQ S3 vragenlijst' in content:
            first_message = content
            break

if not first_message:
    print("Could not find the OCR text in the transcript.")
    exit(1)

# Split into YSQ and SMI parts (roughly)
ysq_part = first_message.split('Schemamodi vragenlijst')[0]
smi_part = first_message.split('Schemamodi vragenlijst')[1]

def extract_questions(text):
    questions = []
    # Match "Vraag <num>" followed by the text until the next "Vraag" or "Waarde tussen"
    pattern = re.compile(r'Vraag \d+\n(.*?)\n(?:Waarde tussen|Vraag \d+|In welke mate|Naar resultaat)', re.DOTALL)
    matches = pattern.findall(text)
    for idx, match in enumerate(matches):
        q_text = match.strip().replace('\n', ' ')
        if q_text:
            questions.append({
                'id': idx + 1,
                'text': q_text
            })
    return questions

ysq_questions = extract_questions(ysq_part)
smi_questions = extract_questions(smi_part)

print(f"Extracted {len(ysq_questions)} YSQ questions and {len(smi_questions)} SMI questions.")

import os
os.makedirs('/Users/matthias/.gemini/antigravity/scratch/schema-therapy-app/src', exist_ok=True)

with open('/Users/matthias/.gemini/antigravity/scratch/schema-therapy-app/src/ysq-s3.json', 'w') as f:
    json.dump(ysq_questions, f, indent=2, ensure_ascii=False)

with open('/Users/matthias/.gemini/antigravity/scratch/schema-therapy-app/src/smi.json', 'w') as f:
    json.dump(smi_questions, f, indent=2, ensure_ascii=False)
