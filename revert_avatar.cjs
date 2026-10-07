const fs = require('fs');
let code = fs.readFileSync('src/components/Speelbot.jsx', 'utf8');

// Revert avatar in header
const newHeaderIcon = `<div style={{ position: 'relative', background: 'rgba(255,255,255,0.2)', padding: '6px', borderRadius: '50%', width: '34px', height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {activeCard && activeCard.src ? <img src={activeCard.src} alt="Mode" style={{ width: '28px', height: '28px', objectFit: 'contain' }} /> : <Bot size={22} />}
            <div style={{ position: 'absolute', top: '-6px', right: '-10px', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))' }}>
              <ThreeSparklesLogo size={16} theme="white" />
            </div>
          </div>`;

const oldHeaderIcon = `<div style={{ position: 'relative', background: 'rgba(255,255,255,0.2)', padding: '6px', borderRadius: '50%' }}>
            <Bot size={22} />
            <div style={{ position: 'absolute', top: '-6px', right: '-10px', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))' }}>
              <ThreeSparklesLogo size={16} theme="white" />
            </div>
          </div>`;

code = code.replace(newHeaderIcon, oldHeaderIcon);

// Revert bot name in header
// Wait, I didn't change the name in the header, only in the chat bubbles!
// "Jij : Speelbot"
code = code.replace("{msg.role === 'user' ? 'Jij' : (activeCard ? activeCard.title : 'Speelbot')}", "{msg.role === 'user' ? 'Jij' : 'Speelbot'}");

// Revert avatar in chat bubbles
code = code.replace("{msg.role === 'user' ? <User size={12} /> : (activeCard && activeCard.src ? <img src={activeCard.src} alt={activeCard.title} style={{ width: '16px', height: '16px', objectFit: 'contain' }} /> : <Sparkles size={12} />)}", "{msg.role === 'user' ? <User size={12} /> : <Sparkles size={12} />}");


fs.writeFileSync('src/components/Speelbot.jsx', code);
