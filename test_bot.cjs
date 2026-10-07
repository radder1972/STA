const fs = require('fs');
let code = fs.readFileSync('src/components/Speelbot.jsx', 'utf8');

// We will change the initial message to include an image tag if we want, but wait, `text` in `messages` is just a string.
// Instead of modifying the text, we can change the rendering of `msg.text` to allow a custom image property, or we can just update the bot's avatar.

// Replace the avatar rendering:
const oldAvatar = "{msg.role === 'user' ? <User size={12} /> : <Sparkles size={12} />}";
const newAvatar = "{msg.role === 'user' ? <User size={12} /> : (selectedMode && selectedMode.src ? <img src={selectedMode.src} alt={selectedMode.title} style={{ width: '16px', height: '16px', objectFit: 'contain' }} /> : <Sparkles size={12} />)}";
code = code.replace(oldAvatar, newAvatar);

// Replace the bot's name
const oldName = "{msg.role === 'user' ? 'Jij' : 'Speelbot'}";
const newName = "{msg.role === 'user' ? 'Jij' : (selectedMode ? selectedMode.title : 'Speelbot')}";
code = code.replace(oldName, newName);

// Let's also add the image to the header of the chat!
const oldHeaderIcon = `<div style={{ position: 'relative', background: 'rgba(255,255,255,0.2)', padding: '6px', borderRadius: '50%' }}>
            <Bot size={22} />
            <div style={{ position: 'absolute', top: '-6px', right: '-10px', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))' }}>
              <ThreeSparklesLogo size={16} theme="white" />
            </div>
          </div>`;
          
const newHeaderIcon = `<div style={{ position: 'relative', background: 'rgba(255,255,255,0.2)', padding: '6px', borderRadius: '50%', width: '34px', height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {selectedMode && selectedMode.src ? <img src={selectedMode.src} alt="Mode" style={{ width: '28px', height: '28px', objectFit: 'contain' }} /> : <Bot size={22} />}
            <div style={{ position: 'absolute', top: '-6px', right: '-10px', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))' }}>
              <ThreeSparklesLogo size={16} theme="white" />
            </div>
          </div>`;
          
code = code.replace(oldHeaderIcon, newHeaderIcon);

fs.writeFileSync('src/components/Speelbot.jsx', code);
