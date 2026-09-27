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
        # If it's not transparent and not purely white
        if a > 0 and (r < 240 or g < 240 or b < 240):
            # Calculate luminance (0.0 to 1.0)
            luminance = (r + g + b) / (3.0 * 255.0)
            
            # Map black to target color, white to white
            new_r = int(target_r * (1 - luminance) + 255 * luminance)
            new_g = int(target_g * (1 - luminance) + 255 * luminance)
            new_b = int(target_b * (1 - luminance) + 255 * luminance)
            
            new_r = min(255, max(0, new_r))
            new_g = min(255, max(0, new_g))
            new_b = min(255, max(0, new_b))
            
            new_data.append((new_r, new_g, new_b, a))
        else:
            new_data.append(item)
            
    img.putdata(new_data)
    img.save(output_path)

base_dir = 'src/assets/images'
target_color = '#0d9488' # Slightly deeper teal (teal-600) so lines are visible

for root, dirs, files in os.walk(base_dir):
    for file in files:
        if file.endswith('.png') and not file.endswith('_teal.png'):
            input_path = os.path.join(root, file)
            output_path = os.path.join(root, file.replace('.png', '_teal.png'))
            tint_image(input_path, output_path, target_color)
            print(f"Generated full tint for {output_path}")

print("Done generating full teal tint images.")
