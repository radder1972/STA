const fs = require('fs');
let code = fs.readFileSync('src/components/Tafelopstelling.jsx', 'utf8');

const oldGvOutput = `                  {gvOutput && (
                    <div className="fade-in" style={{ marginTop: '1.25rem', padding: '1.25rem', background: '#ecfdf5', borderRadius: '12px', border: '1px solid #34d399', color: '#064e3b', lineHeight: '1.6', fontSize: '1.05rem', whiteSpace: 'pre-wrap' }}>
                      {gvOutput}
                    </div>
                  )}
                </div>
              </div>
            </div>`;

const newGvOutput = `                  {gvOutput && (
                    <div className="fade-in" style={{ marginTop: '1.25rem', padding: '1.25rem', background: '#ecfdf5', borderRadius: '12px', border: '1px solid #34d399', color: '#064e3b', lineHeight: '1.6', fontSize: '1.05rem', whiteSpace: 'pre-wrap' }}>
                      {gvOutput}
                      <div style={{ marginTop: '1rem', borderTop: '1px dashed #6ee7b7', paddingTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
                        <button 
                          onClick={() => {
                            window.dispatchEvent(new CustomEvent('speelbot:oefen', { detail: { promptText: "Hier is een theorie/respons die we zojuist op de tafel hebben uitgewerkt:\\n\\n" + gvOutput + "\\n\\nSpeel dit scenario met mij uit. Jij reageert als de actieve modus, ik zal als therapeut deze reactie proberen toe te passen. Start jij het gesprek in de actieve modus." } }));
                          }}
                          className="btn btn-gradient-tafel" 
                          style={{ padding: '0.4rem 1rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}
                        >
                          👉 Oefen dit direct met Speelbot
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>`;

code = code.replace(oldGvOutput, newGvOutput);
fs.writeFileSync('src/components/Tafelopstelling.jsx', code);
