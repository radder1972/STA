const fs = require('fs');
let code = fs.readFileSync('src/components/CornerCardFan.jsx', 'utf8');

code = code.replace("right: '120px',", "right: '30px',");
code = code.replace("top: '-40px',", "top: '100px',");

fs.writeFileSync('src/components/CornerCardFan.jsx', code);
