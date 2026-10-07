const fs = require('fs');
let code = fs.readFileSync('src/components/PrintProof.jsx', 'utf8');

const oldBlock = `<rect x="70" y="600" width="510" height="150" fill="white" stroke="#cbd5e1" stroke-width="4" rx="20" />
                  <text x="325" y="660" class="text-body" style="text-anchor: middle; font-weight: 600;">Ontwikkeld door het</text>
                  <text x="325" y="700" class="text-sub" style="font-size: 24px;">Digitaal Schematherapie Platform</text>`;

const newBlock = `<rect x="70" y="580" width="510" height="170" fill="white" stroke="#cbd5e1" stroke-width="4" rx="20" />
                  <text x="325" y="630" class="text-body" style="text-anchor: middle; font-weight: 600;">Onafhankelijk non-profit project van:</text>
                  
                  <g transform="translate(100, 660)">
                    <rect x="0" y="0" width="450" height="60" rx="30" fill="#f8fafc" stroke="#e2e8f0" stroke-width="2" />
                    <g transform="translate(20, 18) scale(1)">
                      <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" fill="#0ea5e9" />
                      <path d="M19 3L19.8 5.2L22 6L19.8 6.8L19 9L18.2 6.8L16 6L18.2 5.2L19 3Z" fill="#f59e0b" />
                      <path d="M5 16L5.8 18.2L8 19L5.8 19.8L5 22L4.2 19.8L2 19L4.2 18.2L5 16Z" fill="#10b981" />
                    </g>
                    <text x="60" y="38" style="font-family: ui-sans-serif, system-ui, sans-serif; font-size: 22px; font-weight: 800; fill: #0f172a;">DIGITAAL SCHEMATHERAPIE PLATFORM</text>
                  </g>`;

code = code.replace(oldBlock, newBlock);

fs.writeFileSync('src/components/PrintProof.jsx', code);
