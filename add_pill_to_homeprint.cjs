const fs = require('fs');
let code = fs.readFileSync('src/components/HomePrintExport.jsx', 'utf8');

// Add ThreeSparklesLogo to imports
code = code.replace(
  "import { ArrowLeftIcon, PrinterIcon } from './Icons';",
  "import { ArrowLeftIcon, PrinterIcon, ThreeSparklesLogo } from './Icons';"
);

// Add the pill to the card-back
const pillHtml = `
                            <div style={{
                              position: 'absolute',
                              bottom: '3mm',
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
                                gap: '3px',
                                background: '#f4f4f5',
                                border: '1px solid #e4e4e7',
                                borderRadius: '999px',
                                padding: '2px 5px',
                                WebkitPrintColorAdjust: 'exact',
                                printColorAdjust: 'exact'
                              }}>
                                <ThreeSparklesLogo size={8} theme="test" />
                                <span style={{ 
                                  fontSize: '0.4rem', 
                                  fontWeight: 700, 
                                  color: '#52525b',
                                  lineHeight: 1,
                                  letterSpacing: '-0.2px',
                                  WebkitPrintColorAdjust: 'exact',
                                  printColorAdjust: 'exact'
                                }}>Digitaal Schematherapie Platform</span>
                              </div>
                            </div>
`;

code = code.replace(
  "{card.description}\n                            </div>\n                          </div>",
  `{card.description}\n                            </div>\n${pillHtml}\n                          </div>`
);

// Add paddingBottom to the description block
code = code.replace(
  "margin: '0', \n                              textAlign: 'center',",
  "margin: '0', \n                              paddingBottom: '6mm',\n                              textAlign: 'center',"
);

fs.writeFileSync('src/components/HomePrintExport.jsx', code);
