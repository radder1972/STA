const fs = require('fs');
let code = fs.readFileSync('src/components/HeroRadarChart.jsx', 'utf8');

const bgCards = `
      {/* Background Report Page 1 (Bottom) */}
      <div style={{
        position: 'absolute', width: '110px', height: '155px', backgroundColor: '#f8fafc',
        borderRadius: '8px', border: '1px solid #cbd5e1', zIndex: 3,
        transform: isHovered 
          ? 'rotateY(0deg) rotateX(15deg) rotateZ(-12deg) translate(-25px, 5px) scale(0.9)' 
          : 'rotateY(-15deg) rotateX(25deg) rotateZ(-15deg) translate(-6px, 8px) scale(0.8)',
        transition: 'all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) 0.05s',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
      }}>
        <div style={{ background: '#f1f5f9', width: '100%', height: '35px', borderBottom: '1px solid #e2e8f0', borderTopLeftRadius: '7px', borderTopRightRadius: '7px' }} />
      </div>

      {/* Background Report Page 2 (Middle) */}
      <div style={{
        position: 'absolute', width: '110px', height: '155px', backgroundColor: '#fff',
        borderRadius: '8px', border: '1px solid #cbd5e1', zIndex: 4,
        transform: isHovered 
          ? 'rotateY(0deg) rotateX(15deg) rotateZ(10deg) translate(25px, 10px) scale(0.9)' 
          : 'rotateY(-15deg) rotateX(25deg) rotateZ(5deg) translate(4px, 4px) scale(0.8)',
        transition: 'all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <div style={{ background: '#f8fafc', width: '100%', height: '35px', borderBottom: '1px solid #e2e8f0', borderTopLeftRadius: '7px', borderTopRightRadius: '7px' }} />
      </div>

      {/* The Report Card */}`;

code = code.replace('{/* The Report Card */}', bgCards);

fs.writeFileSync('src/components/HeroRadarChart.jsx', code);
