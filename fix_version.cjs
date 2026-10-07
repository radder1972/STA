const fs = require('fs');
let code = fs.readFileSync('src/components/PrintProof.jsx', 'utf8');

if (!code.includes("Versie 4.2.1")) {
    code = code.replace(
        /transform="rotate\(-90 75,420\)">Plakrand<\/text>/,
        'transform="rotate(-90 75,420)">Plakrand</text>\n                <text x="75" y="750" class="text-body" textAnchor="middle" style={{ fontSize: "14px", opacity: 0.5}} transform="rotate(-90 75,750)">Versie 4.2.1</text>'
    );
    fs.writeFileSync('src/components/PrintProof.jsx', code);
}
