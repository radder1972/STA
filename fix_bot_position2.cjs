const fs = require('fs');
let code = fs.readFileSync('src/components/Speelbot.jsx', 'utf8');

const regex = /<button[\s\S]*?onClick=\{\(\) => setIsOpen\(true\)\}[\s\S]*?<\/button>/;

const newLauncher = `      <button
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          top: '120px',
          right: '24px',
          width: 'auto',
          padding: '0 24px',
          height: '56px',
          borderRadius: '28px',
          background: 'linear-gradient(135deg, #475569 0%, #0284c7 50%, #059669 100%)',
          color: 'white',
          border: 'none',
          boxShadow: '0 8px 25px rgba(59, 130, 246, 0.35)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          zIndex: 9999,
          transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05) translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(59, 130, 246, 0.45)'; setIsHovered(true); }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1) translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.35)'; setIsHovered(false); }}
        title="Speelbot Openen"
      >
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {activeCard && activeCard.src ? <img src={activeCard.src} style={{ width: '28px', height: '28px', objectFit: 'contain', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }} /> : <Bot size={26} />}
          <div style={{ position: 'absolute', top: '-6px', right: '-10px' }}>
            <Sparkles size={14} fill="white" />
          </div>
        </div>
        <span style={{ fontWeight: '600', fontSize: '1.05rem', letterSpacing: '0.5px' }}>Oefen met AI</span>
      </button>`;

code = code.replace(regex, newLauncher);

fs.writeFileSync('src/components/Speelbot.jsx', code);
