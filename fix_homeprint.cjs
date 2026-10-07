const fs = require('fs');
let code = fs.readFileSync('src/components/HomePrintExport.jsx', 'utf8');
code = code.replace(/56mm/g, "58mm");
code = code.replace(/87mm/g, "88mm");
fs.writeFileSync('src/components/HomePrintExport.jsx', code);
