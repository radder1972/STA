const fs = require('fs');

let code = fs.readFileSync('src/components/PrintShopExport.jsx', 'utf8');

const targetStr = `borderRadius: 0, boxSizing: 'border-box', pointerEvents: 'none' }}></div>`;
const replaceStr = `borderRadius: '6px', boxSizing: 'border-box', pointerEvents: 'none' }}></div>`;

if (code.includes(targetStr)) {
  code = code.replace(targetStr, replaceStr);
  fs.writeFileSync('src/components/PrintShopExport.jsx', code);
  console.log("Fixed!");
} else {
  console.log("Not found.");
}
