import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from 'recharts';
import { ChartIcon } from './Icons';

export default function ScoreChart({ scores }) {
  // Calculate Domain Averages
  const domainAverages = React.useMemo(() => {
    const groups = {};
    scores.forEach(score => {
      const cat = score.category || 'Overig';
      if (!groups[cat]) {
        groups[cat] = { total: 0, count: 0, name: cat };
      }
      groups[cat].total += parseFloat(score.mean);
      groups[cat].count += 1;
    });
    
    return Object.values(groups)
      .map(g => ({
        name: g.name,
        score: Number((g.total / g.count).toFixed(2))
      }))
      .sort((a, b) => b.score - a.score); // Sort highest first
  }, [scores]);

  const [sortBy, setSortBy] = useState('score');
  const [chartWidth, setChartWidth] = useState(800);

  React.useEffect(() => {
    const handleResize = () => {
      const container = document.querySelector('.results-container') || document.body;
      const availableWidth = container.clientWidth - 40; // account for padding
      setChartWidth(Math.min(800, availableWidth));
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Crucial for printing: force width to 750px synchronously before print layout
    const beforePrint = () => setChartWidth(750);
    window.addEventListener('beforeprint', beforePrint);
    window.addEventListener('afterprint', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('beforeprint', beforePrint);
      window.removeEventListener('afterprint', handleResize);
    };
  }, []);

  // Sort scores from highest to lowest for overall ranking (Top 3)
  const overallRankedScores = React.useMemo(() => [...scores].sort((a, b) => b.mean - a.mean), [scores]);
  
  // Sort scores for BarChart display based on toggle
  const displayScores = React.useMemo(() => {
    let sorted = [...scores];
    if (sortBy === 'score') {
      sorted.sort((a, b) => b.mean - a.mean);
    } else {
      sorted.sort((a, b) => {
        const catA = a.category || 'Overig';
        const catB = b.category || 'Overig';
        if (catA !== catB) {
          return catA.localeCompare(catB);
        }
        return b.mean - a.mean;
      });
    }
    return sorted;
  }, [scores, sortBy]);
  
  // Sort scores by category for RadarChart to group related items
  const radarData = [...scores].sort((a, b) => {
    const catA = a.category || 'Overig';
    const catB = b.category || 'Overig';
    return catA.localeCompare(catB);
  });

  const categoryColors = {
    // YSQ Domains
    'Verbondenheid & Veiligheid': '#ef4444',
    'Autonomie': '#f97316',
    'Zelfexpressie': '#eab308',
    'Realistische Grenzen': '#22c55e',
    'Spontaniteit & Spel': '#3b82f6',
    
    // SMI Modes
    'KINDMODI': '#ef4444', 
    'BESCHERMMODI - OVERGAVE': '#f59e0b',
    'BESCHERMMODI - VERMIJDEN': '#d97706',
    'BESCHERMMODI - OMKERING': '#b45309',
    'DISFUNCTIONELE GEÏNTERNALISEERDE OUDERMODI': '#8b5cf6',
    'FUNCTIONELE MODI': '#10b981',
    
    'Overig': '#94a3b8'
  };

  const CustomTick = (props) => {
    const { payload, x, y, textAnchor, stroke, radius } = props;
    const item = radarData.find(s => s.name === payload.value);
    const color = item ? (categoryColors[item.category] || 'var(--text-main)') : 'var(--text-main)';
    
    // Identify top 3 for special labeling
    const rankIndex = overallRankedScores.findIndex(s => s.name === payload.value);
    const isTop3 = rankIndex >= 0 && rankIndex < 3;
    const rankText = isTop3 ? ` (#${rankIndex + 1})` : '';
    const rankColor = rankIndex === 0 ? '#fbbf24' : rankIndex === 1 ? '#94a3b8' : rankIndex === 2 ? '#b45309' : color;
    
    return (
      <g>
        <text radius={radius} stroke="none" x={x} y={y} className="recharts-text recharts-polar-angle-axis-tick-value" textAnchor={textAnchor} fill={color} fontSize="10" fontWeight="bold">
          <tspan x={x} dy="0em">{payload.value}</tspan>
          {isTop3 && <tspan fill={rankColor}>{rankText}</tspan>}
        </text>
      </g>
    );
  };
  
  const CustomRadarDot = (props) => {
    const { cx, cy, payload } = props;
    const rankIndex = overallRankedScores.findIndex(s => s.name === payload.name);
    
    if (rankIndex >= 0 && rankIndex < 3) {
      const rankColor = rankIndex === 0 ? '#fbbf24' : rankIndex === 1 ? '#94a3b8' : '#b45309';
      return (
        <circle cx={cx} cy={cy} r={6} fill={rankColor} stroke="#1e293b" strokeWidth={2} />
      );
    }
    
    // Normal point
    return <circle cx={cx} cy={cy} r={3} fill="var(--primary)" />;
  };
  
  // Format data for Recharts
  const data = displayScores.map(score => ({
    name: score.name,
    score: parseFloat(score.mean),
    category: score.category
  }));

  // Custom tooltip to match glassmorphism style
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          background: 'rgba(30, 41, 59, 0.9)',
          border: '1px solid rgba(255,255,255,0.1)',
          padding: '10px 15px',
          borderRadius: '8px',
          color: '#f8fafc',
          boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
        }}>
          <p style={{ margin: 0, fontWeight: 'bold', fontSize: '0.9rem' }}>{label}</p>
          <p style={{ margin: '5px 0 0 0', color: 'var(--primary)', fontWeight: 'bold' }}>
            Score: {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Detailed Bar Chart */}
      <div className="glass-panel" style={{ padding: '1.5rem', border: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3 style={{ margin: 0, color: 'var(--text-main)', fontSize: '1.3rem' }}>Volledige Score Staafgrafiek</h3>
          <div className="no-print" style={{ display: 'flex', background: 'rgba(0,0,0,0.1)', borderRadius: '8px', padding: '4px' }}>
            <button 
              onClick={() => setSortBy('score')}
              style={{ padding: '6px 12px', border: 'none', background: sortBy === 'score' ? 'var(--primary)' : 'transparent', color: sortBy === 'score' ? '#fff' : 'var(--text-muted)', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold' }}
            >
              Hoog-Laag
            </button>
            <button 
              onClick={() => setSortBy('domain')}
              style={{ padding: '6px 12px', border: 'none', background: sortBy === 'domain' ? 'var(--primary)' : 'transparent', color: sortBy === 'domain' ? '#fff' : 'var(--text-muted)', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold' }}
            >
              Per Domein
            </button>
          </div>
        </div>
        <div className="chart-wrapper print-block" style={{ width: '100%', display: 'flex', justifyContent: 'center', paddingBottom: '20px' }}>
          <div style={{ width: '100%', height: data.length > 10 ? '550px' : '400px' }}>
            <BarChart
              width={chartWidth}
              height={data.length > 10 ? 550 : 400}
              data={data}
              layout="vertical"
              margin={{ top: 10, right: 30, left: 20, bottom: 30 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" horizontal={true} vertical={false} />
              <XAxis 
                type="number" 
                domain={[1, 6]} 
                ticks={[1, 2, 3, 4, 5, 6]}
                stroke="var(--text-muted)" 
                tickMargin={10}
                tick={{ fontSize: 10, fontWeight: 'bold', fill: 'var(--text-muted)' }}
              />
              <YAxis 
                type="category" 
                dataKey="name" 
                width={320} 
                stroke="var(--text-color)"
                tick={{ fontSize: 12, fill: 'var(--text-main)' }}
                tickMargin={15}
                padding={{ top: 10, bottom: 20 }}
              />
              <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(100,116,139,0.1)'}} />
              
              <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={20} isAnimationActive={false}>
                <LabelList dataKey="score" position="right" fill="var(--text-main)" fontSize={11} fontWeight="bold" />
                {data.map((entry, index) => {
                  const rankIndex = overallRankedScores.findIndex(s => s.name === entry.name);
                  const isTop3 = rankIndex >= 0 && rankIndex < 3;
                  const medalColor = rankIndex === 0 ? '#fbbf24' : rankIndex === 1 ? '#94a3b8' : rankIndex === 2 ? '#b45309' : 'var(--primary)';
                  const catColor = entry.category ? categoryColors[entry.category] : 'var(--primary)';
                  const finalColor = sortBy === 'domain' && !isTop3 && catColor ? catColor : medalColor;
                  
                  return (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={finalColor} 
                    />
                  );
                })}
              </Bar>
            </BarChart>
          </div>
        </div>
      </div>

      {/* Radar Chart */}
      <div className="glass-panel page-break" style={{ padding: '1.5rem', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
        <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-main)', fontSize: '1.3rem' }}>Spinnenweb (Radar) Overzicht</h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem', maxWidth: '600px', margin: '0 auto 1.5rem auto' }}>
          Deze grafiek toont de verdeling van al uw scores. Punten die ver naar buiten uitschieten, zijn uw meest prominente patronen.
        </p>
        <div className="chart-wrapper print-block" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <div className="radar-container" style={{ width: '100%', height: data.length > 10 ? '450px' : '400px' }}>
            <RadarChart width={chartWidth} height={data.length > 10 ? 450 : 400} cx="50%" cy="50%" outerRadius="65%" data={radarData}>
              <PolarGrid stroke="var(--border-color)" />
              <PolarAngleAxis dataKey="name" tick={<CustomTick />} />
              <PolarRadiusAxis angle={90} domain={[1, 6]} tick={{ fill: 'var(--text-muted)' }} />
              <Radar name="Score" dataKey="mean" stroke="var(--primary)" fill="var(--primary)" fillOpacity={0.4} dot={<CustomRadarDot />} isAnimationActive={false} />
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          </div>
        </div>
      </div>

      {/* Domain Averages Chart */}
      {domainAverages.length > 1 && (
        <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem', border: '1px solid rgba(255,255,255,0.1)' }}>
          <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-main)', textAlign: 'center', fontSize: '1.3rem' }}>Gemiddelde per Categorie / Domein</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem', maxWidth: '600px', margin: '0 auto 1.5rem auto', textAlign: 'center' }}>
            Deze staafgrafiek toont uw gemiddelde score per hoofdcategorie. Dit helpt om patronen op een hoger niveau (helikopterview) te herkennen.
          </p>
          <div className="chart-wrapper print-block" style={{ width: '100%', display: 'flex', justifyContent: 'center', paddingBottom: '20px' }}>
            <div className="domain-container" style={{ width: '100%', height: `${Math.max(200, domainAverages.length * 40 + 40)}px` }}>
              <BarChart
                width={chartWidth}
                height={Math.max(200, domainAverages.length * 40 + 40)}
                data={domainAverages}
                layout="vertical"
                margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" horizontal={true} vertical={false} />
                <XAxis 
                  type="number" 
                  domain={[1, 6]} 
                  ticks={[1, 2, 3, 4, 5, 6]}
                  stroke="var(--text-muted)" 
                  tickMargin={10}
                  tick={{ fontSize: 10, fontWeight: 'bold', fill: 'var(--text-muted)' }}
                />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  width={220} 
                  stroke="var(--text-color)"
                  tick={{ fontSize: 11, fill: 'var(--text-main)', fontWeight: 'bold' }}
                  tickMargin={15}
                />
                <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(100,116,139,0.1)'}} />
                
                <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={24} isAnimationActive={false}>
                  <LabelList dataKey="score" position="right" fill="var(--text-main)" fontSize={11} fontWeight="bold" />
                  {domainAverages.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={categoryColors[entry.name] || 'var(--primary)'} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
