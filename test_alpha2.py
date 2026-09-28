from PIL import Image

img = Image.open('src/assets/images/schemas/Abandonment.png').convert("RGBA")
data = list(img.getdata())

# Check alpha distribution for high values
alphas = [p[3] for p in data]
from collections import Counter
c = Counter(alphas)
for a, count in sorted(c.items(), reverse=True)[:20]:
    if count > 100:
        print(f"Alpha {a}: {count} pixels")
