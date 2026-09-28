import re

with open('/Users/matthias/.gemini/antigravity/scratch/schema-therapy-app/src/components/Tafelopstelling.jsx', 'r') as f:
    content = f.read()

# 1. Increase padding of the instruction box
content = content.replace("padding: '2.5rem 4rem'", "padding: '3rem 5rem'")

# 2. Increase margin around StepBadge
# In the instructions list
content = content.replace("<div style={{ marginTop: '2px' }}><StepBadge", "<div style={{ marginTop: '2px', marginRight: '0.8rem' }}><StepBadge")

# And increase gap between instruction items from 1.5rem to 2rem
content = content.replace("gap: '1.5rem', color: 'var(--text-main)', lineHeight: '1.6'", "gap: '2.5rem', color: 'var(--text-main)', lineHeight: '1.6'")

with open('/Users/matthias/.gemini/antigravity/scratch/schema-therapy-app/src/components/Tafelopstelling.jsx', 'w') as f:
    f.write(content)

