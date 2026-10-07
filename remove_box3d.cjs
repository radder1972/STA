const fs = require('fs');
let code = fs.readFileSync('src/components/OrderCards.jsx', 'utf8');

// Remove the Box3D component usage block
const box3dRegex = /\{\/\* 3D Box naast de foto \*\/\}\s*<div style=\{\{\s*flex: '0 0 150px',\s*display: 'flex',\s*alignItems: 'center',\s*justifyContent: 'center',\s*zIndex: 5,\s*transform: 'translateX\(20px\)'\s*\}\}>\s*<Box3D scale=\{0\.9\} spinning=\{true\} \/>\s*<\/div>/;

code = code.replace(box3dRegex, '');
code = code.replace("import Box3D from './Box3D';", "");

fs.writeFileSync('src/components/OrderCards.jsx', code);
