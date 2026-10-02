export const getCardColor = (type, id, title) => {
  // Allow passing a full card object as the first argument: getCardColor(card)
  if (type && typeof type === 'object') {
    if (type.color) return type.color;
    title = type.title;
    id = type.id;
    type = type.type;
  }

  const safeType = (type || '').toLowerCase();
  const safeId = (id || '').toString();
  const safeTitle = (title || '').toString().toLowerCase();

  if (safeType === 'mode') {
    if (safeId === 'vst_m_bk' || safeId === 'bk' || safeTitle.includes('blije kind')) return '#34d399'; // Groen
    if (safeId === 'gv' || safeTitle.includes('gezonde volwassene')) return '#34d399'; // Groen

    const childModes = ['kk', 'rk', 'ik', 'ok'];
    if (childModes.includes(safeId) || safeTitle.includes('kwetsbare') || safeTitle.includes('razende') || safeTitle.includes('impulsieve') || safeTitle.includes('ongedisciplineerde') || safeTitle.includes('boze kind')) return '#60a5fa'; // Blauw

    const parentModes = ['so', 'vo'];
    if (parentModes.includes(safeId) || safeTitle.includes('straffende') || safeTitle.includes('veeleisende')) return '#f87171'; // Rood

    // Coping modes: all yellow (#facc15 / #eab308)
    const copingModes = ['wi', 'ob', 'oz', 'wk', 'zh', 'pa', 'vst_m_bb', 'vst_m_po', 'vst_m_bm', 'vst_m_ae', 'vst_m_rd', 'mc3d'];
    if (copingModes.includes(safeId) || safeTitle.includes('inschikkelijke') || safeTitle.includes('beschermer') || safeTitle.includes('zelfsusser') || safeTitle.includes('overcontroleerder') || safeTitle.includes('zelfverheerlijker') || safeTitle.includes('pest') || safeTitle.includes('bedrog') || safeTitle.includes('erkenningzoeker') || safeTitle.includes('roofdier') || safeTitle.includes('coping')) return '#facc15'; // Geel
  } else if (safeType === 'schema') {
    const cleanId = safeId.replace('/', '_');
    
    if (cleanId === 'vst_s1' || cleanId === 'vst_s2' || safeTitle.includes('coherente identiteit') || safeTitle.includes('betekenisvolle wereld')) return '#a855f7'; // Paars
    if (cleanId === 'vst_s3' || safeTitle.includes('onrechtvaardigheid')) return '#78350f'; // Bruin

    const cat1 = ['Abandonment', 'Mistrust', 'Emotional deprivation', 'Defectiveness_unlovability', 'Social isolation_Alienation'];
    if (cat1.includes(cleanId) || safeTitle.includes('verlating') || safeTitle.includes('wantrouwen') || safeTitle.includes('emotioneel') || safeTitle.includes('minderwaardigheid') || safeTitle.includes('isolement')) return '#60a5fa'; // Blauw

    const cat2 = ['Practical incompetence_Dependence', 'Vulnerability to harm_illness', 'Enmeshment', 'Failure to achieve'];
    if (cat2.includes(cleanId) || safeTitle.includes('afhankelijkheid') || safeTitle.includes('kwetsbaarheid') || safeTitle.includes('verstrengeling') || safeTitle.includes('mislukking')) return '#34d399'; // Groen

    const cat3 = ['Subjugation', 'Self-sacrifice', 'Admiration_Recognition-seeking'];
    if (cat3.includes(cleanId) || safeTitle.includes('onderwerping') || safeTitle.includes('zelfopoffering') || safeTitle.includes('goedkeuring')) return '#facc15'; // Geel

    const cat4 = ['Pessimism_Worry', 'Emotional inhibition', 'Unrelenting Standards', 'Self-punitiveness'];
    if (cat4.includes(cleanId) || safeTitle.includes('pessimisme') || safeTitle.includes('geremdheid') || safeTitle.includes('normen') || safeTitle.includes('bestraffend')) return '#f87171'; // Rood

    const cat5 = ['Entitlement_Superiority', 'Insufficient self-control_self-discipline'];
    if (cat5.includes(cleanId) || safeTitle.includes('rechten') || safeTitle.includes('zelfcontrole')) return '#fb923c'; // Oranje
  } else if (safeType === 'basisbehoefte' || safeType === 'need') {
    if (safeId === 'bb1' || safeTitle.includes('veiligheid') || safeTitle.includes('hechting')) return '#60a5fa'; // Blauw
    if (safeId === 'bb2' || safeTitle.includes('autonomie')) return '#34d399'; // Groen
    if (safeId === 'bb3' || safeTitle.includes('expressie')) return '#facc15'; // Geel
    if (safeId === 'bb4' || safeTitle.includes('spontaniteit') || safeTitle.includes('spel')) return '#f87171'; // Rood
    if (safeId === 'bb5' || safeTitle.includes('grenzen')) return '#fb923c'; // Oranje
    if (safeId === 'bb6' || safeTitle.includes('zelfcoherentie')) return '#a855f7'; // Paars
    if (safeId === 'bb7' || safeTitle.includes('rechtvaardigheid')) return '#78350f'; // Bruin
  } else if (safeType === 'modicategorie') {
    if (safeId === 'kindmodi' || safeTitle.includes('kind')) return '#60a5fa';
    if (safeId === 'oudermodi' || safeTitle.includes('ouder')) return '#f87171';
    if (safeId.startsWith('coping') || safeTitle.includes('coping')) return '#facc15';
    if (safeId === 'gezonde-volwassene' || safeTitle.includes('volwassene')) return '#34d399';
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
