const fs = require('fs');

// 1. Fix CardInnerBorder in colors.jsx
let colorsCode = fs.readFileSync('src/utils/colors.jsx', 'utf8');
colorsCode = colorsCode.replace(
  "export const CardInnerBorder = ({ color, outerColor }) => {",
  "export const CardInnerBorder = ({ color, outerColor, radius = '12px' }) => {"
);
colorsCode = colorsCode.replace(
  "borderRadius: '12px',",
  "borderRadius: radius,"
);
fs.writeFileSync('src/utils/colors.jsx', colorsCode);

// 2. Fix PrintShopExport.jsx
let printCode = fs.readFileSync('src/components/PrintShopExport.jsx', 'utf8');
// Replace borderRadius: '6px' with borderRadius: 0 in the bleed inner containers
printCode = printCode.replace(/borderRadius: '6px'/g, "borderRadius: 0");
// Pass radius="0" to CardInnerBorder
printCode = printCode.replace(/<CardInnerBorder color=\{cardColor\} outerColor="white" \/>/g, '<CardInnerBorder color={cardColor} outerColor="white" radius="0" />');
printCode = printCode.replace(/<CardInnerBorder color=\{cardColor\} \/>/g, '<CardInnerBorder color={cardColor} radius="0" />');
fs.writeFileSync('src/components/PrintShopExport.jsx', printCode);

// 3. Fix HomePrintExport.jsx
let homeCode = fs.readFileSync('src/components/HomePrintExport.jsx', 'utf8');
homeCode = homeCode.replace(/borderRadius: '6px'/g, "borderRadius: 0");
// If HomePrintExport uses CardInnerBorder, update it too
homeCode = homeCode.replace(/<CardInnerBorder color=\{cardColor\} \/>/g, '<CardInnerBorder color={cardColor} radius="0" />');
fs.writeFileSync('src/components/HomePrintExport.jsx', homeCode);
