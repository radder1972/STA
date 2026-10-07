const fs = require('fs');
let code = fs.readFileSync('src/components/PrintProof.jsx', 'utf8');

const regex = /<image href="\$\{blijeKindImg\}" x="225" y="320" width="200" height="200" \/>/;

const starsLogo = `
                  <image href="\${blijeKindImg}" x="225" y="320" width="200" height="200" />
                  <g transform="translate(277, 540) scale(4)">
                    <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" fill="#0ea5e9" />
                    <path d="M19 3L19.8 5.2L22 6L19.8 6.8L19 9L18.2 6.8L16 6L18.2 5.2L19 3Z" fill="#f59e0b" />
                    <path d="M5 16L5.8 18.2L8 19L5.8 19.8L5 22L4.2 19.8L2 19L4.2 18.2L5 16Z" fill="#10b981" />
                  </g>`;

if (regex.test(code)) {
    code = code.replace(regex, starsLogo);
    fs.writeFileSync('src/components/PrintProof.jsx', code);
    console.log("Added stars back successfully.");
} else {
    console.log("Could not find the image tag.");
}
