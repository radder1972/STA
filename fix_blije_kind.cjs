const fs = require('fs');
let code = fs.readFileSync('src/components/PrintProof.jsx', 'utf8');

const regex = /<g transform="translate\(229, 320\) scale\(8\)">[\s\S]*?<\/g>/;
const newImage = '<image href="${blijeKindImg}" x="225" y="320" width="200" height="200" />';

if (regex.test(code)) {
    code = code.replace(regex, newImage);
    fs.writeFileSync('src/components/PrintProof.jsx', code);
    console.log("Success: Replaced stars with Blije Kind image");
} else {
    console.log("Error: Could not find stars group");
}
