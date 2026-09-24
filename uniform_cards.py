import os
from PIL import Image

def make_uniform_cards():
    brain_dir = '/Users/matthias/.gemini/antigravity/brain/acd87751-da16-4243-b024-dac813b45d2f'
    output_dir = '/Users/matthias/.gemini/antigravity/scratch/schema-therapy-app/public/images/schemas'
    
    files = [f for f in os.listdir(brain_dir) if f.startswith('media__') and f.endswith('.png')]
    files.sort()
    user_files = files[-18:]
    
    names = [
        "Abandonment", "Mistrust", "Emotional deprivation", "Defectiveness_unlovability", "Social isolation_Alienation", "Practical incompetence_Dependence",
        "Vulnerability to harm_illness", "Enmeshment", "Failure to achieve", "Subjugation", "Self-sacrifice", "Admiration_Recognition-seeking",
        "Pessimism_Worry", "Emotional inhibition", "Unrelenting Standards", "Self-punitiveness", "Entitlement_Superiority", "Insufficient self-control_self-discipline"
    ]
    
    # 1. Find the maximum width and height among all shrinkwrapped user images
    images = []
    max_w, max_h = 0, 0
    
    for i, f in enumerate(user_files):
        src = os.path.join(brain_dir, f)
        img = Image.open(src).convert('RGBA')
        
        # Shrinkwrap first to get the true size of the drawing
        bg = Image.new("RGB", img.size, (255, 255, 255))
        bg.paste(img, mask=img.split()[3])
        
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
            final_img = bg.crop((min_x, min_y, max_x, max_y))
        else:
            final_img = bg
            
        images.append((final_img, names[i]))
        
        if final_img.size[0] > max_w: max_w = final_img.size[0]
        if final_img.size[1] > max_h: max_h = final_img.size[1]
        
    print(f"Max drawing dimensions: {max_w}x{max_h}")
    
    # 2. Create the playing cards
    # Let's add a consistent padding of 15px around the largest dimension
    card_w = max_w + 30
    card_h = max_h + 30
    
    # Maybe make it a standard aspect ratio? Playing cards are 2.5 : 3.5 (1 : 1.4)
    # Let's just make it a nice rectangle.
    if card_h < card_w * 1.2:
        card_h = int(card_w * 1.2)
        
    print(f"Standardized Card Size: {card_w}x{card_h}")
    
    for img, name in images:
        # Create a new white card
        card = Image.new("RGB", (card_w, card_h), (255, 255, 255))
        
        # Center the drawing on the card
        offset_x = (card_w - img.size[0]) // 2
        offset_y = (card_h - img.size[1]) // 2
        
        card.paste(img, (offset_x, offset_y))
        
        dst = os.path.join(output_dir, f"{name}.png")
        card.save(dst, "PNG")
        print(f"Saved uniform card {name}")

make_uniform_cards()
