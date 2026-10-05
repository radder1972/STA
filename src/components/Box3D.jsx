import React from 'react';
import { ThreeSparklesLogo } from './Icons';

export default function Box3D({ scale = 1, spinning = true }) {
  const width = 130 * scale;
  const height = 180 * scale;
  const depth = 36 * scale;
  const halfDepth = depth / 2;

  return (
    <div style={{
      width: `${width}px`,
      height: `${height}px`,
      perspective: '1000px',
      margin: '0 auto'
    }}>
      <style>{`
        @keyframes spin-box-3d {
          from { transform: translateZ(-${halfDepth}px) rotateY(0deg) rotateX(-5deg); }
          to { transform: translateZ(-${halfDepth}px) rotateY(360deg) rotateX(-5deg); }
        }
        .box-3d-scene {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          animation: ${spinning ? 'spin-box-3d 12s infinite linear' : 'none'};
          transform: ${!spinning ? `translateZ(-${halfDepth}px) rotateY(-20deg) rotateX(-5deg)` : 'none'};
        }
        .box-3d-face {
          position: absolute;
          border: 1px solid rgba(0,0,0,0.08);
          background: #ffffff;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          backface-visibility: hidden;
          box-shadow: inset 0 0 15px rgba(0,0,0,0.03);
        }
      `}</style>
      
      <div className="box-3d-scene">
        {/* FRONT */}
        <div className="box-3d-face" style={{
          width: `${width}px`, height: `${height}px`,
          transform: `rotateY(0deg) translateZ(${halfDepth}px)`,
          padding: '10px'
        }}>
          {/* Stars Background */}
          <div style={{
            position: 'absolute', width: '150%', height: '150%', top: '-25%', left: '-25%',
            backgroundImage: 'radial-gradient(circle at 20% 30%, #0ea5e9 2px, transparent 2.5px), radial-gradient(circle at 80% 20%, #f59e0b 2px, transparent 2.5px), radial-gradient(circle at 85% 70%, #8b5cf6 2px, transparent 2.5px), radial-gradient(circle at 15% 80%, #10b981 3px, transparent 3.5px), radial-gradient(circle at 50% 10%, #f43f5e 2px, transparent 2.5px), radial-gradient(circle at 30% 60%, #0ea5e9 2px, transparent 2.5px), radial-gradient(circle at 70% 85%, #f59e0b 1.5px, transparent 2px)',
            opacity: 0.7, zIndex: 1
          }}></div>
          
          <div style={{ fontSize: `${14 * scale}px`, fontWeight: 800, color: '#0f172a', textAlign: 'center', lineHeight: 1.1, zIndex: 10, marginTop: '20px' }}>
            Schematherapie<br/>kaarten
          </div>
          
          <div style={{ margin: '15px 0', zIndex: 10, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}>
            <ThreeSparklesLogo size={40 * scale} theme="test" />
          </div>
          
          <div style={{ fontSize: `${9 * scale}px`, fontWeight: 600, color: '#0ea5e9', letterSpacing: '0.05em', textTransform: 'uppercase', zIndex: 10 }}>
            VSt 2021 Update
          </div>
          <div style={{ position: 'absolute', bottom: '10px', fontSize: `${7 * scale}px`, color: '#334155', opacity: 0.6, fontWeight: 600 }}>
            55 THEORIEKAARTEN
          </div>
        </div>

        {/* BACK */}
        <div className="box-3d-face" style={{
          width: `${width}px`, height: `${height}px`,
          transform: `rotateY(180deg) translateZ(${halfDepth}px)`,
          padding: '15px',
          alignItems: 'flex-start',
          justifyContent: 'flex-start'
        }}>
          <div style={{ fontSize: `${8 * scale}px`, fontWeight: 600, color: '#0ea5e9', marginBottom: '8px' }}>Inclusief:</div>
          <ul style={{ fontSize: `${7 * scale}px`, color: '#334155', margin: 0, paddingLeft: '12px', lineHeight: 1.6, textAlign: 'left', fontWeight: 500 }}>
            <li style={{ color: '#f59e0b' }}><span style={{ color: '#334155' }}>18 Schema's (Young)</span></li>
            <li style={{ color: '#10b981' }}><span style={{ color: '#334155' }}>3 Nieuwe schema's</span></li>
            <li style={{ color: '#0ea5e9' }}><span style={{ color: '#334155' }}>14 Modi (SMI)</span></li>
            <li style={{ color: '#8b5cf6' }}><span style={{ color: '#334155' }}>6 Nieuwe modi</span></li>
            <li style={{ color: '#f43f5e' }}><span style={{ color: '#334155' }}>Basisbehoeften</span></li>
          </ul>
          <div style={{ marginTop: 'auto', width: '100%', textAlign: 'center', fontSize: `${6 * scale}px`, color: '#334155', opacity: 0.6 }}>
            Ontwikkeld door<br/><strong style={{ color: '#0f172a' }}>Digitaal Schematherapie Platform</strong>
          </div>
        </div>

        {/* RIGHT */}
        <div className="box-3d-face" style={{
          width: `${depth}px`, height: `${height}px`,
          transform: `rotateY(90deg) translateZ(${width - halfDepth}px)`
        }}>
          <div style={{ transform: 'rotate(-90deg)', whiteSpace: 'nowrap', fontWeight: 700, color: '#0f172a', fontSize: `${10 * scale}px` }}>
            Schematherapiekaarten
          </div>
        </div>

        {/* LEFT */}
        <div className="box-3d-face" style={{
          width: `${depth}px`, height: `${height}px`,
          transform: `rotateY(-90deg) translateZ(${halfDepth}px)`
        }}>
          <div style={{ transform: 'rotate(-90deg)', whiteSpace: 'nowrap', fontWeight: 600, color: '#0ea5e9', fontSize: `${9 * scale}px` }}>
            VSt 2021 Update
          </div>
        </div>

        {/* TOP */}
        <div className="box-3d-face" style={{
          width: `${width}px`, height: `${depth}px`,
          transform: `rotateX(90deg) translateZ(${halfDepth}px)`
        }}>
          <div style={{ fontWeight: 800, color: '#0ea5e9', fontSize: `${12 * scale}px` }}>DSP</div>
        </div>

        {/* BOTTOM */}
        <div className="box-3d-face" style={{
          width: `${width}px`, height: `${depth}px`,
          transform: `rotateX(-90deg) translateZ(${height - halfDepth}px)`
        }}>
        </div>
      </div>
    </div>
  );
}
