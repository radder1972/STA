import React from 'react';

export default function HeroRadarChart({ isHovered }) {
  return (
    <div style={{ 
      width: '100%', height: '140px', display: 'flex', justifyContent: 'center', alignItems: 'center',
      marginTop: '1rem', marginBottom: '1.5rem', position: 'relative',
      perspective: '800px'
    }}>
       <svg 
         viewBox="0 0 100 100" 
         width="130" 
         height="130" 
         style={{ 
           overflow: 'visible',
           transformStyle: 'preserve-3d',
           transform: isHovered 
             ? 'rotateX(20deg) scale(1.1) translateY(-10px)' 
             : 'rotateX(55deg) rotateZ(-15deg) scale(1.1)',
           transition: 'transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)',
           filter: isHovered ? 'drop-shadow(0 20px 15px rgba(14, 165, 233, 0.2))' : 'drop-shadow(0 15px 12px rgba(0,0,0,0.15))'
         }}>
         
         {/* Background web */}
         <polygon points="50,10 90,35 90,75 50,100 10,75 10,35" 
           fill={isHovered ? "rgba(56, 189, 248, 0.15)" : "rgba(148, 163, 184, 0.15)"} 
           stroke={isHovered ? "#7dd3fc" : "#94a3b8"} strokeWidth={isHovered ? "1.5" : "2"} 
           style={{ transition: 'all 0.6s' }} />
         <polygon points="50,25 75,42 75,67 50,85 25,67 25,42" 
           fill="none" stroke={isHovered ? "#bae6fd" : "#cbd5e1"} strokeWidth={isHovered ? "1" : "1.5"} 
           style={{ transition: 'all 0.6s' }} />
         <polygon points="50,40 60,48 60,60 50,68 40,60 40,48" 
           fill="none" stroke={isHovered ? "#e0f2fe" : "#e2e8f0"} strokeWidth={isHovered ? "1" : "1.5"} 
           style={{ transition: 'all 0.6s' }} />
         
         <g stroke={isHovered ? "#e0f2fe" : "#cbd5e1"} strokeWidth={isHovered ? "1" : "1.5"} style={{ transition: 'all 0.6s' }}>
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
            transform: isHovered ? 'scale(1) translateZ(30px)' : 'scale(0.55) translateZ(10px)', 
            transition: 'all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)' 
         }}>
             <polygon 
               points="50,20 80,45 70,80 50,90 25,60 35,30" 
               fill={isHovered ? "rgba(14, 165, 233, 0.35)" : "rgba(148, 163, 184, 0.25)"} 
               stroke={isHovered ? "#0284c7" : "#64748b"} 
               strokeWidth="2.5"
               style={{ transition: 'all 0.6s' }}
             />
             
             <g style={{ transition: 'all 0.6s' }}>
               <circle cx="50" cy="20" r="4" fill={isHovered ? "#f59e0b" : "#64748b"} style={{ transition: 'all 0.6s' }} />
               <circle cx="80" cy="45" r="4" fill={isHovered ? "#10b981" : "#64748b"} style={{ transition: 'all 0.6s' }} />
               <circle cx="70" cy="80" r="4" fill={isHovered ? "#0ea5e9" : "#64748b"} style={{ transition: 'all 0.6s' }} />
               <circle cx="50" cy="90" r="4" fill={isHovered ? "#8b5cf6" : "#64748b"} style={{ transition: 'all 0.6s' }} />
               <circle cx="25" cy="60" r="4" fill={isHovered ? "#ef4444" : "#64748b"} style={{ transition: 'all 0.6s' }} />
               <circle cx="35" cy="30" r="4" fill={isHovered ? "#f43f5e" : "#64748b"} style={{ transition: 'all 0.6s' }} />
             </g>
         </g>
       </svg>
    </div>
  );
}
