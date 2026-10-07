const fs = require('fs');
let code = fs.readFileSync('src/components/CornerCardFan.jsx', 'utf8');

code = code.replace("scale(0.95)", "scale(1.15)");
code = code.replace("scale(0.85)", "scale(1)");

fs.writeFileSync('src/components/CornerCardFan.jsx', code);
