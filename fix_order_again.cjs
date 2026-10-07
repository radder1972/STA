const fs = require('fs');
let code = fs.readFileSync('src/components/OrderCards.jsx', 'utf8');

if (!code.includes("import AnimatedBox3D")) {
    code = code.replace(
        "import cardsStackImg from '../assets/images/cards-stack.jpg';",
        "import cardsStackImg from '../assets/images/cards-stack.jpg';\nimport AnimatedBox3D from './AnimatedBox3D';"
    );
}

const targetDiv = `              <img 
                src={cardsStackImg} 
                alt="Fysieke stapel Schematherapie Theoriekaarten" 
                style={{ width: '100%', height: 'auto', display: 'block' }} 
              />
            </div>`;

if (code.includes(targetDiv) && !code.includes("<AnimatedBox3D />")) {
    code = code.replace(targetDiv, targetDiv + `\n
            <div style={{ maxWidth: '600px', width: '100%', marginTop: '3rem', background: '#f8fafc', borderRadius: '15px', padding: '2rem 1rem', border: '1px solid #e2e8f0', boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.02)' }}>
               <h4 style={{ textAlign: 'center', margin: '0 0 1rem 0', color: '#475569', fontSize: '1rem', fontWeight: 600 }}>De vernieuwde verpakking</h4>
               <AnimatedBox3D />
            </div>`);
    fs.writeFileSync('src/components/OrderCards.jsx', code);
    console.log("Injected AnimatedBox3D successfully");
} else {
    console.log("Could not find target div or already injected");
}
