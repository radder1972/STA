const getCardColor = (type, id) => {
  if (type === 'mode') {
    const childModes = ['kk', 'rk', 'ik', 'ok', 'bk'];
    const parentModes = ['sb', 'es'];
    const copingModes = ['wi', 'ob', 'bo', 'bw', 'aa', 'pb'];
    if (childModes.includes(id)) return '#10b981';
    if (parentModes.includes(id)) return '#3b82f6';
    if (copingModes.includes(id)) return '#eab308';
    if (id === 'gv') return '#f97316';
  } else if (type === 'schema') {
    const cat1 = ['Abandonment', 'Mistrust', 'Emotional deprivation', 'Defectiveness_unlovability', 'Social isolation_Alienation'];
    const cat2 = ['Practical incompetence_Dependence', 'Vulnerability to harm_illness', 'Enmeshment', 'Failure to achieve'];
    const cat3 = ['Subjugation', 'Self-sacrifice', 'Admiration_Recognition-seeking'];
    const cat4 = ['Pessimism_Worry', 'Emotional inhibition', 'Unrelenting Standards', 'Self-punitiveness'];
    const cat5 = ['Entitlement_Superiority', 'Insufficient self-control_self-discipline'];
    if (cat1.includes(id)) return '#10b981';
    if (cat2.includes(id)) return '#3b82f6';
    if (cat3.includes(id)) return '#eab308';
    if (cat4.includes(id)) return '#f97316';
    if (cat5.includes(id)) return '#ef4444';
  }
  return '#cbd5e1';
};

console.log('kk:', getCardColor('mode', 'kk'));
console.log('Abandonment:', getCardColor('schema', 'Abandonment'));
console.log('gv:', getCardColor('mode', 'gv'));
console.log('empty:', getCardColor('mode', undefined));

