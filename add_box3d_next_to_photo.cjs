const fs = require('fs');
let code = fs.readFileSync('src/components/OrderCards.jsx', 'utf8');

if (!code.includes('import Box3D')) {
    code = code.replace("import SchemaCard from './SchemaCard';", "import SchemaCard from './SchemaCard';\nimport Box3D from './Box3D';");
}

const photoDivStr = `<div \n              style={{ \n                flex: '0 0 250px',`;
const newPhotoDivStr = `
            {/* 3D Box naast de foto */}
            <div style={{ flex: '0 0 150px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 5, transform: 'translateX(20px)' }}>
              <Box3D scale={0.9} spinning={true} />
            </div>
            
            <div 
              style={{ 
                flex: '0 0 250px',`;

code = code.replace(photoDivStr, newPhotoDivStr);
fs.writeFileSync('src/components/OrderCards.jsx', code);
