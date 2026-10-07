const fs = require('fs');
let code = fs.readFileSync('src/components/PrintProof.jsx', 'utf8');

// Add to the info table
const tableRow = `<tr><td style={{ paddingRight: '16px', fontWeight: 'bold', color: '#1e293b' }}>Materiaal:</td><td>300g eenzijdig gestreken sulfaatkarton</td></tr>`;
const newTableRow = `<tr><td style={{ paddingRight: '16px', fontWeight: 'bold', color: '#1e293b' }}>Versie:</td><td>v4.2.1 (okt 2026)</td></tr>\n                  <tr><td style={{ paddingRight: '16px', fontWeight: 'bold', color: '#1e293b' }}>Materiaal:</td><td>300g eenzijdig gestreken sulfaatkarton</td></tr>`;
code = code.replace(tableRow, newTableRow);

// Add to the glue flap
const glueFlapText = `<text x="75" y="420" class="text-body" textAnchor="middle" style={{ fontSize: "20px", opacity: 0.5}} transform="rotate(-90 75,420)">Plakrand</text>`;
const newGlueFlapText = `<text x="75" y="420" class="text-body" textAnchor="middle" style={{ fontSize: "20px", opacity: 0.5}} transform="rotate(-90 75,420)">Plakrand</text>\n                <text x="75" y="750" class="text-body" textAnchor="middle" style={{ fontSize: "14px", opacity: 0.5}} transform="rotate(-90 75,750)">Versie 4.2.1</text>`;

// Oh wait, did my earlier replace of textAnchor mess up the regex? 
// The code earlier was:
// <text x="75" y="420" class="text-body" style={{fontSize: "20px", opacity: 0.5, textAnchor: "middle"}} transform="rotate(-90 75,420)">Plakrand</text>
// After my replace:
// <text x="75" y="420" class="text-body" textAnchor="middle" style={{fontSize: "20px", opacity: 0.5}} transform="rotate(-90 75,420)">Plakrand</text>
// Let's use a simpler replace.
