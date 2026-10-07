const fs = require('fs');

// 1. Update index.css
let css = fs.readFileSync('src/index.css', 'utf8');
css = css.replace(/64mm/g, '62mm').replace(/94mm/g, '93mm');
fs.writeFileSync('src/index.css', css);

// 2. Update PrintShopExport.jsx
let jsx = fs.readFileSync('src/components/PrintShopExport.jsx', 'utf8');
jsx = jsx.replace(/64mm/g, '62mm').replace(/94mm/g, '93mm');
jsx = jsx.replace(/64x94mm/g, '62x93mm');
jsx = jsx.replace(/58x88mm/g, '56x87mm');
fs.writeFileSync('src/components/PrintShopExport.jsx', jsx);

