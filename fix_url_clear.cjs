const fs = require('fs');
let code = fs.readFileSync('src/App.jsx', 'utf8');

const targetStr = "else if (currentView === 'verantwoording') { hash = 'verantwoording'; window.scrollTo(0, 0) }";
const replacementStr = targetStr + "\n    else if (currentView === 'drukproef') { hash = 'drukproef' }";

code = code.replace(targetStr, replacementStr);
fs.writeFileSync('src/App.jsx', code);
