const fs = require('fs');

let code = fs.readFileSync('src/components/PrintShopExport.jsx', 'utf8');

// Front card: swap the backgrounds
// Find:
// <div className="print-shop-bleed" style={{ background: `radial-gradient(circle at center, white 30%, ${cardColor}50 130%)`, position: 'relative', width: '100%', height: '100%' }}>
//   <div style={{ position: 'absolute', top: '3mm', left: '3mm', right: '3mm', bottom: '3mm', borderRadius: 0 }}>

const oldFront = `<div className="print-shop-bleed" style={{ background: \`radial-gradient(circle at center, white 30%, \${cardColor}50 130%)\`, position: 'relative', width: '100%', height: '100%' }}>
                  <div style={{ position: 'absolute', top: '3mm', left: '3mm', right: '3mm', bottom: '3mm', borderRadius: 0 }}>`;

const newFront = `<div className="print-shop-bleed" style={{ background: 'white', position: 'relative', width: '100%', height: '100%' }}>
                  <div style={{ position: 'absolute', top: '3mm', left: '3mm', right: '3mm', bottom: '3mm', background: \`radial-gradient(circle at center, white 30%, \${cardColor}50 130%)\`, borderRadius: 0 }}>`;

code = code.replace(oldFront, newFront);

fs.writeFileSync('src/components/PrintShopExport.jsx', code);
