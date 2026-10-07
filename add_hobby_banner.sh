sed -i '' '/Kies hieronder de gewenste werkvorm om direct aan de slag te gaan./a\
\
        <div style={{ marginTop: "2rem", display: "inline-block", background: "rgba(234, 88, 12, 0.1)", border: "2px solid #ea580c", borderRadius: "12px", padding: "16px 24px", boxShadow: "0 4px 15px rgba(234, 88, 12, 0.15)" }}>\
          <h2 style={{ color: "#ea580c", margin: 0, fontSize: "1.4rem", fontWeight: "800", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>\
             ⚠️ Let op: Dit is een onafhankelijk hobbyproject\
          </h2>\
          <p style={{ margin: "8px 0 0 0", color: "#ea580c", fontWeight: "600", fontSize: "1rem" }}>\
            Deze suite is ontwikkeld uit persoonlijk enthousiasme. Geen winstoogmerk, geen commerciële partij en geen formele banden met officiële instanties.\
          </p>\
        </div>\
' src/components/StartHub.jsx
