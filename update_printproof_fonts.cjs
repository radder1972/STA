const fs = require('fs');
let code = fs.readFileSync('src/components/PrintProof.jsx', 'utf8');

// Update CSS font sizes
code = code.replace(/font-size: 72px;/g, 'font-size: 60px;');
code = code.replace(/font-size: 32px;/g, 'font-size: 28px;');
code = code.replace(/font-size: 28px;/g, 'font-size: 24px;');

// Update inline font sizes
code = code.replace(/font-size:24px;/g, 'font-size:20px;');
code = code.replace(/font-size: 20px;/g, 'font-size: 18px;');
code = code.replace(/font-size: 28px;/g, 'font-size: 24px;');

fs.writeFileSync('src/components/PrintProof.jsx', code);
