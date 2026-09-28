export const getCardColor = (type, id) => {
  if (type === 'mode') {
    const childModes = ['kk', 'rk', 'ik', 'ok', 'bk'];
    const parentModes = ['so', 'vo'];
    const copingModes = ['wi', 'ob', 'oz', 'wk', 'zh', 'pa'];
    
    if (childModes.includes(id)) return '#34d399';
    if (parentModes.includes(id)) return '#60a5fa';
    if (copingModes.includes(id)) return '#facc15';
    if (id === 'gv') return '#fb923c';
  } else if (type === 'schema') {
    const safeId = id.replace('/', '_');
    const cat1 = ['Abandonment', 'Mistrust', 'Emotional deprivation', 'Defectiveness_unlovability', 'Social isolation_Alienation'];
    const cat2 = ['Practical incompetence_Dependence', 'Vulnerability to harm_illness', 'Enmeshment', 'Failure to achieve'];
    const cat3 = ['Subjugation', 'Self-sacrifice', 'Admiration_Recognition-seeking'];
    const cat4 = ['Pessimism_Worry', 'Emotional inhibition', 'Unrelenting Standards', 'Self-punitiveness'];
    const cat5 = ['Entitlement_Superiority', 'Insufficient self-control_self-discipline'];
    
    if (cat1.includes(safeId)) return '#34d399';
    if (cat2.includes(safeId)) return '#60a5fa';
    if (cat3.includes(safeId)) return '#facc15';
    if (cat4.includes(safeId)) return '#fb923c';
    if (cat5.includes(safeId)) return '#f87171';
  }
  
  return 'rgba(0,0,0,0.15)'; // Default subtiel grijs randje
};

export const CardInnerBorder = ({ color }) => {
  const isHex = color.startsWith('#');
  const tintColor = isHex ? `${color}25` : 'rgba(0,0,0,0.03)';
  
  return (
    <div style={{ 
      position: 'absolute', 
      top: 0, left: 0, right: 0, bottom: 0, 
      border: `6px solid ${tintColor}`, 
      borderRadius: '12px', 
      pointerEvents: 'none', 
      zIndex: 50,
      boxSizing: 'border-box'
    }}>
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        border: `2px solid ${color}`,
        borderRadius: '6px',
        boxSizing: 'border-box'
      }}></div>
    </div>
  );
};
