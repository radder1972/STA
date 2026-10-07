const fs = require('fs');
let code = fs.readFileSync('src/components/Icons.jsx', 'utf8');

const oldBarHTML = `      <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 16px", background: "linear-gradient(135deg, rgba(241, 245, 249, 0.8) 0%, rgba(226, 232, 240, 0.5) 100%)", border: "1px solid rgba(203, 213, 225, 0.8)", borderRadius: "20px", fontSize: "0.85rem", color: "#475569", fontWeight: "500", marginTop: "10px", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.8), 0 2px 8px rgba(15, 23, 42, 0.04)" }}>
        <ShieldIcon size={14} color="#0ea5e9" />
        <a href="index.html#verantwoording" style={{ color: "#0f172a", textDecoration: "none", fontWeight: "600", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color = "#0ea5e9"} onMouseLeave={(e) => e.target.style.color = "#0f172a"}>Onafhankelijk non-profit project</a> &bull; <a href="index.html#verantwoording" style={{ color: "#0f172a", textDecoration: "none", fontWeight: "600", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color = "#0ea5e9"} onMouseLeave={(e) => e.target.style.color = "#0f172a"}>Disclaimer & Verantwoording</a>
      </div>`;

const newBarHTML = `      <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 16px", background: currentTheme.bg, border: \`1px solid \${currentTheme.border}\`, borderRadius: "20px", fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "10px" }}>
        <ShieldIcon size={14} color={currentTheme.isGradient ? '#0284c7' : currentTheme.color} />
        <a href="index.html#verantwoording" style={{ color: "var(--text-muted)", textDecoration: "none", fontWeight: "400", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color = currentTheme.isGradient ? '#0284c7' : currentTheme.color} onMouseLeave={(e) => e.target.style.color = "var(--text-muted)"}>Onafhankelijk non-profit project</a> &bull; <a href="index.html#verantwoording" style={{ color: "var(--text-muted)", textDecoration: "none", fontWeight: "400", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color = currentTheme.isGradient ? '#0284c7' : currentTheme.color} onMouseLeave={(e) => e.target.style.color = "var(--text-muted)"}>Disclaimer & Verantwoording</a>
      </div>`;

code = code.replace(oldBarHTML, newBarHTML);

fs.writeFileSync('src/components/Icons.jsx', code);
