const fs = require('fs');

let code = fs.readFileSync('src/components/PrintShopExport.jsx', 'utf8');

const targetStr = `{/* Inner container (56x87mm) for content positioning, without the CardInnerBorder since we drew it above */}
                  <div style={{ position: 'absolute', top: '3mm', left: '3mm', right: '3mm', bottom: '3mm', background: 'transparent', borderRadius: 0 }}>`;

const replaceStr = `{/* Inner container (56x87mm) for content positioning, without the CardInnerBorder since we drew it above */}
                  <div style={{ position: 'absolute', top: '3mm', left: '3mm', right: '3mm', bottom: '3mm', background: 'transparent', borderRadius: 0 }}>
                    {/* Binnenlijn (2px): this was originally part of CardInnerBorder, placed 6px inwards */}
                    <div style={{ position: 'absolute', top: '6px', left: '6px', right: '6px', bottom: '6px', border: \`2px solid \${cardColor}\`, borderRadius: 0, boxSizing: 'border-box', pointerEvents: 'none' }}></div>`;

if (code.includes(targetStr)) {
  code = code.replace(targetStr, replaceStr);
  fs.writeFileSync('src/components/PrintShopExport.jsx', code);
  console.log("Replaced successfully!");
} else {
  console.log("Could not find target string.");
}
