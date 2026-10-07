const fs = require('fs');
let code = fs.readFileSync('src/components/SchemaCard.jsx', 'utf8');

const oldBranding = `{/* DSP Branding Footer */}
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
              </div>`;

const newBranding = `{/* DSP Branding Footer (Pill) */}
              <div style={{
                position: 'absolute',
                bottom: \`\${(3 / 58) * widthNum}px\`,
                left: 0,
                right: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: \`\${3 * scaleRatio}px\`,
                  background: 'rgba(0, 0, 0, 0.03)',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  borderRadius: '999px',
                  padding: \`\${1.5 * scaleRatio}px \${5 * scaleRatio}px\`,
                  opacity: 0.85
                }}>
                  <ThreeSparklesLogo size={7 * scaleRatio} color="black" />
                  <span style={{ 
                    fontSize: \`\${0.34 * scaleRatio}rem\`, 
                    fontWeight: 700, 
                    color: 'rgba(0,0,0,0.65)',
                    lineHeight: 1,
                    letterSpacing: '-0.2px'
                  }}>Digitaal Schematherapie Platform</span>
                </div>
              </div>`;

code = code.replace(oldBranding, newBranding);

fs.writeFileSync('src/components/SchemaCard.jsx', code);
