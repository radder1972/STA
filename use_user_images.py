import os
from PIL import Image

def process_user_images():
    brain_dir = '/Users/matthias/.gemini/antigravity/brain/acd87751-da16-4243-b024-dac813b45d2f'
    output_dir = '/Users/matthias/.gemini/antigravity/scratch/schema-therapy-app/public/images/schemas'
    
    # Get all media__ files
    files = [f for f in os.listdir(brain_dir) if f.startswith('media__') and f.endswith('.png')]
    # Sort by timestamp
    files.sort()
    
    # The last 18 files are the ones the user just uploaded
    user_files = files[-18:]
    print(f"Found {len(user_files)} user files.")
    
    if len(user_files) != 18:
        print("Error: Expected 18 files!")
        return
        
    names = [
        "Abandonment", "Mistrust", "Emotional deprivation", "Defectiveness_unlovability", "Social isolation_Alienation", "Practical incompetence_Dependence",
        "Vulnerability to harm_illness", "Enmeshment", "Failure to achieve", "Subjugation", "Self-sacrifice", "Admiration_Recognition-seeking",
        "Pessimism_Worry", "Emotional inhibition", "Unrelenting Standards", "Self-punitiveness", "Entitlement_Superiority", "Insufficient self-control_self-discipline"
    ]
    
    for i, f in enumerate(user_files):
        src = os.path.join(brain_dir, f)
        img = Image.open(src).convert('RGBA')
        
        # We need to paste this onto a white background so it looks good as a card!
        # The user uploaded RGBA. If they want white backgrounds, let's just flatten to white.
        # Create a solid white background of the same size
        bg = Image.new("RGB", img.size, (255, 255, 255))
        bg.paste(img, mask=img.split()[3]) # 3 is the alpha channel
        
        # Or maybe the user meant they wanted these to be completely clean. 
        # I'll just do a shrinkwrap on these as well to ensure they are perfectly centered and uniform!
        img_gray = bg.convert('L')
        w, h = bg.size
        min_x, min_y, max_x, max_y = w, h, 0, 0
        has_dark = False
        
        for y in range(h):
            for x in range(w):
                if img_gray.getpixel((x, y)) < 240:
                    min_x = min(min_x, x)
                    min_y = min(min_y, y)
                    max_x = max(max_x, x)
                    max_y = max(max_y, y)
                    has_dark = True
        
        if has_dark:
            pad = 6
            final_box = (
                max(0, min_x-pad),
                max(0, min_y-pad),
                min(w, max_x+pad),
                min(h, max_y+pad)
            )
            final_img = bg.crop(final_box)
        else:
            final_img = bg
            
        dst = os.path.join(output_dir, f"{names[i]}.png")
        final_img.save(dst, "PNG")
        print(f"Processed {names[i]}")

process_user_images()
