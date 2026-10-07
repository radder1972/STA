const fs = require('fs');
let code = fs.readFileSync('src/components/PrintProof.jsx', 'utf8');

// Fix textAnchor attribute instead of style
code = code.replace(/style=\{\{textAnchor: "middle",/g, 'textAnchor="middle" style={{');
code = code.replace(/style=\{\{textAnchor: "start"\}\}/g, 'textAnchor="start"');

// Replace top flap content
const oldTopFlap = `<g transform="translate(330, -180)">
                   <path d="M310 75 L315 88 L330 90 L315 92 L310 105 L305 92 L290 90 L305 88 Z" fill="#0ea5e9" opacity="0.8" />
                   <text x="325" y="60" class="text-sub" style={{fontSize:"24px"}}>DSP</text>
                </g>`;

const newTopFlap = `<g transform="translate(330, -180)">
                   <g transform="translate(115, 70)">
                    <rect x="0" y="0" width="420" height="60" rx="30" fill="white" stroke="#cbd5e1" strokeWidth="2" />
                    <g transform="translate(20, 18) scale(1)">
                      <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" fill="#0ea5e9" />
                      <path d="M19 3L19.8 5.2L22 6L19.8 6.8L19 9L18.2 6.8L16 6L18.2 5.2L19 3Z" fill="#f59e0b" />
                      <path d="M5 16L5.8 18.2L8 19L5.8 19.8L5 22L4.2 19.8L2 19L4.2 18.2L5 16Z" fill="#10b981" />
                    </g>
                    <text x="60" y="37" style={{fontFamily: "ui-sans-serif, system-ui, sans-serif", fontSize: "17px", fontWeight: "800", fill: "#0f172a", letterSpacing: "0.5px"}}>DIGITAAL SCHEMATHERAPIE PLATFORM</text>
                  </g>
                </g>`;

code = code.replace(oldTopFlap, newTopFlap);

// Ensure the back panel pill text is centered if needed? 
// The back panel pill is already left-aligned INSIDE the pill, which is fine since the pill is centered.
// Let's center the dots on the back panel perfectly. 650/2 = 325. Dots are at 0, 30, 60, 90, 120 (width 120). Center = 325 - 60 = 265. Yes, they were at 265. That's correct.

fs.writeFileSync('src/components/PrintProof.jsx', code);
