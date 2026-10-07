const fs = require('fs');
let code = fs.readFileSync('src/components/GamePortal.jsx', 'utf8');

code = code.replace(
  '<div className="inner-box" style={{ display: \'flex\', alignItems: \'flex-start\', gap: \'1.5rem\', background: \'linear-gradient(to right, rgba(255, 255, 255, 1), rgba(255, 247, 237, 0.8))\', border: \'1px solid rgba(234, 88, 12, 0.3)\', boxShadow: \'0 8px 30px rgba(234, 88, 12, 0.1)\' }}>',
  '<div className="inner-box" onMouseEnter={() => setIsHoveredOrder(true)} onMouseLeave={() => setIsHoveredOrder(false)} style={{ display: \'flex\', alignItems: \'flex-start\', gap: \'1.5rem\', background: \'linear-gradient(to right, rgba(255, 255, 255, 1), rgba(255, 247, 237, 0.8))\', border: \'1px solid rgba(234, 88, 12, 0.3)\', boxShadow: \'0 8px 30px rgba(234, 88, 12, 0.1)\' }}>'
);

code = code.replace(
  '<ShoppingCartIcon size={32} />',
  '<OrderBoxAnimation isHovered={isHoveredOrder} />'
);

fs.writeFileSync('src/components/GamePortal.jsx', code);
