import React from 'react';
import { Sparkle, FileBarChart } from 'lucide-react';

export default function HeroRadarChart({ isHovered }) {
  return (
    <div style={{ 
      width: '100%', height: '140px', display: 'flex', justifyContent: 'center', alignItems: 'center',
      marginTop: '1rem', marginBottom: '1.5rem', position: 'relative',
      perspective: '1000px',
      transform: 'translateY(-15px)'
    }}>
      {/* Background glowing circle to match the others */}
      <div style={{
        position: 'absolute', width: '170px', height: '170px', borderRadius: '50%',
        background: 'rgba(56, 189, 248, 0.05)', border: '1px dashed rgba(56, 189, 248, 0.25)',
        transform: isHovered ? 'scale(1)' : 'scale(0.9)', opacity: isHovered ? 1 : 0.8,
        transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
      }} />

      {/* Decorative Sparkles */}
      <div style={{ position: 'absolute', left: 'calc(50% - 90px)', top: '25px', zIndex: 10 }}>
         <Sparkle size={18} color="#38bdf8" style={{ 
           opacity: isHovered ? 0.9 : 0.5, 
           transform: isHovered ? 'scale(1.1) rotate(15deg)' : 'scale(0.8) rotate(0deg)',
           transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)' 
         }} fill="rgba(56, 189, 248, 0.2)" />
      </div>
      <div style={{ position: 'absolute', right: 'calc(50% - 90px)', bottom: '35px', zIndex: 10 }}>
         <Sparkle size={14} color="#0ea5e9" style={{ 
           opacity: isHovered ? 0.8 : 0.4,
           transform: isHovered ? 'scale(1.2) rotate(-15deg)' : 'scale(0.8) rotate(0deg)',
           transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s' 
         }} fill="rgba(14, 165, 233, 0.2)" />
      </div>

      {/* The Report Card */}
      <div style={{
        position: 'absolute',
        width: '110px', height: '155px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: isHovered ? '0 15px 35px rgba(56,189,248,0.3)' : '0 3px 10px rgba(0,0,0,0.15), 0 0 1px rgba(0,0,0,0.2)',
        transform: isHovered ? 'rotateY(0deg) rotateX(15deg) scale(0.9)' : 'rotateY(-15deg) rotateX(25deg) rotateZ(-5deg) scale(0.8)',
        transition: 'all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)',
        display: 'flex', flexDirection: 'column',
        border: '1px solid #e2e8f0',
        zIndex: 5,
        transformStyle: 'preserve-3d'
      }}>
        {/* Header of the report */}
        <div style={{ 
          background: '#f8fafc', width: '100%', height: '35px', borderBottom: '1px solid #f1f5f9',
          display: 'flex', alignItems: 'center', padding: '0 10px', boxSizing: 'border-box',
          borderTopLeftRadius: '7px', borderTopRightRadius: '7px',
          transform: 'translateZ(1px)' // prevent z-fighting
        }}>
          <div style={{ width: '16px', height: '16px', background: '#0ea5e9', borderRadius: '4px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <FileBarChart size={10} color="#fff" />
          </div>
          <div style={{ marginLeft: '6px', fontSize: '10px', fontWeight: 'bold', color: '#334155', fontFamily: 'sans-serif' }}>
            YSQ-S3
          </div>
        </div>
        
        {/* Mock text lines */}
        <div style={{ padding: '8px', flex: 1, display: 'flex', flexDirection: 'column', gap: '4px', transform: 'translateZ(1px)' }}>
          <div style={{ width: '60%', height: '4px', background: '#e2e8f0', borderRadius: '2px' }}></div>
          <div style={{ width: '80%', height: '4px', background: '#f1f5f9', borderRadius: '2px' }}></div>
          
          {/* Radar Chart Container */}
          <div style={{ 
             flex: 1, position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', 
             marginTop: '4px', transformStyle: 'preserve-3d' 
          }}>
            <svg 
              viewBox="0 0 100 100" 
              width="100%" 
              height="100%" 
              style={{ 
                overflow: 'visible',
                transformStyle: 'preserve-3d',
                transform: isHovered ? 'scale(1.3) translateZ(40px) translateY(-5px)' : 'scale(1) translateZ(0) translateY(0)',
                transition: 'all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)',
                filter: isHovered ? 'drop-shadow(0 15px 10px rgba(14, 165, 233, 0.25))' : 'none'
              }}>
              
              {/* Background web */}
              <polygon points="50,10 90,35 90,75 50,100 10,75 10,35" 
                fill={isHovered ? "rgba(56, 189, 248, 0.15)" : "rgba(241, 245, 249, 1)"} 
                stroke={isHovered ? "#7dd3fc" : "#cbd5e1"} strokeWidth={isHovered ? "1.5" : "1"} 
                style={{ transition: 'all 0.6s' }} />
              <polygon points="50,25 75,42 75,67 50,85 25,67 25,42" 
                fill="none" stroke={isHovered ? "#bae6fd" : "#e2e8f0"} strokeWidth="1" 
                style={{ transition: 'all 0.6s' }} />
              <polygon points="50,40 60,48 60,60 50,68 40,60 40,48" 
                fill="none" stroke={isHovered ? "#e0f2fe" : "#f1f5f9"} strokeWidth="1" 
                style={{ transition: 'all 0.6s' }} />
              
              <g stroke={isHovered ? "#e0f2fe" : "#e2e8f0"} strokeWidth="1" style={{ transition: 'all 0.6s' }}>
                <line x1="50" y1="50" x2="50" y2="10" />
                <line x1="50" y1="50" x2="90" y2="35" />
                <line x1="50" y1="50" x2="90" y2="75" />
                <line x1="50" y1="50" x2="50" y2="100" />
                <line x1="50" y1="50" x2="10" y2="75" />
                <line x1="50" y1="50" x2="10" y2="35" />
              </g>
              
              {/* Data polygon */}
              <g style={{ 
                 transformOrigin: '50px 50px',
                 transform: isHovered ? 'scale(1) translateZ(20px)' : 'scale(1) translateZ(0)', 
                 transition: 'all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)' 
              }}>
                  <polygon 
                    points="50,20 80,45 70,80 50,90 25,60 35,30" 
                    fill={isHovered ? "rgba(14, 165, 233, 0.35)" : "rgba(148, 163, 184, 0.15)"} 
                    stroke={isHovered ? "#0284c7" : "#94a3b8"} 
                    strokeWidth={isHovered ? "2.5" : "1.5"}
                    style={{ transition: 'all 0.6s' }}
                  />
                  
                  <g style={{ transition: 'all 0.6s', opacity: isHovered ? 1 : 0.4 }}>
                    <circle cx="50" cy="20" r="4" fill={isHovered ? "#f59e0b" : "#94a3b8"} style={{ transition: 'all 0.6s' }} />
                    <circle cx="80" cy="45" r="4" fill={isHovered ? "#10b981" : "#94a3b8"} style={{ transition: 'all 0.6s' }} />
                    <circle cx="70" cy="80" r="4" fill={isHovered ? "#0ea5e9" : "#94a3b8"} style={{ transition: 'all 0.6s' }} />
                    <circle cx="50" cy="90" r="4" fill={isHovered ? "#8b5cf6" : "#94a3b8"} style={{ transition: 'all 0.6s' }} />
                    <circle cx="25" cy="60" r="4" fill={isHovered ? "#ef4444" : "#94a3b8"} style={{ transition: 'all 0.6s' }} />
                    <circle cx="35" cy="30" r="4" fill={isHovered ? "#f43f5e" : "#94a3b8"} style={{ transition: 'all 0.6s' }} />
                  </g>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
