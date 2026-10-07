const fs = require('fs');
let code = fs.readFileSync('src/components/SchemaCard.jsx', 'utf8');

// Update imports
code = code.replace(
  "import { PlayingCardsIcon } from './Icons';",
  "import { PlayingCardsIcon, ThreeSparklesLogo } from './Icons';"
);

// We need to inject the branding at the bottom of the card-face-back content wrapper.
// It looks like:
//               <div className="card-desc" style={{ ... }}>
//                 {descText}
//               </div>
//             </div>
//           </div>

const descEndIndex = code.indexOf('{descText}\n              </div>');
if (descEndIndex !== -1) {
  const insertPosition = code.indexOf('</div>', descEndIndex + '{descText}\n              </div>'.length) + 6;
  
  const brandingHtml = `
              {/* DSP Branding Footer */}
              <div style={{
                position: 'absolute',
                bottom: \`\${(3 / 58) * widthNum}px\`,
                left: 0,
                right: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: \`\${2 * scaleRatio}px\`,
                opacity: 0.35,
                zIndex: 1
              }}>
                <ThreeSparklesLogo size={10 * scaleRatio} color="black" />
                <span style={{ 
                  fontSize: \`\${0.45 * scaleRatio}rem\`, 
                  fontWeight: 900, 
                  letterSpacing: '0.8px', 
                  color: 'black',
                  lineHeight: 1
                }}>DSP</span>
              </div>
`;

  // We should actually insert it right *after* the <div className="card-desc">...</div>
  // Let's replace:
  code = code.replace('{descText}\n              </div>', '{descText}\n              </div>\n' + brandingHtml);
  
  fs.writeFileSync('src/components/SchemaCard.jsx', code);
  console.log("Updated SchemaCard.jsx");
} else {
  console.log("Could not find descText block");
}
