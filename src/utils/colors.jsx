export const getCardColor = (type, id) => {
  if (type === 'mode') {
    const childModes = ['kk', 'rk', 'ik', 'ok', 'bk'];
    const parentModes = ['so', 'vo'];
    const copingModes = ['wi', 'ob', 'oz', 'wk', 'zh', 'pa'];
    
    if (childModes.includes(id)) return '#60a5fa'; // Blauw
    if (parentModes.includes(id)) return '#f87171'; // Rood
    if (copingModes.includes(id)) return '#facc15'; // Geel
    if (id === 'gv') return '#34d399'; // Groen
  } else if (type === 'schema') {
    const safeId = id.replace('/', '_');
    const cat1 = ['Abandonment', 'Mistrust', 'Emotional deprivation', 'Defectiveness_unlovability', 'Social isolation_Alienation'];
    const cat2 = ['Practical incompetence_Dependence', 'Vulnerability to harm_illness', 'Enmeshment', 'Failure to achieve'];
    const cat3 = ['Subjugation', 'Self-sacrifice', 'Admiration_Recognition-seeking'];
    const cat4 = ['Pessimism_Worry', 'Emotional inhibition', 'Unrelenting Standards', 'Self-punitiveness'];
    const cat5 = ['Entitlement_Superiority', 'Insufficient self-control_self-discipline'];
    
    // YSQ Domains
    if (cat1.includes(safeId)) return '#60a5fa'; // Domein 1: Onthechting/Afwijzing -> Blauw (Triggert Kindmodi)
    if (cat2.includes(safeId)) return '#34d399'; // Domein 2: Autonomie -> Groen (Gezonde Volwassene)
    if (cat3.includes(safeId)) return '#facc15'; // Domein 4: Gerichtheid op anderen -> Geel (Copingmodi)
    if (cat4.includes(safeId)) return '#f87171'; // Domein 5: Overmatige waakzaamheid -> Rood (Oudermodi)
    if (cat5.includes(safeId)) return '#fb923c'; // Domein 3: Realistische grenzen -> Oranje
  } else if (type === 'basisbehoefte') {
    if (id === 'veilige-hechting') return '#60a5fa'; // Blauw
    if (id === 'autonomie') return '#34d399'; // Groen
    if (id === 'realistische-grenzen') return '#fb923c'; // Oranje
    if (id === 'vrije-expressie') return '#facc15'; // Geel
    if (id === 'spontaniteit-en-spel') return '#f87171'; // Rood
  } else if (type === 'modicategorie') {
    if (id === 'kindmodi') return '#60a5fa';
    if (id === 'oudermodi') return '#f87171';
    if (id.startsWith('coping')) return '#facc15';
    if (id === 'gezonde-volwassene') return '#34d399';
  }
  
  return 'rgba(0,0,0,0.15)'; // Default subtiel grijs randje
};

export const CardInnerBorder = ({ color, outerColor }) => {
  const isHex = color.startsWith('#');
  const tintColor = outerColor || (isHex ? `${color}25` : 'rgba(0,0,0,0.03)');
  const hoverShadowColor = isHex ? `${color}50` : 'rgba(0,0,0,0.2)'; // 31% opacity
  const safeClass = 'hover-border-' + color.replace(/[^a-zA-Z0-9]/g, '');

  return (
    <>
      <style>{`
        .card-scene:hover .${safeClass} {
           box-shadow: 0 12px 35px ${hoverShadowColor} !important;
        }
        .${safeClass} ~ div img,
        .${safeClass} ~ img {
           filter: drop-shadow(0 0 0 ${color}) drop-shadow(0 4px 10px ${color}60) !important;
        }
        .${safeClass} ~ button.btn-card:hover {
           background: ${color} !important;
           border-color: ${color} !important;
           color: white !important;
           box-shadow: 0 4px 15px ${color}60 !important;
        }
        .${safeClass} ~ button.btn-card:hover .btn-text {
           background: none !important;
           -webkit-text-fill-color: white !important;
           color: white !important;
        }
      `}</style>
      <div className={safeClass} style={{ 
        position: 'absolute', 
        top: 0, left: 0, right: 0, bottom: 0, 
        border: `6px solid ${tintColor}`, 
        borderRadius: '12px', 
        pointerEvents: 'none', 
        zIndex: 50,
        boxSizing: 'border-box',
        transition: 'box-shadow 0.3s ease'
      }}>
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          border: `2px solid ${color}`,
          borderRadius: '6px',
          boxSizing: 'border-box'
        }}></div>
      </div>
    </>
  );
};
