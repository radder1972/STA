import React from 'react';

export default function OrderBoxAnimation({ isHovered }) {
  return (
    <div style={{
      width: '32px', height: '32px', position: 'relative',
      perspective: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center'
    }}>
       {/* Card 1 (Left) - Paars */}
       <div style={{
          position: 'absolute', width: '18px', height: '26px', background: '#c4b5fd',
          borderRadius: '2px', border: '1px solid #8b5cf6', zIndex: 1,
          transformOrigin: 'bottom center',
          transform: isHovered 
            ? 'translateX(-16px) translateY(-8px) rotate(-25deg)' 
            : 'translateX(0) translateY(4px) rotate(0deg)',
          transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.05s'
       }} />
       {/* Card 2 (Right) - Blauw */}
       <div style={{
          position: 'absolute', width: '18px', height: '26px', background: '#bae6fd',
          borderRadius: '2px', border: '1px solid #0ea5e9', zIndex: 2,
          transformOrigin: 'bottom center',
          transform: isHovered 
            ? 'translateX(16px) translateY(-8px) rotate(25deg)' 
            : 'translateX(0) translateY(4px) rotate(0deg)',
          transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s'
       }} />
       {/* Card 3 (Center) - Groen */}
       <div style={{
          position: 'absolute', width: '18px', height: '26px', background: '#a7f3d0',
          borderRadius: '2px', border: '1px solid #10b981', zIndex: 3,
          transformOrigin: 'bottom center',
          transform: isHovered 
            ? 'translateX(0) translateY(-14px) rotate(0deg)' 
            : 'translateX(0) translateY(4px) rotate(0deg)',
          transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.15s'
       }} />

       {/* The Box */}
       <div style={{
          position: 'absolute', width: '22px', height: '28px', zIndex: 10,
          background: '#f97316',
          borderRadius: '2px', border: '1px solid #c2410c',
          boxShadow: '0 4px 10px rgba(234, 88, 12, 0.4)',
          transform: isHovered ? 'scale(1.05) translateY(4px)' : 'scale(1) translateY(4px)',
          transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
       }}>
           {/* Top opening/flap */}
           <div style={{
             position: 'absolute', top: '-4px', left: '-1px', width: '22px', height: '5px',
             background: '#ea580c', border: '1px solid #c2410c', borderBottom: 'none',
             borderRadius: '2px 2px 0 0'
           }} />
           {/* Box decoration */}
           <div style={{ position: 'absolute', top: '8px', left: '4px', width: '12px', height: '6px', background: 'rgba(255,255,255,0.9)', borderRadius: '1px' }} />
       </div>
    </div>
  );
}
