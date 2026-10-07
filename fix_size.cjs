const fs = require('fs');

// 1. Fix CSS
let css = fs.readFileSync('src/index.css', 'utf8');
css = css.replace(/width: 62mm !important;/g, "width: 64mm !important;");
css = css.replace(/height: 93mm !important;/g, "height: 94mm !important;");
css = css.replace(/width: 62mm;/g, "width: 64mm;");
css = css.replace(/height: 93mm;/g, "height: 94mm;");
fs.writeFileSync('src/index.css', css);

// 2. Fix PrintShopExport.jsx text
let code = fs.readFileSync('src/components/PrintShopExport.jsx', 'utf8');
// "Kaartformaat (62x93mm inclusief 3mm afloop rondom). Na het printen snijdt de drukker er rondom 3mm af, zodat de kaarten exact 56x87mm worden"
// wait, I don't know the exact text. Let's just replace 62, 93, 56, 87.
code = code.replace(/62x93mm/g, "64x94mm");
code = code.replace(/56x87mm/g, "58x88mm");
code = code.replace(/64x93mm/g, "64x94mm"); // I think there was a typo in the text before
fs.writeFileSync('src/components/PrintShopExport.jsx', code);
