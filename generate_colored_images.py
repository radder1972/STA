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
        # Detect grey pixels: not pure black, not pure white, and R,G,B are similar
        if a > 0 and r > 30 and r < 230 and abs(r - g) < 25 and abs(g - b) < 25:
            # Tint it with the target color
            # Use luminance to determine how light the color should be
            luminance = r / 255.0
            # Blend original with target color
            new_r = int(target_r * luminance + r * (1 - luminance) * 0.2)
            new_g = int(target_g * luminance + g * (1 - luminance) * 0.2)
            new_b = int(target_b * luminance + b * (1 - luminance) * 0.2)
            # Make sure we don't exceed 255
            new_r = min(255, max(0, new_r))
            new_g = min(255, max(0, new_g))
            new_b = min(255, max(0, new_b))
            new_data.append((new_r, new_g, new_b, a))
        else:
            new_data.append(item)
            
    img.putdata(new_data)
    img.save(output_path)

# Process all images
base_dir = 'src/assets/images'
target_color = '#4f46e5' # Indigo 600

for root, dirs, files in os.walk(base_dir):
    for file in files:
        if file.endswith('.png') and not file.endswith('_color.png'):
            input_path = os.path.join(root, file)
            output_path = os.path.join(root, file.replace('.png', '_color.png'))
            tint_image(input_path, output_path, target_color)
            print(f"Generated {output_path}")

print("Done generating colored images.")
