const fs = require('fs');
let code = fs.readFileSync('src/components/PrintProof.jsx', 'utf8');

const regex1 = /<text x="325" y="240"[^>]*>[\s\n]*Een actuele en complete referentieset[\s\n]*<\/text>/g;
code = code.replace(regex1, '<text x="325" y="240" class="text-body" textAnchor="middle" style={{ fontSize: "24px", fill: "#475569"}}>Een actuele en complete referentieset</text>');

const regex2 = /<text x="325" y="280"[^>]*>[\s\n]*voor gebruik in de klinische praktijk.[\s\n]*<\/text>/g;
code = code.replace(regex2, '<text x="325" y="280" class="text-body" textAnchor="middle" style={{ fontSize: "24px", fill: "#475569"}}>voor gebruik in de klinische praktijk.</text>');

const regex3 = /<text x="325" y="340"[^>]*>[\s\n]*Volledig afgestemd op de herziene[\s\n]*<\/text>/g;
code = code.replace(regex3, '<text x="325" y="340" class="text-body" textAnchor="middle" style={{ fontSize: "24px", fill: "#475569"}}>Volledig afgestemd op de herziene</text>');

const regex4 = /<text x="325" y="380"[^>]*>[\s\n]*behandelrichtlijnen \(VSt, Arntz et al\. 2021\).[\s\n]*<\/text>/g;
code = code.replace(regex4, '<text x="325" y="380" class="text-body" textAnchor="middle" style={{ fontSize: "24px", fill: "#475569"}}>behandelrichtlijnen (VSt, Arntz et al. 2021).</text>');

fs.writeFileSync('src/components/PrintProof.jsx', code);
