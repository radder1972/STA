const fs = require('fs');
let code = fs.readFileSync('src/components/SchemaCard.jsx', 'utf8');

const oldPill = `                <div style={{
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
                </div>`;

const newPill = `                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: \`\${3 * scaleRatio}px\`,
                  background: '#f4f4f5',
                  border: '1px solid #e4e4e7',
                  borderRadius: '999px',
                  padding: \`\${1.5 * scaleRatio}px \${5 * scaleRatio}px\`,
                  WebkitPrintColorAdjust: 'exact',
                  printColorAdjust: 'exact'
                }}>
                  <ThreeSparklesLogo size={7 * scaleRatio} color="#52525b" />
                  <span style={{ 
                    fontSize: \`\${0.34 * scaleRatio}rem\`, 
                    fontWeight: 700, 
                    color: '#52525b',
                    lineHeight: 1,
                    letterSpacing: '-0.2px',
                    WebkitPrintColorAdjust: 'exact',
                    printColorAdjust: 'exact'
                  }}>Digitaal Schematherapie Platform</span>
                </div>`;

code = code.replace(oldPill, newPill);

fs.writeFileSync('src/components/SchemaCard.jsx', code);
