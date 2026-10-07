const fs = require('fs');
let code = fs.readFileSync('src/components/Speelbot.jsx', 'utf8');

// 1. Change launcher button
const oldLauncher = `        <button
          onClick={() => setIsOpen(true)}
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            width: '60px',
            height: '60px',
            borderRadius: '30px',
            background: 'linear-gradient(135deg, #475569 0%, #0284c7 50%, #059669 100%)',
            color: 'white',
            border: 'none',
            boxShadow: '0 8px 25px rgba(59, 130, 246, 0.4)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            transition: 'transform 0.2s',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)'
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Bot size={30} />
          <div style={{ position: 'absolute', top: '0', right: '0' }}>
            <Sparkles size={16} fill="white" />
          </div>
        </button>`;

const newLauncher = `        <button
          onClick={() => setIsOpen(true)}
          style={{
            position: 'fixed',
            top: '120px',
            right: '24px',
            width: 'auto',
            padding: '0 22px',
            height: '56px',
            borderRadius: '28px',
            background: 'linear-gradient(135deg, #475569 0%, #0284c7 50%, #059669 100%)',
            color: 'white',
            border: 'none',
            boxShadow: '0 8px 25px rgba(59, 130, 246, 0.3)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            zIndex: 9999,
            transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            transform: isHovered ? 'scale(1.05) translateY(-2px)' : 'scale(1) translateY(0)'
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div style={{ position: 'relative' }}>
            {activeCard && activeCard.src ? <img src={activeCard.src} style={{ width: '28px', height: '28px', objectFit: 'contain', borderRadius: '50%' }} /> : <Bot size={28} />}
            <div style={{ position: 'absolute', top: '-6px', right: '-8px' }}>
              <Sparkles size={14} fill="white" />
            </div>
          </div>
          <span style={{ fontWeight: '600', fontSize: '1.1rem', letterSpacing: '0.3px', whiteSpace: 'nowrap' }}>
            Oefen met AI
          </span>
        </button>`;

code = code.replace(oldLauncher, newLauncher);

// 2. Change Chat Window Position
const oldWindow = `    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      width: '360px',
      height: '500px',
      backgroundColor: 'var(--bg-color)',`;

const newWindow = `    <div style={{
      position: 'fixed',
      top: '120px',
      right: '24px',
      width: '380px',
      height: '550px',
      maxHeight: 'calc(100vh - 140px)',
      backgroundColor: 'var(--bg-color)',`;

code = code.replace(oldWindow, newWindow);

fs.writeFileSync('src/components/Speelbot.jsx', code);
