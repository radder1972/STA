import os
from PIL import Image

def make_uniform_mode_cards():
    brain_dir = '/Users/matthias/.gemini/antigravity/brain/acd87751-da16-4243-b024-dac813b45d2f'
    output_dir = '/Users/matthias/.gemini/antigravity/scratch/schema-therapy-app/public/images/modes'
    
    os.makedirs(output_dir, exist_ok=True)
    
    files = [f for f in os.listdir(brain_dir) if f.startswith('media__') and f.endswith('.png')]
    files.sort()
    # The last 14 files are the ones the user uploaded for the modes!
    user_files = files[-14:]
    
    names = [
        "kk", # 1. Kwetsbare kind
        "rk", # 2. Razende kind
        "ik", # 3. Impulsieve kind
        "wi", # 4. Willoze inschikkelijke
        "oz", # 5. Onthechte zelfsusser
        "ob", # 6. Onthechte beschermer
        "vo", # 7. Veeleisende ouder
        "so", # 8. Straffende ouder
        "wk", # 9. Wantrouwende overcontroleerder
        "pa", # 10. Pest en aanval
        "zh", # 11. Zelfverheerlijker
        "gv", # 12. Gezonde volwassene
        "bk", # 13. Blije kind
        "ok", # 14. Ongedisciplineerde kind
    ]
    
    card_w = 192
    card_h = 230
    
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
            
        # Create a new white card
        card = Image.new("RGB", (card_w, card_h), (255, 255, 255))
        
        # Center the drawing on the card
        offset_x = (card_w - final_img.size[0]) // 2
        offset_y = (card_h - final_img.size[1]) // 2
        
        card.paste(final_img, (offset_x, offset_y))
        
        dst = os.path.join(output_dir, f"{names[i]}.png")
        card.save(dst, "PNG")
        print(f"Saved mode card {names[i]}")

make_uniform_mode_cards()
