import os
import glob
from PIL import Image

def tint_image(input_path, output_path, target_color_hex):
    img = Image.open(input_path).convert("RGBA")
    data = img.getdata()
    
    target_r = int(target_color_hex[1:3], 16)
    target_g = int(target_color_hex[3:5], 16)
    target_b = int(target_color_hex[5:7], 16)
    
    new_data = []
    for item in data:
        r, g, b, a = item
        # Detect grey pixels
        if a > 0 and r > 30 and r < 230 and abs(r - g) < 25 and abs(g - b) < 25:
            new_data.append((target_r, target_g, target_b, a))
        else:
            new_data.append(item)
            
    img.putdata(new_data)
    img.save(output_path)

base_dir = 'src/assets/images'
target_color = '#14b8a6' # Light teal

for root, dirs, files in os.walk(base_dir):
    for file in files:
        if file.endswith('.png') and not file.endswith('_teal.png'):
            input_path = os.path.join(root, file)
            output_path = os.path.join(root, file.replace('.png', '_teal.png'))
            tint_image(input_path, output_path, target_color)

print("Done generating teal images.")
