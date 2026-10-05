import React from 'react';
import blijeKindImg from '../assets/images/vst/blije_kind.png';

export default function AnimatedBox3D() {
  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '3rem 0', perspective: '1000px' }}>
      <div className="box-container" style={{
        width: '130px', height: '180px', position: 'relative', transformStyle: 'preserve-3d',
        animation: 'spin 14s infinite linear'
      }}>
        <style>
          {\`
            @keyframes spin {
              0% { transform: rotateY(0deg) rotateX(-5deg); }
              100% { transform: rotateY(-360deg) rotateX(-5deg); }
            }
            .box-face {
              position: absolute; width: 100%; height: 100%; background: #ffffff;
              box-shadow: inset 0 0 10px rgba(0,0,0,0.05); border: 1px solid rgba(226,232,240,0.8);
              display: flex; flex-direction: column; align-items: center; justify-content: center;
              overflow: hidden; backface-visibility: hidden;
            }
            .box-front { transform: rotateY(0deg) translateZ(18px); }
            .box-back { transform: rotateY(180deg) translateZ(18px); }
            .box-right { width: 36px; left: 47px; transform: rotateY(90deg) translateZ(65px); }
            .box-left { width: 36px; left: 47px; transform: rotateY(-90deg) translateZ(65px); }
            .box-top { height: 36px; top: 72px; transform: rotateX(90deg) translateZ(90px); }
            .box-bottom { height: 36px; top: 72px; transform: rotateX(-90deg) translateZ(90px); }
            
            .box-front { padding: 10px; background: #fff radial-gradient(circle at center, #f0f9ff 0%, #fff 100%); }
            .box-back { padding: 10px; }
            .spine-text { writing-mode: vertical-rl; transform: rotate(180deg); font-size: 9px; color: #0ea5e9; font-weight: bold; letter-spacing: 0.5px; }
          \`}
        </style>

        {/* Front */}
        <div className="box-face box-front">
           <h4 style={{ fontSize: '13px', textAlign: 'center', margin: 0, fontWeight: 800, color: '#0f172a', lineHeight: 1.2 }}>Schematherapie<br/>kaarten</h4>
           <img src={blijeKindImg} style={{ width: '80px', marginTop: '12px' }} alt="" />
           <div style={{ display: 'flex', gap: '2px', marginTop: '10px' }}>
              <span style={{ color: '#0ea5e9', fontSize: '12px' }}>★</span>
              <span style={{ color: '#f59e0b', fontSize: '14px', marginTop: '-4px' }}>★</span>
              <span style={{ color: '#10b981', fontSize: '12px' }}>★</span>
           </div>
           <p style={{ fontSize: '9px', color: '#0ea5e9', margin: '15px 0 0 0', fontWeight: 'bold' }}>VSt 2021 Update</p>
        </div>

        {/* Back */}
        <div className="box-face box-back">
           <h4 style={{ fontSize: '12px', color: '#0ea5e9', marginBottom: '10px', margin: '-10px 0 10px 0' }}>55 Theoriekaarten</h4>
           <p style={{ fontSize: '7.5px', textAlign: 'center', color: '#475569', margin: '0 10px', lineHeight: 1.4 }}>
              Een actuele en complete referentieset voor gebruik in de klinische praktijk.
              <br/><br/>Volledig afgestemd op de herziene behandelrichtlijnen.
           </p>
           <div style={{ display: 'flex', gap: '4px', marginTop: '20px' }}>
              <div style={{width: 5, height: 5, borderRadius: 2.5, background: '#f59e0b'}}/>
              <div style={{width: 5, height: 5, borderRadius: 2.5, background: '#10b981'}}/>
              <div style={{width: 5, height: 5, borderRadius: 2.5, background: '#0ea5e9'}}/>
              <div style={{width: 5, height: 5, borderRadius: 2.5, background: '#8b5cf6'}}/>
              <div style={{width: 5, height: 5, borderRadius: 2.5, background: '#f43f5e'}}/>
           </div>
           <div style={{ background: '#f8fafc', padding: '4px 8px', borderRadius: '15px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '3px', marginTop: '25px' }}>
              <span style={{ color: '#0ea5e9', fontSize: '6px' }}>★</span>
              <span style={{ fontSize: '6px', fontWeight: 800, color: '#0f172a' }}>DSP</span>
           </div>
        </div>

        {/* Right Spine */}
        <div className="box-face box-right">
           <span className="spine-text">Schematherapiekaarten</span>
        </div>
        
        {/* Left Spine */}
        <div className="box-face box-left">
           <span className="spine-text">VSt 2021 Update</span>
        </div>

        {/* Top */}
        <div className="box-face box-top">
           <div style={{ background: '#f8fafc', padding: '2px 6px', borderRadius: '10px', border: '1px solid #e2e8f0', transform: 'rotate(180deg)' }}>
              <span style={{ fontSize: '6px', fontWeight: 800, color: '#0f172a' }}>DSP</span>
           </div>
        </div>
        
        {/* Bottom */}
        <div className="box-face box-bottom">
           <div style={{ background: '#f8fafc', padding: '2px 6px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '6px', fontWeight: 800, color: '#0f172a' }}>DSP</span>
           </div>
        </div>

      </div>
    </div>
  );
}
