const fs = require('fs');
let code = fs.readFileSync('src/components/Icons.jsx', 'utf8');

const oldBarHTML = `      <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 16px", background: currentTheme.bg, border: \`1px solid \${currentTheme.border}\`, borderRadius: "20px", fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "10px" }}>`;

const newBarHTML = `      <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 16px", background: "#ffffff", border: \`1px solid \${currentTheme.border}\`, borderRadius: "20px", fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "10px" }}>`;

code = code.replace(oldBarHTML, newBarHTML);

fs.writeFileSync('src/components/Icons.jsx', code);
