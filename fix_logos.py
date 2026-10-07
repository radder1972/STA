import re

files = ["public/facebook.html", "public/linkedin.html"]

avatar_old = r'<svg xmlns="http://www.w3.org/2000/svg"[^>]*>[\s\S]*?<path d="M9\.937[^>]*>[\s\S]*?</svg>'
avatar_new = '''<div style="display:inline-flex; align-items:center; position:relative; width:26px; height:18px;">
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style="position:absolute; left:5px; top:0px;">
    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" fill="white" />
  </svg>
  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" style="position:absolute; left:0px; top:1px; transform:rotate(-15deg);">
    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" fill="white" />
  </svg>
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" style="position:absolute; right:0px; bottom:0px; transform:rotate(18deg);">
    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" fill="white" />
  </svg>
</div>'''

watermark_old = r'<svg xmlns="http://www.w3.org/2000/svg"[^>]*>[\s\S]*?<defs>[\s\S]*?</defs>[\s\S]*?</svg>'
watermark_new = '''<div style="display:inline-flex; align-items:center; position:relative; width:48px; height:32px;">
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" style="position:absolute; left:10px; top:0px;">
    <defs>
      <linearGradient id="logo-gradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#0ea5e9" />
        <stop offset="100%" stop-color="#10b981" />
      </linearGradient>
    </defs>
    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" fill="url(#logo-gradient)" />
  </svg>
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style="position:absolute; left:0px; top:2px; transform:rotate(-15deg);">
    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" fill="#0ea5e9" />
  </svg>
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style="position:absolute; right:0px; bottom:1px; transform:rotate(18deg);">
    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" fill="#10b981" />
  </svg>
</div>'''

script_sparkle_old = r'<svg xmlns="http://www.w3.org/2000/svg" width="\${size}" height="\${size}" viewBox="0 0 24 24" fill="currentColor"><path d="M9\.937[^>]*></svg>'
script_sparkle_new = r'<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"/></svg>'

for file in files:
    try:
        with open(file, 'r') as f:
            content = f.read()
        
        # Replace avatar
        content = re.sub(avatar_old, avatar_new, content, count=1)
        # Replace watermark
        content = re.sub(watermark_old, watermark_new, content, count=1)
        # Replace script sparkle
        content = re.sub(script_sparkle_old, script_sparkle_new, content)
        
        with open(file, 'w') as f:
            f.write(content)
        print(f"Fixed {file}")
    except Exception as e:
        print(f"Error processing {file}: {e}")
