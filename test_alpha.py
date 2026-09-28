from PIL import Image
import os

img = Image.open('src/assets/images/schemas/Abandonment.png').convert("RGBA")
data = list(img.getdata())

# Check alpha distribution
alphas = [p[3] for p in data]
from collections import Counter
c = Counter(alphas)
for a, count in sorted(c.items())[:20]:
    if count > 100:
        print(f"Alpha {a}: {count} pixels")
