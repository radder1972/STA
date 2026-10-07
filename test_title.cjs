const fs = require('fs');
let code = fs.readFileSync('src/data/cards.jsx', 'utf8');
code = code.replace(/import .*/g, '');
code = code.replace(/<[^>]+>/g, 'HTML_TAG');
console.log(code.includes("if (title === 'Vermijding')"));
