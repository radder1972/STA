import React, { useMemo } from 'react';
import ysqScoring from '../data/ysq-scoring.json';
import smiScoring from '../data/smi-scoring.json';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Cell, LabelList, Legend } from 'recharts';
import { ArrowRightIcon } from './Icons';

// Duplicated maps for simplicity, as they are not exported from SingleResult
const basisbehoeftenMap = {
  'Abandonment': 'Verbondenheid & Veiligheid', 'Mistrust': 'Verbondenheid & Veiligheid', 'Defectiveness/unlovability': 'Verbondenheid & Veiligheid', 'Emotional deprivation': 'Verbondenheid & Veiligheid', 'Social isolation/Alienation': 'Verbondenheid & Veiligheid',
  'Practical incompetence/Dependence': 'Autonomie', 'Vulnerability to harm/illness': 'Autonomie', 'Enmeshment': 'Autonomie', 'Failure to achieve': 'Autonomie',
  'Insufficient self-control/self-discipline': 'Realistische Grenzen', 'Entitlement/Superiority': 'Realistische Grenzen',
  'Subjugation': 'Zelfexpressie', 'Self-sacrifice': 'Zelfexpressie', 'Admiration/Recognition-seeking': 'Zelfexpressie',
  'Pessimism/Worry': 'Spontaniteit & Spel', 'Emotional inhibition': 'Spontaniteit & Spel', 'Unrelenting Standards': 'Spontaniteit & Spel', 'Self-punitiveness': 'Spontaniteit & Spel'
};

const smiModesMap = {
  'kk': { name: 'Kwetsbare kind', group: 'KINDMODI' }, 'rk': { name: 'Razende kind', group: 'KINDMODI' }, 'ik': { name: 'Impulsieve kind', group: 'KINDMODI' }, 'ok': { name: 'Ongedisciplineerde kind', group: 'KINDMODI' }, 'bk': { name: 'Boze kind', group: 'KINDMODI' },
  'wi': { name: 'Willoze inschikkelijke', group: 'BESCHERMMODI - OVERGAVE' }, 'ob': { name: 'Onthechte beschermer', group: 'BESCHERMMODI - VERMIJDEN' }, 'oz': { name: 'Onthechte zelfsusser', group: 'BESCHERMMODI - VERMIJDEN' }, 'wk': { name: 'Wantrouwende overcontroleerder', group: 'BESCHERMMODI - OMKERING' }, 'zh': { name: 'Zelfverheerlijker', group: 'BESCHERMMODI - OMKERING' }, 'pa': { name: 'Pest en aanval', group: 'BESCHERMMODI - OMKERING' },
  'so': { name: 'Straffende ouder', group: 'DISFUNCTIONELE GEÏNTERNALISEERDE OUDERMODI' }, 'vo': { name: 'Veeleisende ouder', group: 'DISFUNCTIONELE GEÏNTERNALISEERDE OUDERMODI' }, 'gv': { name: 'Gezonde volwassene', group: 'FUNCTIONELE MODI' }
};

const ysqNamesMap = {
  'Abandonment': 'Verlating', 'Mistrust': 'Wantrouwen', 'Defectiveness/unlovability': 'Tekortschieten', 'Emotional deprivation': 'Emotioneel tekort', 'Social isolation/Alienation': 'Sociale isolatie',
  'Practical incompetence/Dependence': 'Afhankelijkheid', 'Vulnerability to harm/illness': 'Kwetsbaarheid', 'Enmeshment': 'Kluwen', 'Failure to achieve': 'Mislukken',
  'Insufficient self-control/self-discipline': 'Onvoldoende zelfcontrole', 'Entitlement/Superiority': 'Veeleisendheid',
  'Subjugation': 'Onderwerping', 'Self-sacrifice': 'Zelfopoffering', 'Admiration/Recognition-seeking': 'Erkenning zoeken',
  'Pessimism/Worry': 'Pessimisme', 'Emotional inhibition': 'Emotionele geremdheid', 'Unrelenting Standards': 'Meedogenloze normen', 'Self-punitiveness': 'Bestraffendheid'
};

const calculateScores = (answers, scoringData, type) => {
  return Object.entries(scoringData).map(([key, items]) => {
    let sum = 0; let answeredCount = 0;
    items.forEach(qId => {
      if (answers && answers[qId]) {
        sum += answers[qId];
        answeredCount++;
      }
    });
    const mean = answeredCount > 0 ? (sum / answeredCount).toFixed(2) : 0;
    const name = type === 'ysq' ? ysqNamesMap[key] : (smiModesMap[key]?.name || key);
    const category = type === 'ysq' ? basisbehoeftenMap[key] : smiModesMap[key]?.group;
    return { id: key, name, mean: parseFloat(mean), category };
  }).sort((a, b) => b.mean - a.mean);
};

export default function CombinedAnalysis({ ysqAnswers, smiAnswers }) {
  const ysqScores = useMemo(() => calculateScores(ysqAnswers, ysqScoring, 'ysq'), [ysqAnswers]);
  const smiScores = useMemo(() => calculateScores(smiAnswers, smiScoring, 'smi'), [smiAnswers]);

  const top3Ysq = ysqScores.slice(0, 3);
  const top3Coping = smiScores.filter(s => s.category?.includes('BESCHERMMODI')).slice(0, 3);

  // For Option B: Domain comparison
  const domainAverages = useMemo(() => {
    const ysqGroups = {};
    ysqScores.forEach(s => {
      if (!ysqGroups[s.category]) ysqGroups[s.category] = { sum: 0, count: 0 };
      ysqGroups[s.category].sum += s.mean;
      ysqGroups[s.category].count += 1;
    });

    const smiGroups = {};
    smiScores.forEach(s => {
      if (!smiGroups[s.category]) smiGroups[s.category] = { sum: 0, count: 0 };
      smiGroups[s.category].sum += s.mean;
      smiGroups[s.category].count += 1;
    });

    const combined = [
      { name: 'Verbondenheid / Kindmodi', ysq: ysqGroups['Verbondenheid & Veiligheid']?.sum / ysqGroups['Verbondenheid & Veiligheid']?.count || 0, smi: smiGroups['KINDMODI']?.sum / smiGroups['KINDMODI']?.count || 0 },
      { name: 'Grenzen / Oudermodi', ysq: ysqGroups['Realistische Grenzen']?.sum / ysqGroups['Realistische Grenzen']?.count || 0, smi: smiGroups['DISFUNCTIONELE GEÏNTERNALISEERDE OUDERMODI']?.sum / smiGroups['DISFUNCTIONELE GEÏNTERNALISEERDE OUDERMODI']?.count || 0 },
      { name: 'Autonomie / Coping (Vermijden)', ysq: ysqGroups['Autonomie']?.sum / ysqGroups['Autonomie']?.count || 0, smi: smiGroups['BESCHERMMODI - VERMIJDEN']?.sum / smiGroups['BESCHERMMODI - VERMIJDEN']?.count || 0 },
      { name: 'Zelfexpressie / Coping (Overgave)', ysq: ysqGroups['Zelfexpressie']?.sum / ysqGroups['Zelfexpressie']?.count || 0, smi: smiGroups['BESCHERMMODI - OVERGAVE']?.sum / smiGroups['BESCHERMMODI - OVERGAVE']?.count || 0 },
      { name: 'Spel / Coping (Omkering)', ysq: ysqGroups['Spontaniteit & Spel']?.sum / ysqGroups['Spontaniteit & Spel']?.count || 0, smi: smiGroups['BESCHERMMODI - OMKERING']?.sum / smiGroups['BESCHERMMODI - OMKERING']?.count || 0 }
    ];
    return combined.map(c => ({ ...c, ysq: Number(c.ysq.toFixed(2)), smi: Number(c.smi.toFixed(2)) }));
  }, [ysqScores, smiScores]);

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      
      {/* OPTION A: Top 3 Visual Links */}
      <div className="glass-panel" style={{ padding: '2rem', border: '1px solid var(--border-color)', borderRadius: '16px' }}>
        <h2 style={{ color: 'var(--text-main)', marginBottom: '1rem', textAlign: 'center' }}>1. Directe Top 3 Connectie</h2>
        <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginBottom: '2rem' }}>
          De meest verhoogde schema's triggeren vaak direct de meest gehanteerde coping-modi. 
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'nowrap', gap: '1rem', width: '100%', overflowX: 'auto' }}>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <h4 style={{ color: 'var(--text-main)', textAlign: 'center', marginBottom: '1rem' }}>Kwetsbaarheid (Top 3 Schema's)</h4>
            {top3Ysq.map((schema, i) => {
              const bg = ['rgba(251, 191, 36, 0.15)', 'rgba(148, 163, 184, 0.15)', 'rgba(180, 83, 9, 0.15)'][i] || 'transparent';
              const border = ['rgba(251, 191, 36, 0.4)', 'rgba(148, 163, 184, 0.4)', 'rgba(180, 83, 9, 0.4)'][i] || 'transparent';
              return (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: '3.5rem', background: bg, padding: '0.8rem 1rem', borderRadius: '8px', marginBottom: '0.5rem', border: `1px solid ${border}` }}>
                  <strong style={{ lineHeight: '1.2' }}>{schema.name}</strong> <span>{schema.mean}</span>
                </div>
              );
            })}
          </div>
          
          <div style={{ flex: '0 0 40px', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '2rem' }}>
            {/* 3 Arrows to connect each row visually */}
            {[0, 1, 2].map(i => (
              <div key={i} style={{ minHeight: '3.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.5rem' }}>
                <ArrowRightIcon size={24} color="var(--primary)" />
              </div>
            ))}
          </div>

          <div style={{ flex: 1, minWidth: '200px' }}>
            <h4 style={{ color: 'var(--text-main)', textAlign: 'center', marginBottom: '1rem' }}>Reactie (Top 3 Coping-Modi)</h4>
            {top3Coping.map((mode, i) => {
              const bg = ['rgba(251, 191, 36, 0.15)', 'rgba(148, 163, 184, 0.15)', 'rgba(180, 83, 9, 0.15)'][i] || 'transparent';
              const border = ['rgba(251, 191, 36, 0.4)', 'rgba(148, 163, 184, 0.4)', 'rgba(180, 83, 9, 0.4)'][i] || 'transparent';
              return (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: '3.5rem', background: bg, padding: '0.8rem 1rem', borderRadius: '8px', marginBottom: '0.5rem', border: `1px solid ${border}` }}>
                  <strong style={{ lineHeight: '1.2' }}>{mode.name}</strong> <span>{mode.mean}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* OPTION B: Domain Comparison Chart */}
      <div className="glass-panel" style={{ padding: '2rem', border: '1px solid var(--border-color)', borderRadius: '16px' }}>
        <h2 style={{ color: 'var(--text-main)', marginBottom: '1rem', textAlign: 'center' }}>2. Gecombineerde Domeinen Grafiek</h2>
        <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginBottom: '2rem' }}>
          Hoe verhouden de Schema-domeinen (YSQ) zich tot gerelateerde Modi-groepen (SMI)?
        </p>
        <div style={{ width: '100%', height: '400px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={domainAverages} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
              <XAxis dataKey="name" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} />
              <YAxis domain={[1, 6]} tick={{ fill: 'var(--text-muted)' }} />
              <RechartsTooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} contentStyle={{ background: 'rgba(30, 41, 59, 0.9)', border: 'none', borderRadius: '8px', color: '#fff' }} />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              <Bar dataKey="ysq" name="Schema Domein (YSQ)" fill="#ef4444" radius={[4, 4, 0, 0]} isAnimationActive={false} />
              <Bar dataKey="smi" name="Gerelateerde Modi (SMI)" fill="#f59e0b" radius={[4, 4, 0, 0]} isAnimationActive={false} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* OPTION C: Matrix Table */}
      <div className="glass-panel" style={{ padding: '2rem', border: '1px solid var(--border-color)', borderRadius: '16px' }}>
        <h2 style={{ color: 'var(--text-main)', marginBottom: '1rem', textAlign: 'center' }}>3. Kruisverbanden Matrix</h2>
        <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginBottom: '1rem' }}>
          Ruwe data vergelijking: zijn de hoogste schema's terug te zien in het modusgebruik?
        </p>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                <th style={{ padding: '12px', textAlign: 'left', color: 'var(--text-main)' }}>Theoretisch Vlak</th>
                <th style={{ padding: '12px', textAlign: 'center', color: '#ef4444' }}>YSQ Domein Score</th>
                <th style={{ padding: '12px', textAlign: 'center', color: '#f59e0b' }}>SMI Groep Score</th>
              </tr>
            </thead>
            <tbody>
              {domainAverages.map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '12px', color: 'var(--text-main)', fontWeight: 'bold' }}>{row.name}</td>
                  <td style={{ padding: '12px', textAlign: 'center', color: 'var(--text-main)' }}>
                    <div style={{ display: 'inline-block', background: row.ysq >= 4 ? 'rgba(239, 68, 68, 0.2)' : 'transparent', padding: '4px 12px', borderRadius: '12px', fontWeight: row.ysq >= 4 ? 'bold' : 'normal' }}>
                      {row.ysq}
                    </div>
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center', color: 'var(--text-main)' }}>
                    <div style={{ display: 'inline-block', background: row.smi >= 4 ? 'rgba(245, 158, 11, 0.2)' : 'transparent', padding: '4px 12px', borderRadius: '12px', fontWeight: row.smi >= 4 ? 'bold' : 'normal' }}>
                      {row.smi}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  );
}
