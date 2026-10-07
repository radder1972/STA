const fs = require('fs');
let code = fs.readFileSync('src/components/PrintProof.jsx', 'utf8');

const startIndex = code.indexOf('<g transform="translate(1160, 0)">');
const endIndex = code.indexOf('</g>\n              </g>\n            </svg>');

if (startIndex !== -1 && endIndex !== -1) {
  const newBackPanel = `<g transform="translate(1160, 0)">
                  <text x="325" y="150" class="text-sub" style={{textAnchor: "middle", fontSize: "28px"}}>55 Theoriekaarten</text>
                  
                  <text x="325" y="240" class="text-body" style={{textAnchor: "middle", fontSize: "24px", fill: "#475569"}}>
                    Een actuele en complete referetieset
                  </text>
                  <text x="325" y="280" class="text-body" style={{textAnchor: "middle", fontSize: "24px", fill: "#475569"}}>
                    voor gebruik in de klinische praktijk.
                  </text>
                  <text x="325" y="340" class="text-body" style={{textAnchor: "middle", fontSize: "24px", fill: "#475569"}}>
                    Volledig afgestemd op de herziene
                  </text>
                  <text x="325" y="380" class="text-body" style={{textAnchor: "middle", fontSize: "24px", fill: "#475569"}}>
                    behandelrichtlijnen (VSt, Arntz et al. 2021).
                  </text>

                  <g transform="translate(265, 480)">
                    <circle cx="0" cy="0" r="8" fill="#f59e0b" />
                    <circle cx="30" cy="0" r="8" fill="#10b981" />
                    <circle cx="60" cy="0" r="8" fill="#0ea5e9" />
                    <circle cx="90" cy="0" r="8" fill="#8b5cf6" />
                    <circle cx="120" cy="0" r="8" fill="#f43f5e" />
                  </g>

                  <g transform="translate(115, 660)">
                    <rect x="0" y="0" width="420" height="60" rx="30" fill="white" stroke="#cbd5e1" strokeWidth="2" />
                    <g transform="translate(20, 18) scale(1)">
                      <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" fill="#0ea5e9" />
                      <path d="M19 3L19.8 5.2L22 6L19.8 6.8L19 9L18.2 6.8L16 6L18.2 5.2L19 3Z" fill="#f59e0b" />
                      <path d="M5 16L5.8 18.2L8 19L5.8 19.8L5 22L4.2 19.8L2 19L4.2 18.2L5 16Z" fill="#10b981" />
                    </g>
                    <text x="60" y="37" style={{fontFamily: "ui-sans-serif, system-ui, sans-serif", fontSize: "17px", fontWeight: "800", fill: "#0f172a", letterSpacing: "0.5px"}}>DIGITAAL SCHEMATHERAPIE PLATFORM</text>
                  </g>
                `;
  code = code.substring(0, startIndex) + newBackPanel + code.substring(endIndex);
  fs.writeFileSync('src/components/PrintProof.jsx', code);
}
