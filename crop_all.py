import sys
from PIL import Image

def extract_all_boxes(img_path, output_dir):
    img = Image.open(img_path).convert('RGBA')
    width, height = img.size
    print(f"Image size: {width}x{height}")
    
    # 3 rows, 6 cols
    # Header top ~ 80px
    # Let's just use mathematical grid
    # Top margin ~ 85, Bottom margin ~ 10
    # Left margin ~ 30, Right margin ~ 30
    
    margin_top = 80
    margin_bottom = 15
    margin_left = 30
    margin_right = 30
    
    grid_w = width - margin_left - margin_right
    grid_h = height - margin_top - margin_bottom
    
    box_w = grid_w / 6
    box_h = grid_h / 3
    
    names = [
        "Abandonment", "Mistrust", "Emotional deprivation", "Defectiveness_unlovability", "Social isolation_Alienation", "Practical incompetence_Dependence",
        "Vulnerability to harm_illness", "Enmeshment", "Failure to achieve", "Subjugation", "Self-sacrifice", "Admiration_Recognition-seeking",
        "Pessimism_Worry", "Emotional inhibition", "Unrelenting Standards", "Self-punitiveness", "Entitlement_Superiority", "Insufficient self-control_self-discipline"
    ]
    
    import os
    os.makedirs(output_dir, exist_ok=True)
    
    idx = 0
    for row in range(3):
        for col in range(6):
            if idx >= len(names): break
            
            l = margin_left + col * box_w
            t = margin_top + row * box_h
            r = l + box_w
            b = t + box_h
            
            # The box has a black border. Let's crop slightly inside
            # And crop the bottom text (approx 20% of box height)
            crop_l = int(l + 4)
            crop_r = int(r - 4)
            crop_t = int(t + 4)
            crop_b = int(b - 45) # text is at bottom
            
            box = img.crop((crop_l, crop_t, crop_r, crop_b))
            
            # Make white transparent
            data = box.getdata()
            new_data = []
            for item in data:
                # item is (R, G, B, A)
                # If it's bright (e.g. > 200), make it transparent
                if item[0] > 200 and item[1] > 200 and item[2] > 200:
                    new_data.append((255, 255, 255, 0))
                else:
                    # Keep black lines, but maybe make them pure black for cleaner invert later
                    new_data.append((0, 0, 0, item[3]))
                    
            box.putdata(new_data)
            
            filename = os.path.join(output_dir, f"{names[idx]}.png")
            box.save(filename, "PNG")
            print(f"Saved {filename}")
            
            idx += 1

extract_all_boxes('/Users/matthias/.gemini/antigravity/brain/acd87751-da16-4243-b024-dac813b45d2f/media__1790267458147.png', '/Users/matthias/.gemini/antigravity/scratch/schema-therapy-app/public/images/schemas')
