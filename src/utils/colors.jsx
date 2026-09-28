export const getCardColor = (type, id) => {
  if (type === 'mode') {
    const childModes = ['kk', 'rk', 'ik', 'ok', 'bk'];
    const parentModes = ['so', 'vo'];
    const copingModes = ['wi', 'ob', 'oz', 'wk', 'zh', 'pa'];
    
    if (childModes.includes(id)) return '#10b981';
    if (parentModes.includes(id)) return '#3b82f6';
    if (copingModes.includes(id)) return '#eab308';
    if (id === 'gv') return '#f97316';
  } else if (type === 'schema') {
    const safeId = id.replace('/', '_');
    const cat1 = ['Abandonment', 'Mistrust', 'Emotional deprivation', 'Defectiveness_unlovability', 'Social isolation_Alienation'];
    const cat2 = ['Practical incompetence_Dependence', 'Vulnerability to harm_illness', 'Enmeshment', 'Failure to achieve'];
    const cat3 = ['Subjugation', 'Self-sacrifice', 'Admiration_Recognition-seeking'];
    const cat4 = ['Pessimism_Worry', 'Emotional inhibition', 'Unrelenting Standards', 'Self-punitiveness'];
    const cat5 = ['Entitlement_Superiority', 'Insufficient self-control_self-discipline'];
    
    if (cat1.includes(safeId)) return '#10b981';
    if (cat2.includes(safeId)) return '#3b82f6';
    if (cat3.includes(safeId)) return '#eab308';
    if (cat4.includes(safeId)) return '#f97316';
    if (cat5.includes(safeId)) return '#ef4444';
  }
  
  return 'rgba(0,0,0,0.15)'; // Default subtiel grijs randje
};

export const CardInnerBorder = ({ color }) => (
  <div style={{ position: 'absolute', top: '6px', left: '6px', right: '6px', bottom: '6px', border: `2px solid ${color}`, borderRadius: '10px', pointerEvents: 'none', zIndex: 50 }}></div>
);
