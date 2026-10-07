const fs = require('fs');
let code = fs.readFileSync('src/components/PrintProof.jsx', 'utf8');

const bottomFlapTarget = `<rect x="330" y="840" width="650" height="180" class="fold" />`;
const replacement = bottomFlapTarget + `
                <g transform="translate(330, 840)">
                   <g transform="translate(115, 60)">
                    <rect x="0" y="0" width="420" height="60" rx="30" fill="white" stroke="#cbd5e1" strokeWidth="2" />
                    <g transform="translate(20, 18) scale(1)">
                      <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" fill="#0ea5e9" />
                      <path d="M19 3L19.8 5.2L22 6L19.8 6.8L19 9L18.2 6.8L16 6L18.2 5.2L19 3Z" fill="#f59e0b" />
                      <path d="M5 16L5.8 18.2L8 19L5.8 19.8L5 22L4.2 19.8L2 19L4.2 18.2L5 16Z" fill="#10b981" />
                    </g>
                    <text x="60" y="37" style={{fontFamily: "ui-sans-serif, system-ui, sans-serif", fontSize: "17px", fontWeight: "800", fill: "#0f172a", letterSpacing: "0.5px"}}>DIGITAAL SCHEMATHERAPIE PLATFORM</text>
                  </g>
                </g>`;

if (!code.includes('<g transform="translate(330, 840)">')) {
  code = code.replace(bottomFlapTarget, replacement);
  fs.writeFileSync('src/components/PrintProof.jsx', code);
}
