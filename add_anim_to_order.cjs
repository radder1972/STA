const fs = require('fs');
let code = fs.readFileSync('src/components/OrderCards.jsx', 'utf8');

if (!code.includes("import AnimatedBox3D")) {
    code = code.replace(
        "import productFoto from '../assets/images/foto-doosje.jpg';",
        "import productFoto from '../assets/images/foto-doosje.jpg';\nimport AnimatedBox3D from './AnimatedBox3D';"
    );
    
    // Find the photo block
    const photoBlock = `<div style={{ maxWidth: '600px', width: '100%', marginBottom: '2rem' }}>
            <img src={productFoto} alt="Schematherapie theoriekaarten in de praktijk" style={{ width: '100%', borderRadius: '15px', boxShadow: '0 8px 30px rgba(0,0,0,0.1)' }} />
          </div>`;
          
    const replacement = photoBlock + `
          <div style={{ maxWidth: '600px', width: '100%', marginBottom: '2rem', background: '#f8fafc', borderRadius: '15px', padding: '1rem', border: '1px solid #e2e8f0', boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.02)' }}>
             <h4 style={{ textAlign: 'center', margin: '0 0 1rem 0', color: '#475569', fontSize: '0.9rem', fontWeight: 600 }}>Preview van de vernieuwde verpakking</h4>
             <AnimatedBox3D />
          </div>`;
          
    code = code.replace(photoBlock, replacement);
    fs.writeFileSync('src/components/OrderCards.jsx', code);
    console.log("Updated OrderCards.");
}
