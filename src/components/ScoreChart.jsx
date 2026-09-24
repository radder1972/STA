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
  LabelList
} from 'recharts';
import { ChartIcon } from './Icons';

export default function ScoreChart({ scores }) {
  // Sort scores from highest to lowest
  const sortedScores = [...scores].sort((a, b) => b.mean - a.mean);
  
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
    <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem', border: '1px solid rgba(255,255,255,0.1)' }}>
      <h3 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '1.5rem', color: 'var(--text-color)', letterSpacing: '1px' }}>
        <ChartIcon size={24} useGradient={true} /> Alle Scores
      </h3>
      
      <div className="chart-wrapper" style={{ width: '100%', height: data.length > 10 ? '600px' : '400px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 20, bottom: 15 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" horizontal={true} vertical={false} />
            <XAxis 
              type="number" 
              domain={[1, 6]} 
              ticks={[1, 2, 3, 4, 5, 6]}
              stroke="var(--text-muted)" 
              tickMargin={10}
            />
            <YAxis 
              type="category" 
              dataKey="name" 
              width={180} 
              stroke="var(--text-color)"
              tick={{ fontSize: 12, fill: 'var(--text-main)' }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(255,255,255,0.05)'}} />
            
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
  );
}
