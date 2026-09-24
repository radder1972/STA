import React from 'react';
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
  // Sort scores from highest to lowest for BarChart
  const sortedScores = [...scores].sort((a, b) => b.mean - a.mean);
  
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
    
    return (
      <g>
        <text radius={radius} stroke="none" x={x} y={y} className="recharts-text recharts-polar-angle-axis-tick-value" textAnchor={textAnchor} fill={color} fontSize="10" fontWeight="bold">
          <tspan x={x} dy="0em">{payload.value}</tspan>
        </text>
      </g>
    );
  };
  
  // Format data for Recharts
  const data = sortedScores.map(score => ({
    name: score.name,
    score: parseFloat(score.mean)
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
      {/* New Radar Chart */}
      <div className="glass-panel" style={{ padding: '1.5rem', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
        <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-main)', fontSize: '1.3rem' }}>Spinnenweb (Radar) Overzicht</h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem', maxWidth: '600px', margin: '0 auto 1.5rem auto' }}>
          Deze grafiek toont de verdeling van al uw scores. Punten die ver naar buiten uitschieten, zijn uw meest prominente patronen.
        </p>
        <div className="chart-wrapper" style={{ width: '100%', height: data.length > 10 ? '550px' : '400px', maxWidth: '800px', margin: '0 auto' }}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="65%" data={radarData}>
              <PolarGrid stroke="var(--border-color)" />
              <PolarAngleAxis dataKey="name" tick={<CustomTick />} />
              <PolarRadiusAxis angle={90} domain={[1, 6]} tick={{ fill: 'var(--text-muted)' }} />
              <Radar name="Score" dataKey="mean" stroke="var(--primary)" fill="var(--primary)" fillOpacity={0.4} />
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Existing Bar Chart */}
      <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem', border: '1px solid rgba(255,255,255,0.1)' }}>
        <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-main)', textAlign: 'center', fontSize: '1.3rem' }}>Volledige Score Staafgrafiek</h3>
        <div className="chart-wrapper" style={{ width: '100%', height: data.length > 10 ? '600px' : '400px', paddingBottom: '20px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
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
                width={260} 
                stroke="var(--text-color)"
                tick={{ fontSize: 12, fill: 'var(--text-main)' }}
                tickMargin={15}
                padding={{ top: 10, bottom: 20 }}
              />
              <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(100,116,139,0.1)'}} />
              
              <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={20}>
                <LabelList dataKey="score" position="right" fill="var(--text-main)" fontSize={11} fontWeight="bold" />
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={index === 0 ? '#fbbf24' : index === 1 ? '#94a3b8' : index === 2 ? '#b45309' : 'var(--primary)'} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
