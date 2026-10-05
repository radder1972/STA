import React from 'react';
import { Sparkle } from 'lucide-react';

export default function SparkleEffect({ count = 12 }) {
  return (
    <div style={{ position: 'absolute', top: '-15px', left: '-15px', right: '-15px', bottom: '-15px', pointerEvents: 'none', zIndex: 10, overflow: 'hidden', borderRadius: 'inherit' }}>
      <style>{`
        @keyframes card-sparkle-float {
          0% { transform: translateY(0) scale(0) rotate(0deg); opacity: 0; }
          20% { opacity: 1; transform: translateY(-15px) scale(1) rotate(45deg); }
          80% { opacity: 1; transform: translateY(-40px) scale(1) rotate(135deg); }
          100% { transform: translateY(-50px) scale(0) rotate(180deg); opacity: 0; }
        }
      `}</style>
      {[...Array(count)].map((_, i) => {
        const colors = ['#059669', '#3b82f6', '#8b5cf6', '#f59e0b', '#0ea5e9', '#10b981'];
        return (
          <div key={i} style={{
            position: 'absolute',
            left: `\${Math.random() * 100}%`,
            top: `\${Math.random() * 100}%`,
            color: colors[Math.floor(Math.random() * colors.length)],
            animation: `card-sparkle-float \${Math.random() * 1 + 1}s ease-out \${Math.random() * 0.5}s infinite`
          }}>
            <Sparkle fill="currentColor" size={Math.random() * 12 + 8} strokeWidth={1} />
          </div>
        );
      })}
    </div>
  );
}
