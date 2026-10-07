const fs = require('fs');

let code = fs.readFileSync('src/components/PrintShopExport.jsx', 'utf8');

const oldBack = `              {/* ACHTERKANT */}
              <div className="print-shop-page card-back" style={{ background: 'white' }}>
                <div className="print-shop-bleed" style={{ position: 'relative', width: '100%', height: '100%' }}>
                  <div style={{ position: 'absolute', top: '3mm', left: '3mm', right: '3mm', bottom: '3mm', background: 'white', borderRadius: 0 }}>
                    <CardInnerBorder color={cardColor} radius="0" />`;

const newBack = `              {/* ACHTERKANT */}
              <div className="print-shop-page card-back" style={{ background: 'white' }}>
                <div className="print-shop-bleed" style={{ position: 'relative', width: '100%', height: '100%' }}>
                  {/* Bleeding border for the back: covers the 3mm bleed area AND the 6px inner border */}
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, border: \`calc(3mm + 6px) solid \${cardColor.startsWith('#') ? cardColor + '25' : 'rgba(0,0,0,0.03)'}\`, boxSizing: 'border-box' }}></div>
                  
                  {/* Inner container (56x87mm) for content positioning, without the CardInnerBorder since we drew it above */}
                  <div style={{ position: 'absolute', top: '3mm', left: '3mm', right: '3mm', bottom: '3mm', background: 'transparent', borderRadius: 0 }}>
`;

code = code.replace(oldBack, newBack);

fs.writeFileSync('src/components/PrintShopExport.jsx', code);
