const fs = require('fs');

// Update OrderCards.jsx
let code = fs.readFileSync('src/components/OrderCards.jsx', 'utf8');

// Remove the import
code = code.replace("import AnimatedBox3D from './AnimatedBox3D';\n", "");
code = code.replace("import AnimatedBox3D from './AnimatedBox3D';", "");

// Remove the injected div
const regex = /\n[\s]*<div style=\{\{ maxWidth: '600px', width: '100%', marginTop: '3rem'[^>]*>[\s\n]*<h4[^>]*>De vernieuwde verpakking<\/h4>[\s\n]*<AnimatedBox3D \/>[\s\n]*<\/div>/;

if (regex.test(code)) {
    code = code.replace(regex, "");
    fs.writeFileSync('src/components/OrderCards.jsx', code);
    console.log("Removed AnimatedBox3D from OrderCards.jsx");
} else {
    console.log("Regex for AnimatedBox3D div failed");
}

// Delete the component file
if (fs.existsSync('src/components/AnimatedBox3D.jsx')) {
    fs.unlinkSync('src/components/AnimatedBox3D.jsx');
    console.log("Deleted AnimatedBox3D.jsx");
}
