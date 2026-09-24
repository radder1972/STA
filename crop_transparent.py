import os
from PIL import Image

def process_transparent():
    img_path = '/Users/matthias/.gemini/antigravity/brain/acd87751-da16-4243-b024-dac813b45d2f/media__1790268314386.png'
    output_dir = '/Users/matthias/.gemini/antigravity/scratch/schema-therapy-app/public/images/schemas'
    
    img = Image.open(img_path).convert('RGBA')
    width, height = img.size
    print(f"Image size: {width}x{height}")
    
    # We will slice mathematically since there are no borders
    # Let's assume standard layout
    margin_top = 80
    margin_bottom = 0
    margin_left = 15
    margin_right = 15
    
    grid_w = width - margin_left - margin_right
    grid_h = height - margin_top - margin_bottom
    
    box_w = grid_w / 6
    box_h = grid_h / 3
    
    names = [
        "Abandonment", "Mistrust", "Emotional deprivation", "Defectiveness_unlovability", "Social isolation_Alienation", "Practical incompetence_Dependence",
        "Vulnerability to harm_illness", "Enmeshment", "Failure to achieve", "Subjugation", "Self-sacrifice", "Admiration_Recognition-seeking",
        "Pessimism_Worry", "Emotional inhibition", "Unrelenting Standards", "Self-punitiveness", "Entitlement_Superiority", "Insufficient self-control_self-discipline"
    ]
    
    os.makedirs(output_dir, exist_ok=True)
    idx = 0
    
    for row in range(3):
        for col in range(6):
            if idx >= len(names): break
            
            l = margin_left + col * box_w
            t = margin_top + row * box_h
            r = l + box_w
            b = t + box_h
            
            # Crop bottom text (approx 45px)
            crop_t = int(t)
            crop_b = int(b - 45)
            crop_l = int(l)
            crop_r = int(r)
            
            box = img.crop((crop_l, crop_t, crop_r, crop_b))
            
            filename = os.path.join(output_dir, f"{names[idx]}.png")
            box.save(filename, "PNG")
            print(f"Saved {filename}")
            
            idx += 1

process_transparent()
