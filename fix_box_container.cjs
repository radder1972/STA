const fs = require('fs');
let code = fs.readFileSync('src/components/OrderCards.jsx', 'utf8');

code = code.replace(/border: '5px solid white',/g, '');
code = code.replace(/background: 'white',/g, "background: 'transparent',");
// Remove the rotate(4deg) from the transform so it spins straight
code = code.replace(/transform: 'translate\(36px, -24px\) rotate\(4deg\)'/g, "transform: 'translate(36px, -24px)'");
code = code.replace(/transform = 'translate\(36px, -28px\) rotate\(4deg\) scale\(1\.04\)'/g, "transform = 'translate(36px, -28px) scale(1.04)'");
code = code.replace(/transform = 'translate\(36px, -24px\) rotate\(4deg\)'/g, "transform = 'translate(36px, -24px)'");
// Also remove overflow: hidden because the 3D box needs to pop out of its container!
code = code.replace(/overflow: 'hidden',/g, "overflow: 'visible',");

fs.writeFileSync('src/components/OrderCards.jsx', code);
