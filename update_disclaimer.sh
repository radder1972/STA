sed -i '' 's/<div style={{ marginTop: "2rem", display: "inline-block", background: "rgba(234, 88, 12, 0.1)", border: "2px solid #ea580c", borderRadius: "12px", padding: "16px 24px", boxShadow: "0 4px 15px rgba(234, 88, 12, 0.15)" }}>/<div style={{ marginTop: "2rem", display: "inline-block", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "16px 24px", maxWidth: "700px", textAlign: "left", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>/g' src/components/StartHub.jsx

sed -i '' 's/<h2 style={{ color: "#ea580c", margin: 0, fontSize: "1.4rem", fontWeight: "800", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>/<h2 style={{ color: "#475569", margin: 0, fontSize: "1rem", fontWeight: "700", display: "flex", alignItems: "center", gap: "8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>/g' src/components/StartHub.jsx

sed -i '' 's/⚠️ Let op: Dit is een onafhankelijk hobbyproject/<InfoIcon size={16} \/> Onafhankelijkheidsverklaring \& Disclaimer/g' src/components/StartHub.jsx

sed -i '' 's/<p style={{ margin: "8px 0 0 0", color: "#ea580c", fontWeight: "600", fontSize: "1rem" }}>/<p style={{ margin: "8px 0 0 0", color: "#64748b", fontWeight: "400", fontSize: "0.95rem", lineHeight: "1.5" }}>/g' src/components/StartHub.jsx

sed -i '' 's/Deze suite is ontwikkeld uit persoonlijk enthousiasme. Geen winstoogmerk, geen commerciële partij en geen formele banden met officiële instanties./Het Digitaal Schematherapie Platform is een onafhankelijk hobbyproject, ontwikkeld uit persoonlijk enthousiasme zonder commercieel winstoogmerk of formele banden met officiële instanties. Door gebruik te maken van de suite ga je akkoord met de <a href="#verantwoording" style={{ color: "#0ea5e9", textDecoration: "underline", fontWeight: "500" }}>gebruiksvoorwaarden \& verantwoording<\/a>./g' src/components/StartHub.jsx

