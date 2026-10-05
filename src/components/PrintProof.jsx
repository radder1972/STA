import React from 'react';

export default function PrintProof() {
  return (
    <div style={{ backgroundColor: '#52525b', fontFamily: 'system-ui, sans-serif', minHeight: '100vh', margin: 0, padding: 0 }}>
      {/* Top Toolbar */}
      <div style={{ backgroundColor: '#3f3f46', color: 'white', padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontWeight: 'bold', fontSize: '14px', letterSpacing: '1px', textTransform: 'uppercase' }}>Drukproef Viewer</span>
          <span style={{ fontSize: '12px', color: '#a1a1aa', backgroundColor: '#3f3f46', padding: '4px 8px', borderRadius: '4px' }}>bestel-doosje-v1.pdf (1 pagina)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '14px', backgroundColor: 'rgba(34, 197, 94, 0.2)', color: '#86efac', padding: '4px 12px', borderRadius: '999px', border: '1px solid rgba(34, 197, 94, 0.5)' }}>✓ Preflight OK</span>
          <button onClick={() => window.print()} style={{ backgroundColor: '#e4e4e7', color: '#27272a', padding: '6px 16px', borderRadius: '4px', fontSize: '14px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>Afdrukken / Opslaan</button>
        </div>
      </div>

      {/* Main Container */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 20px', minHeight: '100vh' }}>
        
        {/* PDF PAGE */}
        <div style={{ backgroundColor: 'white', width: '100%', maxWidth: '1000px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', marginBottom: '40px', position: 'relative' }}>
          
          {/* Formal Print Header */}
          <div style={{ borderBottom: '2px solid #e4e4e7', padding: '30px', display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e293b', textTransform: 'uppercase', letterSpacing: '1px', margin: 0 }}>Productie Drukproef</h1>
              <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px', margin: 0 }}>Digitaal Schematherapie Platform</p>
            </div>
            <div style={{ textAlign: 'right', fontSize: '14px', color: '#475569' }}>
              <table style={{ textAlign: 'left', marginLeft: 'auto' }}>
                <tbody>
                  <tr><td style={{ paddingRight: '16px', fontWeight: 'bold', color: '#1e293b' }}>Product:</td><td>Speelkaartendoosje (Tuck Box)</td></tr>
                  <tr><td style={{ paddingRight: '16px', fontWeight: 'bold', color: '#1e293b' }}>Formaat:</td><td>65 x 90 x 18 mm (B x H x D)</td></tr>
                  <tr><td style={{ paddingRight: '16px', fontWeight: 'bold', color: '#1e293b' }}>Materiaal:</td><td>300g eenzijdig gestreken sulfaatkarton</td></tr>
                  <tr><td style={{ paddingRight: '16px', fontWeight: 'bold', color: '#1e293b' }}>Afwerking:</td><td>Krasvast Mat Laminaat + Spot UV (Sterren)</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div style={{ padding: '40px' }} dangerouslySetInnerHTML={{ __html: `
            <!-- SVG Layout with dimension markers -->
            <svg width="100%" height="auto" viewBox="-100 -100 2050 1700" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
                </marker>
                <pattern id="star-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                  <circle cx="20" cy="30" r="3" fill="#0ea5e9" opacity="0.6"/>
                  <circle cx="80" cy="20" r="2" fill="#f59e0b" opacity="0.6"/>
                  <circle cx="85" cy="70" r="4" fill="#8b5cf6" opacity="0.4"/>
                  <circle cx="15" cy="80" r="2" fill="#10b981" opacity="0.5"/>
                  <circle cx="50" cy="10" r="3" fill="#f43f5e" opacity="0.6"/>
                  <circle cx="30" cy="60" r="2" fill="#0ea5e9" opacity="0.5"/>
                  <circle cx="70" cy="85" r="3" fill="#f59e0b" opacity="0.7"/>
                  <path d="M40 40 L42 46 L48 48 L42 50 L40 56 L38 50 L32 48 L38 46 Z" fill="#0ea5e9" opacity="0.5" />
                  <path d="M60 60 L61 63 L64 64 L61 65 L60 68 L59 65 L56 64 L59 63 Z" fill="#8b5cf6" opacity="0.6" />
                </pattern>
                <style>
                  .cut { stroke: #ef4444; stroke-width: 3; fill: none; }
                  .fold { stroke: #3b82f6; stroke-width: 3; stroke-dasharray: 15,10; fill: none; }
                  .bleed-bg { fill: #f0f9ff; }
                  .text-title { font-family: ui-sans-serif, system-ui, sans-serif; font-weight: 800; font-size: 60px; fill: #0f172a; text-anchor: middle; }
                  .text-sub { font-family: ui-sans-serif, system-ui, sans-serif; font-weight: 600; font-size: 24px; fill: #0ea5e9; text-anchor: middle; letter-spacing: 2px; }
                  .text-body { font-family: ui-sans-serif, system-ui, sans-serif; font-size: 24px; fill: #334155; }
                  .dimension-line { stroke: #10b981; stroke-width: 2; marker-end: url(#arrow); marker-start: url(#arrow); }
                  .dimension-text { fill: #10b981; font-size: 24px; font-weight: bold; font-family: monospace; text-anchor: middle; }
                </style>
              </defs>

              <path d="M 120,300 L 120,200 L 270,200 L 330,20 L 980,20 L 1040,200 L 1150,200 L 1150,300 L 1840,300 L 1840,1200 L 1150,1200 L 1150,1300 L 1040,1480 L 980,1480 L 330,1480 L 270,1300 L 120,1300 L 120,1200 L -30,1200 L -30,300 Z" fill="#e2e8f0" opacity="0.5" stroke="#10b981" stroke-width="2" stroke-dasharray="10,5" />
              <path d="M 150,330 L 150,230 L 290,230 L 350,50 L 950,50 L 1010,230 L 1120,230 L 1120,330 L 1810,330 L 1810,1170 L 1120,1170 L 1120,1270 L 1010,1450 L 950,1450 L 350,1450 L 290,1270 L 150,1270 L 150,1170 L 0,1170 L 0,330 Z" class="bleed-bg" />

              <line x1="0" y1="1550" x2="1810" y2="1550" class="dimension-line" />
              <text x="905" y="1530" class="dimension-text">Totaal Plano Breedte: 181 mm</text>
              <line x1="330" y1="1250" x2="980" y2="1250" class="dimension-line" />
              <text x="655" y="1230" class="dimension-text">Voorkant: 65 mm</text>
              <line x1="1900" y1="330" x2="1900" y2="1170" class="dimension-line" />
              <text x="1930" y="750" class="dimension-text" transform="rotate(90 1930,750)">Hoogte: 90 mm</text>
              <line x1="150" y1="1250" x2="330" y2="1250" class="dimension-line" />
              <text x="240" y="1230" class="dimension-text">18mm</text>
              <line x1="980" y1="1250" x2="1160" y2="1250" class="dimension-line" />
              <text x="1070" y="1230" class="dimension-text">18mm</text>

              <g transform="translate(0, 330)">
                <rect x="0" y="0" width="150" height="840" class="fold" />
                <line x1="0" y1="0" x2="150" y2="20" class="cut" />
                <line x1="0" y1="840" x2="150" y2="820" class="cut" />
                <line x1="0" y1="0" x2="0" y2="840" class="cut" />
                <text x="75" y="420" class="text-body" style="font-size:20px; opacity:0.5; text-anchor:middle;" transform="rotate(-90 75,420)">Plakrand</text>
                <text x="75" y="750" class="text-body" textAnchor="middle" style={{ fontSize: "14px", opacity: 0.5}} transform="rotate(-90 75,750)">Versie 4.2.1</text>
                
                <rect x="150" y="0" width="180" height="840" class="fold" />
                <path d="M 150,0 L 150,-100 L 290,-100 L 330,0 Z" class="cut" />
                <line x1="150" y1="0" x2="330" y2="0" class="fold" />
                <path d="M 150,840 L 150,940 L 290,940 L 330,840 Z" class="cut" />
                <line x1="150" y1="840" x2="330" y2="840" class="fold" />
                <text x="240" y="420" class="text-sub" style="font-size:20px;" transform="rotate(-90 240,420)">Schematherapiekaarten</text>

                <rect x="330" y="0" width="650" height="840" class="fold" />
                <rect x="330" y="-180" width="650" height="180" class="fold" />
                <path d="M 330,-180 L 350,-280 L 960,-280 L 980,-180 Z" class="cut" />
                <line x1="330" y1="-180" x2="980" y2="-180" class="fold" />
                <line x1="330" y1="0" x2="980" y2="0" class="fold" />
                <rect x="330" y="840" width="650" height="180" class="fold" />
                <g transform="translate(330, 840)">
                   <g transform="translate(115, 60)">
                    <rect x="0" y="0" width="420" height="60" rx="30" fill="white" stroke="#cbd5e1" strokeWidth="2" />
                    <g transform="translate(20, 18) scale(1)">
                      <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" fill="#0ea5e9" />
                      <path d="M19 3L19.8 5.2L22 6L19.8 6.8L19 9L18.2 6.8L16 6L18.2 5.2L19 3Z" fill="#f59e0b" />
                      <path d="M5 16L5.8 18.2L8 19L5.8 19.8L5 22L4.2 19.8L2 19L4.2 18.2L5 16Z" fill="#10b981" />
                    </g>
                    <text x="60" y="37" style={{fontFamily: "ui-sans-serif, system-ui, sans-serif", fontSize: "17px", fontWeight: "800", fill: "#0f172a", letterSpacing: "0.5px"}}>DIGITAAL SCHEMATHERAPIE PLATFORM</text>
                  </g>
                </g>
                <path d="M 330,1020 L 350,1120 L 960,1120 L 980,1020 Z" class="cut" />
                <line x1="330" y1="1020" x2="980" y2="1020" class="fold" />
                <line x1="330" y1="840" x2="980" y2="840" class="fold" />
                
                <g transform="translate(330, 0)">
                  <rect x="50" y="200" width="550" height="500" fill="url(#star-pattern)" />
                  <text x="325" y="160" class="text-title">Schematherapie<tspan x="325" dy="80">kaarten</tspan></text>
                  <g transform="translate(229, 320) scale(8)">
                    <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" fill="#0ea5e9" />
                    <path d="M19 3L19.8 5.2L22 6L19.8 6.8L19 9L18.2 6.8L16 6L18.2 5.2L19 3Z" fill="#f59e0b" />
                    <path d="M5 16L5.8 18.2L8 19L5.8 19.8L5 22L4.2 19.8L2 19L4.2 18.2L5 16Z" fill="#10b981" />
                  </g>
                  <text x="325" y="660" class="text-sub">VSt 2021 Update</text>
                  <text x="325" y="780" class="text-body" style="font-size: 18px; opacity: 0.6; text-anchor: middle;">55 THEORIEKAARTEN</text>
                </g>
                
                <g transform="translate(330, -180)">
                   <g transform="translate(115, 60)">
                    <rect x="0" y="0" width="420" height="60" rx="30" fill="white" stroke="#cbd5e1" strokeWidth="2" />
                    <g transform="translate(20, 18) scale(1)">
                      <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" fill="#0ea5e9" />
                      <path d="M19 3L19.8 5.2L22 6L19.8 6.8L19 9L18.2 6.8L16 6L18.2 5.2L19 3Z" fill="#f59e0b" />
                      <path d="M5 16L5.8 18.2L8 19L5.8 19.8L5 22L4.2 19.8L2 19L4.2 18.2L5 16Z" fill="#10b981" />
                    </g>
                    <text x="60" y="37" style={{fontFamily: "ui-sans-serif, system-ui, sans-serif", fontSize: "17px", fontWeight: "800", fill: "#0f172a", letterSpacing: "0.5px"}}>DIGITAAL SCHEMATHERAPIE PLATFORM</text>
                  </g>
                </g>

                <rect x="980" y="0" width="180" height="840" class="fold" />
                <path d="M 980,0 L 1020,-100 L 1160,-100 L 1160,0 Z" class="cut" />
                <line x1="980" y1="0" x2="1160" y2="0" class="fold" />
                <path d="M 980,840 L 1020,940 L 1160,940 L 1160,840 Z" class="cut" />
                <line x1="980" y1="840" x2="1160" y2="840" class="fold" />
                <text x="1070" y="420" class="text-sub" style="font-size:20px;" transform="rotate(-90 1070,420)">VSt 2021 Update</text>

                <rect x="1160" y="0" width="650" height="840" class="fold" />
                <line x1="1160" y1="0" x2="1810" y2="0" class="cut" />
                <line x1="1810" y1="0" x2="1810" y2="840" class="cut" />
                <line x1="1160" y1="840" x2="1810" y2="840" class="cut" />
                
                <g transform="translate(1160, 0)">
                  <text x="325" y="150" class="text-sub" textAnchor="middle" style={{ fontSize: "28px"}}>55 Theoriekaarten</text>
                  
                  <text x="325" y="240" class="text-body" textAnchor="middle" style={{ fontSize: "24px", fill: "#475569"}}>Een actuele en complete referentieset</text>
                  <text x="325" y="280" class="text-body" textAnchor="middle" style={{ fontSize: "24px", fill: "#475569"}}>voor gebruik in de klinische praktijk.</text>
                  <text x="325" y="340" class="text-body" textAnchor="middle" style={{ fontSize: "24px", fill: "#475569"}}>Volledig afgestemd op de herziene</text>
                  <text x="325" y="380" class="text-body" textAnchor="middle" style={{ fontSize: "24px", fill: "#475569"}}>behandelrichtlijnen (VSt, Arntz et al. 2021).</text>

                  <g transform="translate(265, 480)">
                    <circle cx="0" cy="0" r="8" fill="#f59e0b" />
                    <circle cx="30" cy="0" r="8" fill="#10b981" />
                    <circle cx="60" cy="0" r="8" fill="#0ea5e9" />
                    <circle cx="90" cy="0" r="8" fill="#8b5cf6" />
                    <circle cx="120" cy="0" r="8" fill="#f43f5e" />
                  </g>

                  <g transform="translate(115, 660)">
                    <rect x="0" y="0" width="420" height="60" rx="30" fill="white" stroke="#cbd5e1" strokeWidth="2" />
                    <g transform="translate(20, 18) scale(1)">
                      <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" fill="#0ea5e9" />
                      <path d="M19 3L19.8 5.2L22 6L19.8 6.8L19 9L18.2 6.8L16 6L18.2 5.2L19 3Z" fill="#f59e0b" />
                      <path d="M5 16L5.8 18.2L8 19L5.8 19.8L5 22L4.2 19.8L2 19L4.2 18.2L5 16Z" fill="#10b981" />
                    </g>
                    <text x="60" y="37" style={{fontFamily: "ui-sans-serif, system-ui, sans-serif", fontSize: "17px", fontWeight: "800", fill: "#0f172a", letterSpacing: "0.5px"}}>DIGITAAL SCHEMATHERAPIE PLATFORM</text>
                  </g>
                </g>
              </g>
            </svg>
          `}} />

          {/* Legenda Footer */}
          <div style={{ marginTop: '20px', paddingBottom: '30px', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '32px', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '20px' }}>
              <div style={{ width: '24px', height: '4px', backgroundColor: '#ef4444' }}></div>
              <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#334155' }}>Snijlijn</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '20px' }}>
              <div style={{ width: '24px', height: '4px', borderTop: '2px dashed #3b82f6' }}></div>
              <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#334155' }}>Vouwlijn</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '20px' }}>
              <div style={{ width: '16px', height: '16px', backgroundColor: '#d1fae5', border: '1px solid #10b981' }}></div>
              <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#334155' }}>3mm Afloop / Bleed</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
