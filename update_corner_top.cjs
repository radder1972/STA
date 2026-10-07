const fs = require('fs');
let code = fs.readFileSync('src/components/CornerCardFan.jsx', 'utf8');

// Change top: '100px' to top: '20px' to move the fan higher up
code = code.replace("top: '100px',", "top: '20px',");

fs.writeFileSync('src/components/CornerCardFan.jsx', code);
