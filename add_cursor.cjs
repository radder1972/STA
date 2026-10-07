const fs = require('fs');
let code = fs.readFileSync('src/components/StartHub.jsx', 'utf8');

code = code.replace(/flexDirection: 'column',/g, "flexDirection: 'column',\n            cursor: 'pointer',");

fs.writeFileSync('src/components/StartHub.jsx', code);
