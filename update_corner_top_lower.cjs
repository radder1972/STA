const fs = require('fs');
let code = fs.readFileSync('src/components/CornerCardFan.jsx', 'utf8');

// Change top: '20px' to top: '45px' to move the fan a bit lower
code = code.replace("top: '20px',", "top: '45px',");

fs.writeFileSync('src/components/CornerCardFan.jsx', code);
