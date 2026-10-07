const fs = require('fs');
let code = fs.readFileSync('src/components/PrintProof.jsx', 'utf8');

const oldBlock = `<image href="\${blijeKindImg}" x="225" y="320" width="200" height="200" />
                  <g transform="translate(277, 540) scale(4)">`;

const newBlock = `<image href="\${blijeKindImg}" x="225" y="290" width="200" height="200" />
                  <g transform="translate(277, 510) scale(4)">`;

if (code.includes(oldBlock)) {
    code = code.replace(oldBlock, newBlock);
    fs.writeFileSync('src/components/PrintProof.jsx', code);
    console.log("Adjusted vertical spacing successfully.");
} else {
    console.log("Could not find the block to replace.");
}
