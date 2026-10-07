const fs = require('fs');
let code = fs.readFileSync('src/components/PrintProof.jsx', 'utf8');

// Fix text-anchor
code = code.replace(/textAnchor="middle"/g, 'text-anchor="middle"');
code = code.replace(/textAnchor="start"/g, 'text-anchor="start"');

// Fix inline styles that were written in React syntax back to HTML syntax
code = code.replace(/style=\{\{ ?fontSize: "28px" ?\}\}/g, 'style="font-size: 28px;"');
code = code.replace(/style=\{\{ ?fontSize: "24px", fill: "#475569" ?\}\}/g, 'style="font-size: 24px; fill: #475569;"');
code = code.replace(/style=\{\{ ?fontFamily: "ui-sans-serif, system-ui, sans-serif", fontSize: "17px", fontWeight: "800", fill: "#0f172a", letterSpacing: "0.5px" ?\}\}/g, 'style="font-family: ui-sans-serif, system-ui, sans-serif; font-size: 17px; font-weight: 800; fill: #0f172a; letter-spacing: 0.5px;"');

// Fix strokeWidth
code = code.replace(/strokeWidth="2"/g, 'stroke-width="2"');

fs.writeFileSync('src/components/PrintProof.jsx', code);
