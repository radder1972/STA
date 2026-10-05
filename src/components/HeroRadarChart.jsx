import React from 'react';

export default function HeroRadarChart({ isHovered }) {
  return (
    <div style={{ 
      width: '100%', height: '140px', display: 'flex', justifyContent: 'center', alignItems: 'center',
      marginTop: '1rem', marginBottom: '1.5rem', position: 'relative'
    }}>
       <svg viewBox="0 0 100 100" width="120" height="120" style={{ overflow: 'visible' }}>
         <polygon points="50,10 90,35 90,75 50,100 10,75 10,35" fill="none" stroke="#e2e8f0" strokeWidth="1" />
         <polygon points="50,25 75,42 75,67 50,85 25,67 25,42" fill="none" stroke="#e2e8f0" strokeWidth="1" />
         <polygon points="50,40 60,48 60,60 50,68 40,60 40,48" fill="none" stroke="#e2e8f0" strokeWidth="1" />
         
         <line x1="50" y1="50" x2="50" y2="10" stroke="#f1f5f9" strokeWidth="1" />
         <line x1="50" y1="50" x2="90" y2="35" stroke="#f1f5f9" strokeWidth="1" />
         <line x1="50" y1="50" x2="90" y2="75" stroke="#f1f5f9" strokeWidth="1" />
         <line x1="50" y1="50" x2="50" y2="100" stroke="#f1f5f9" strokeWidth="1" />
         <line x1="50" y1="50" x2="10" y2="75" stroke="#f1f5f9" strokeWidth="1" />
         <line x1="50" y1="50" x2="10" y2="35" stroke="#f1f5f9" strokeWidth="1" />
         
         <polygon 
           points={isHovered ? "50,20 80,45 70,80 50,90 25,60 35,30" : "50,50 50,50 50,50 50,50 50,50 50,50"} 
           fill="rgba(107, 114, 128, 0.15)" 
           stroke="#6b7280" 
           strokeWidth="2"
           style={{ transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
         />
         
         <g fill="#475569" style={{ transition: 'opacity 0.6s', opacity: isHovered ? 1 : 0 }}>
           <circle cx="50" cy="20" r="3" />
           <circle cx="80" cy="45" r="3" />
           <circle cx="70" cy="80" r="3" />
           <circle cx="50" cy="90" r="3" />
           <circle cx="25" cy="60" r="3" />
           <circle cx="35" cy="30" r="3" />
         </g>
       </svg>
    </div>
  );
}