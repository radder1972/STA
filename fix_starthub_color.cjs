const fs = require('fs');
let code = fs.readFileSync('src/components/StartHub.jsx', 'utf8');

const oldBullet = `<div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: '1.4', background: 'rgba(2, 132, 199, 0.08)', padding: '8px 12px', borderRadius: '8px', border: '1px solid rgba(2, 132, 199, 0.2)', marginTop: '4px' }}>
              <Bot size={18} color="#0284c7" style={{ flexShrink: 0, marginTop: '2px' }} />`;

const newBullet = `<div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: '1.4', background: 'rgba(16, 185, 129, 0.08)', padding: '8px 12px', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.2)', marginTop: '4px' }}>
              <Bot size={18} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />`;

code = code.replace(oldBullet, newBullet);

fs.writeFileSync('src/components/StartHub.jsx', code);
