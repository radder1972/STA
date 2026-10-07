const fs = require('fs');
let code = fs.readFileSync('src/components/GamePortal.jsx', 'utf8');

// Ensure CornerCardFan is imported
if (!code.includes('import CornerCardFan')) {
  code = code.replace(
    'import OrderBoxAnimation from "./OrderBoxAnimation";',
    'import OrderBoxAnimation from "./OrderBoxAnimation";\nimport CornerCardFan from "./CornerCardFan";'
  );
}

// Ensure the inner-box is relative so the absolute CornerCardFan is constrained, though actually we want it to break out relative to the inner-box!
code = code.replace(
  '<div className="inner-box" onMouseEnter={() => setIsHoveredOrder(true)} onMouseLeave={() => setIsHoveredOrder(false)} style={{ display: \'flex\', alignItems: \'flex-start\', gap: \'1.5rem\', background: \'linear-gradient(to right, rgba(255, 255, 255, 1), rgba(255, 247, 237, 0.8))\', border: \'1px solid rgba(234, 88, 12, 0.3)\', boxShadow: \'0 8px 30px rgba(234, 88, 12, 0.1)\' }}>',
  '<div className="inner-box" onMouseEnter={() => setIsHoveredOrder(true)} onMouseLeave={() => setIsHoveredOrder(false)} style={{ position: \'relative\', display: \'flex\', alignItems: \'flex-start\', gap: \'1.5rem\', background: \'linear-gradient(to right, rgba(255, 255, 255, 1), rgba(255, 247, 237, 0.8))\', border: \'1px solid rgba(234, 88, 12, 0.3)\', boxShadow: \'0 8px 30px rgba(234, 88, 12, 0.1)\' }}>\n          <CornerCardFan isHovered={isHoveredOrder} />'
);

code = code.replace(
  '<OrderBoxAnimation isHovered={isHoveredOrder} />',
  '<ShoppingCartIcon size={32} />'
);

fs.writeFileSync('src/components/GamePortal.jsx', code);
