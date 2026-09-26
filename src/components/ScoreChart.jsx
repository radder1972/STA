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
  PolarRadiusAxis,
  Rectangle
} from 'recharts';
import { ChartIcon } from './Icons';

export default function ScoreChart({ scores, type }) {
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

  const wrapperRef = React.useRef(null);

  React.useEffect(() => {
    let observer;
    if (wrapperRef.current) {
      observer = new ResizeObserver(entries => {
        for (let entry of entries) {
          if (entry.contentRect.width > 100) {
            setChartWidth(entry.contentRect.width);
          }
        }
      });
      observer.observe(wrapperRef.current);
    }
    
    // Crucial for printing: force width to 700px synchronously before print layout
    const beforePrint = () => setChartWidth(700);
    const afterPrint = () => {
      if (wrapperRef.current && wrapperRef.current.clientWidth > 100) {
        setChartWidth(wrapperRef.current.clientWidth);
      }
    };
    
    window.addEventListener('beforeprint', beforePrint);
    window.addEventListener('afterprint', afterPrint);
    
    return () => {
      if (observer) observer.disconnect();
      window.removeEventListener('beforeprint', beforePrint);
      window.removeEventListener('afterprint', afterPrint);
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
        <text radius={radius} stroke="none" x={x} y={y} className="recharts-text recharts-polar-angle-axis-tick-value" textAnchor={textAnchor} fill={color} fontSize="9" fontWeight="bold">
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

  // Custom bar shape to draw both the bar and the badge accurately
  const CustomBarWithBadge = (props) => {
    const { x, y, width, height, payload } = props;
    
    if (!payload || !payload.name) {
      return <Rectangle x={x} y={y} width={width} height={height} fill="var(--primary)" radius={[0, 4, 4, 0]} />;
    }
    
    const rankIndex = overallRankedScores.findIndex(s => s.name === payload.name);
    const isTop3 = rankIndex >= 0 && rankIndex < 3;
    const medalColor = rankIndex === 0 ? '#fbbf24' : rankIndex === 1 ? '#94a3b8' : '#b45309';
    const catColor = payload.category ? categoryColors[payload.category] : 'var(--primary)';
    
    // In domain view, use category color. In high-low view, use medal colors for top 3 and primary color for the rest.
    const finalColor = sortBy === 'domain' ? catColor : (isTop3 ? medalColor : 'var(--primary)');

    return (
      <g>
        <Rectangle x={x} y={y} width={width} height={height} fill={finalColor} radius={[0, 4, 4, 0]} />
        {sortBy === 'domain' && isTop3 && (
          <g transform={`translate(${x + width + 35}, ${y + height / 2 - 8})`}>
            <rect width="24" height="16" rx="4" fill={medalColor} />
            <text x="12" y="11.5" fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle">
              #{rankIndex + 1}
            </text>
          </g>
        )}
      </g>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Detailed Bar Chart */}
      <div className="glass-panel" style={{ padding: '1.5rem', border: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <h3 className="text-gradient" style={{ margin: 0, fontSize: '1.3rem', marginBottom: '0.5rem' }}>Alle scores</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '600px', margin: '0 auto' }}>
            Dit is het complete overzicht van al uw individuele scores. Scroll verder naar beneden om te wisselen naar de helikopterview per categorie.
          </p>
        </div>
        <div ref={wrapperRef} className="chart-wrapper print-block" style={{ width: '100%', display: 'flex', justifyContent: 'center', paddingBottom: '20px' }}>
          <div style={{ width: '100%', height: data.length > 10 ? '550px' : '400px' }}>
            <BarChart
              width={chartWidth}
              height={data.length > 10 ? 550 : 400}
              data={data}
              layout="vertical"
              margin={{ top: 10, right: 70, left: 0, bottom: 30 }}
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
                width={300} 
                stroke="var(--text-color)"
                tick={{ fontSize: 11, fill: 'var(--text-main)' }}
                tickMargin={15}
                padding={{ top: 10, bottom: 20 }}
              />
              <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(100,116,139,0.1)'}} />
              
              <Bar dataKey="score" shape={<CustomBarWithBadge />} isAnimationActive={false}>
                <LabelList dataKey="score" position="right" fill="var(--text-main)" fontSize={11} fontWeight="bold" />
              </Bar>
            </BarChart>
          </div>
        </div>
        <div className="no-print" style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
          <div style={{ display: 'flex', background: 'rgba(0,0,0,0.05)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '4px' }}>
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
      </div>

      {/* Radar Chart */}
      <div className="glass-panel page-break" style={{ padding: '1.5rem', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
        <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-main)', fontSize: '1.3rem' }}>Spinnenweb Overzicht</h3>
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
          <h3 className="text-gradient" style={{ marginBottom: '0.5rem', textAlign: 'center', fontSize: '1.3rem' }}>
            {type === 'ysq' ? 'Score per Emotionele basisbehoefte' : 'Gemiddelde per Categorie'}
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem', maxWidth: '600px', margin: '0 auto 1.5rem auto', textAlign: 'center' }}>
            Deze staafgrafiek toont uw gemiddelde score per hoofdcategorie. Dit helpt om patronen op een hoger niveau (helikopterview) te herkennen.
          </p>
          <div className="chart-wrapper print-block" style={{ width: '100%', display: 'flex', justifyContent: 'center', paddingBottom: '20px' }}>
            <div className="domain-container" style={{ width: '100%', height: `${Math.max(200, domainAverages.length * 40 + 70)}px` }}>
              <BarChart
                width={chartWidth}
                height={Math.max(200, domainAverages.length * 40 + 70)}
                data={domainAverages}
                layout="vertical"
                margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
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
                  width={200} 
                  stroke="var(--text-color)"
                  tick={{ fontSize: 11, fill: 'var(--text-main)', fontWeight: 'bold' }}
                  tickMargin={15}
                  padding={{ top: 20, bottom: 20 }}
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
