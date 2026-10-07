const fs = require('fs');
let code = fs.readFileSync('src/components/HomePrintExport.jsx', 'utf8');

code = code.replace(/58mm/g, '56mm').replace(/88mm/g, '87mm');
// Just to be safe, there shouldn't be other 58 or 88 except the grid cells

fs.writeFileSync('src/components/HomePrintExport.jsx', code);
