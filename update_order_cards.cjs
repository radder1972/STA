const fs = require('fs');
let code = fs.readFileSync('src/components/OrderCards.jsx', 'utf8');

if (!code.includes('import Box3D')) {
    code = code.replace("import SchemaCard from './SchemaCard';", "import SchemaCard from './SchemaCard';\nimport Box3D from './Box3D';");
}

const imgRegex = /<img\s+src=\{cardsStackImg\}[^>]+>/g;
code = code.replace(imgRegex, '<Box3D scale={1.2} spinning={true} />');

fs.writeFileSync('src/components/OrderCards.jsx', code);
