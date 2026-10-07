const fs = require('fs');
let code = fs.readFileSync('src/components/PrintProof.jsx', 'utf8');

// Replace the specific translate and scale for the front panel logo
const oldLogoStr = '<g transform="translate(175, 270) scale(4)">';
const newLogoStr = '<g transform="translate(229, 320) scale(8)">';

if (code.includes(oldLogoStr)) {
    code = code.replace(oldLogoStr, newLogoStr);
    fs.writeFileSync('src/components/PrintProof.jsx', code);
    console.log("Updated logo on front panel.");
} else {
    console.log("Could not find the old logo string.");
}
