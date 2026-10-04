import React, { useState } from 'react';
import { Sparkle } from 'lucide-react';
import { 
  ClipboardIcon, 
  BrainIcon, 
  CardsIcon, 
  PlayingCardsIcon, 
  ArrowRightIcon, 
  CheckIcon, 
  ShieldIcon, 
  InfoIcon,
  PlatformBadge,
  SparklesIcon,
  ThreeSparklesLogo
} from './Icons';
import packageJson from '../../package.json';

export default function StartHub() {
  const [hoveredCard, setHoveredCard] = useState('kaarten');
  const [isBannerHovered, setIsBannerHovered] = useState(false);

  return (
    <div className="view-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem 1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* Top Badge */}
      <PlatformBadge isCurrent={true} theme="hub" marginBottom="1.5rem" />

      {/* Main Title & Subtitle */}
      <div style={{ textAlign: 'center', marginBottom: '2rem', maxWidth: '850px' }}>
        <h1 className="text-gradient-hub" style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1rem', lineHeight: '1.2' }}>
          Schematherapie Suite
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#0ea5e9', fontWeight: '600', lineHeight: '1.6', margin: '0 auto' }}>
          Drie complementaire digitale toepassingen voor therapeuten, behandelaars en professionals in opleiding. 
          Kies hieronder de gewenste werkvorm om direct aan de slag te gaan.
        </p>
      </div>

      <div 
        style={{ position: 'relative', marginBottom: '3.5rem' }}
        onMouseEnter={() => setIsBannerHovered(true)}
        onMouseLeave={() => setIsBannerHovered(false)}
      >
        {isBannerHovered && (
          <div style={{ position: 'absolute', top: '-15px', left: '-15px', right: '-15px', bottom: '-15px', pointerEvents: 'none', zIndex: 10 }}>
            <style>{`
              @keyframes hub-float-star {
                0% { transform: translateY(0) scale(0) rotate(0deg); opacity: 0; }
                20% { opacity: 1; transform: translateY(-15px) scale(1) rotate(45deg); }
                80% { opacity: 1; transform: translateY(-40px) scale(1) rotate(135deg); }
                100% { transform: translateY(-50px) scale(0) rotate(180deg); opacity: 0; }
              }
            `}</style>
            {[...Array(6)].map((_, i) => {
              const colors = ['#059669', '#3b82f6', '#8b5cf6', '#f59e0b'];
              return (
                <div key={i} style={{
                  position: 'absolute',
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  color: colors[Math.floor(Math.random() * colors.length)],
                  animation: `hub-float-star ${Math.random() * 1 + 1}s ease-out ${Math.random() * 0.5}s infinite`
                }}>
                  <Sparkle fill="currentColor" size={Math.random() * 10 + 10} strokeWidth={1} />
                </div>
              );
            })}
          </div>
        )}
        <a href="snelstart.html" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(14, 165, 233, 0.1) 100%)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '9999px', color: 'var(--text-main)', fontSize: '0.95rem', fontWeight: '700', textDecoration: 'none', boxShadow: isBannerHovered ? '0 8px 25px rgba(16, 185, 129, 0.2)' : '0 4px 15px rgba(16, 185, 129, 0.1)', transform: isBannerHovered ? 'translateY(-2px)' : 'none', transition: 'all 0.2s ease', position: 'relative', zIndex: 2 }}>
          <SparklesIcon size={18} color="#10b981" />
          Nieuw hier? Bekijk de snelle AI-startgids voor therapeuten
        </a>
      </div>

      {/* 3 Main Choice Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '2rem',
        width: '100%',
        marginBottom: '4rem',
        alignItems: 'stretch'
      }}>

        {/* Optie 1: Vragenlijsten & Zelftest */}
        <div 
          className="glass-panel" 
          onMouseEnter={() => setHoveredCard('test')}
          onMouseLeave={() => setHoveredCard('kaarten')}
          style={{
            padding: '2.5rem',
            borderRadius: '24px',
            display: 'flex',
            flexDirection: 'column',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            border: hoveredCard === 'test' ? '1px solid rgba(71, 85, 105, 0.45)' : '1px solid var(--border-color)',
            boxShadow: hoveredCard === 'test' ? '0 20px 40px rgba(71, 85, 105, 0.16), 0 0 20px rgba(71, 85, 105, 0.08)' : '0 10px 30px rgba(0, 0, 0, 0.05)',
            transform: hoveredCard === 'test' ? 'translateY(-6px)' : 'translateY(0)',
            position: 'relative',
            overflow: 'visible'
          }}
        >
          {/* Draped Sparkles on Top-Right Corner */}
          <div style={{
            position: 'absolute',
            top: '-18px',
            right: '-14px',
            zIndex: 12,
            pointerEvents: 'none',
            opacity: hoveredCard === 'test' ? 0.95 : 0,
            transform: hoveredCard === 'test' ? 'scale(1) translateY(0)' : 'scale(0.7) translateY(8px)',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            filter: 'drop-shadow(0 4px 10px rgba(71, 85, 105, 0.3))'
          }}>
            <ThreeSparklesLogo size={52} theme="test" />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              background: 'rgba(107, 114, 128, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-main)'
            }}>
              <ClipboardIcon size={32} useGradient={true} />
            </div>
            <span style={{
              fontSize: '0.8rem',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: '#6b7280',
              background: 'rgba(107, 114, 128, 0.08)',
              padding: '4px 12px',
              borderRadius: '9999px'
            }}>
              Diagnostiek
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.8rem', minHeight: '3.6rem' }}>
            <h2 style={{ fontSize: '1.45rem', color: 'var(--text-main)', fontWeight: '700', margin: 0, paddingTop: '4px', maxWidth: '200px', lineHeight: '1.25' }}>
              Vragenlijsten & Zelftest
            </h2>

            {/* Ronde Sticker: YSQ / SMI BASIS TESTEN */}
            <div style={{
              position: 'relative',
              width: '76px',
              height: '76px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #475569 0%, #64748b 100%)',
              color: '#ffffff',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              boxShadow: '0 6px 20px rgba(71, 85, 105, 0.45), 0 2px 6px rgba(0, 0, 0, 0.15)',
              transform: 'rotate(-6deg)',
              userSelect: 'none',
              padding: '6px 4px 4px 4px',
              flexShrink: 0,
              marginTop: '-10px',
              overflow: 'visible'
            }}>
              {/* Groter Sterrenlogo dat over de top van de cirkel loopt */}
              <div style={{
                position: 'absolute',
                top: '-13px',
                left: '50%',
                transform: 'translateX(-50%)',
                filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.25))',
                zIndex: 2
              }}>
                <SparklesIcon size={24} color="white" />
              </div>

              <div style={{ fontSize: '0.58rem', fontWeight: '800', letterSpacing: '0.07em', textTransform: 'uppercase', opacity: 0.95, lineHeight: 1, marginTop: '4px' }}>
                YSQ / SMI
              </div>
              <div style={{ fontSize: '0.92rem', fontWeight: '900', letterSpacing: '-0.02em', lineHeight: '1.05', margin: '1px 0', textShadow: '0 1px 2px rgba(0,0,0,0.25)' }}>
                BASIS
              </div>
              <div style={{ fontSize: '0.58rem', fontWeight: '800', letterSpacing: '0.06em', textTransform: 'uppercase', opacity: 0.95, lineHeight: 1 }}>
                TESTEN
              </div>
            </div>
          </div>

          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.6', marginBottom: '1.8rem', minHeight: '5.5rem' }}>
            Breng je onderliggende kwetsbaarheden en huidige patronen in kaart met de gevalideerde <strong>YSQ-S3</strong> en <strong>SMI</strong> vragenlijsten. Inclusief uitgebreid gecombineerd analyserapport.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: 'auto', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: '1.4' }}>
              <CheckIcon size={18} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>18 Schema's & 14 Modi in kaart</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: '1.4' }}>
              <CheckIcon size={18} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>Gecombineerd diagnostisch rapport</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: '1.4' }}>
              <CheckIcon size={18} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>PDF afdrukken & CSV exporteren</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: '1.4' }}>
              <CheckIcon size={18} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>100% lokaal en vertrouwelijk</span>
            </div>
          </div>

          <a 
            href="test.html" 
            className="btn btn-gradient"
            style={{
              textDecoration: 'none',
              padding: '14px 20px',
              fontSize: '1.05rem',
              fontWeight: '600',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              color: 'white',
              boxShadow: '0 4px 15px rgba(107, 114, 128, 0.25)'
            }}
          >
            Open Vragenlijsten <ArrowRightIcon size={18} />
          </a>
        </div>

        {/* Optie 2: Kaarten */}
        <div 
          className="glass-panel" 
          onMouseEnter={() => setHoveredCard('kaarten')}
          onMouseLeave={() => setHoveredCard('kaarten')}
          style={{
            padding: '2.5rem',
            borderRadius: '24px',
            display: 'flex',
            flexDirection: 'column',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            border: hoveredCard === 'kaarten' ? '1px solid rgba(2, 132, 199, 0.45)' : '1px solid var(--border-color)',
            boxShadow: hoveredCard === 'kaarten' ? '0 20px 40px rgba(2, 132, 199, 0.18), 0 0 20px rgba(14, 165, 233, 0.12)' : '0 10px 30px rgba(0, 0, 0, 0.05)',
            transform: hoveredCard === 'kaarten' ? 'translateY(-6px)' : 'translateY(0)',
            position: 'relative',
            overflow: 'visible'
          }}
        >
          {/* Draped Sparkles on Top-Right Corner */}
          <style>{`
            @keyframes twinkle {
              0%, 100% { opacity: 0.95; transform: scale(1) translateY(0) rotate(0deg); filter: brightness(1) drop-shadow(0 4px 10px rgba(2, 132, 199, 0.3)); }
              25% { opacity: 0.7; transform: scale(1.05) translateY(-2px) rotate(-3deg); filter: brightness(1.2) drop-shadow(0 4px 15px rgba(14, 165, 233, 0.6)); }
              75% { opacity: 0.7; transform: scale(0.95) translateY(1px) rotate(3deg); filter: brightness(1.1) drop-shadow(0 4px 8px rgba(2, 132, 199, 0.4)); }
            }
          `}</style>
          <div style={{
            position: 'absolute',
            top: '-18px',
            right: '-14px',
            zIndex: 12,
            pointerEvents: 'none',
            opacity: hoveredCard === 'kaarten' ? 0.95 : 0,
            transform: hoveredCard === 'kaarten' ? 'scale(1) translateY(0)' : 'scale(0.7) translateY(8px)',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            filter: 'drop-shadow(0 4px 10px rgba(2, 132, 199, 0.3))',
            animation: hoveredCard === 'kaarten' ? 'twinkle 3s infinite ease-in-out' : 'none'
          }}>
            <ThreeSparklesLogo size={52} theme="kaarten" />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              background: 'rgba(14, 165, 233, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0ea5e9'
            }}>
              <CardsIcon size={32} useGameGradient={true} />
            </div>
            <span style={{
              fontSize: '0.8rem',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: '#3b82f6',
              background: 'rgba(59, 130, 246, 0.08)',
              padding: '4px 12px',
              borderRadius: '9999px'
            }}>
              Theorie & Print
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.8rem', minHeight: '3.6rem' }}>
            <h2 style={{ fontSize: '1.5rem', color: 'var(--text-main)', fontWeight: '700', margin: 0, paddingTop: '4px' }}>
              Kaarten
            </h2>

            {/* Ronde Sticker: MET 2021 Update */}
            <div style={{
              position: 'relative',
              width: '76px',
              height: '76px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)',
              color: '#ffffff',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              boxShadow: '0 6px 20px rgba(234, 88, 12, 0.45), 0 2px 6px rgba(0, 0, 0, 0.15)',
              transform: 'rotate(10deg)',
              userSelect: 'none',
              padding: '6px 4px 4px 4px',
              flexShrink: 0,
              marginTop: '-10px',
              overflow: 'visible'
            }}>
              {/* Groter Sterrenlogo dat over de top van de cirkel loopt */}
              <div style={{
                position: 'absolute',
                top: '-13px',
                left: '50%',
                transform: 'translateX(-50%)',
                filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.25))',
                zIndex: 2
              }}>
                <SparklesIcon size={24} color="white" />
              </div>

              <div style={{ fontSize: '0.62rem', fontWeight: '800', letterSpacing: '0.07em', textTransform: 'uppercase', opacity: 0.95, lineHeight: 1, marginTop: '4px' }}>
                MET
              </div>
              <div style={{ fontSize: '0.98rem', fontWeight: '900', letterSpacing: '-0.02em', lineHeight: '1.05', margin: '1px 0', textShadow: '0 1px 2px rgba(0,0,0,0.25)' }}>
                2021
              </div>
              <div style={{ fontSize: '0.6rem', fontWeight: '800', letterSpacing: '0.06em', textTransform: 'uppercase', opacity: 0.95, lineHeight: 1 }}>
                UPDATE
              </div>
            </div>
          </div>

          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.6', marginBottom: '1.8rem', minHeight: '5.5rem' }}>
            Verken de 43 klassieke basiskaarten en de herziene 55-delige theoriekaartenset (VSt 2021). Ideaal om schema's en modi tastbaar en visueel te bestuderen in de praktijk of supervisie.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: 'auto', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: '1.4' }}>
              <CheckIcon size={18} color="#0ea5e9" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span><b>Bestel direct</b> de fysieke, hoogwaardige kaartenset</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: '1.4' }}>
              <CheckIcon size={18} color="#0ea5e9" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>Of <b>print alle kaarten 100% gratis</b> zélf uit</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: '1.4' }}>
              <CheckIcon size={18} color="#0ea5e9" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>Inclusief de felbegeerde <b>VSt 2021 update</b></span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: '1.4' }}>
              <CheckIcon size={18} color="#0ea5e9" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>Compleet met handleiding voor <b>werkvormen</b></span>
            </div>
          </div>

          <a 
            href="kaarten.html" 
            className="btn btn-gradient-game"
            style={{
              textDecoration: 'none',
              padding: '14px 20px',
              fontSize: '1.05rem',
              fontWeight: '600',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              color: 'white',
              boxShadow: '0 4px 15px rgba(59, 130, 246, 0.25)'
            }}
          >
            Open Kaarten <ArrowRightIcon size={18} />
          </a>
        </div>

        {/* Optie 3: Tafelopstelling */}
        <div 
          className="glass-panel" 
          onMouseEnter={() => setHoveredCard('tafel')}
          onMouseLeave={() => setHoveredCard('kaarten')}
          style={{
            padding: '2.5rem',
            borderRadius: '24px',
            display: 'flex',
            flexDirection: 'column',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            border: hoveredCard === 'tafel' ? '1px solid rgba(5, 150, 105, 0.45)' : '1px solid var(--border-color)',
            boxShadow: hoveredCard === 'tafel' ? '0 20px 40px rgba(5, 150, 105, 0.18), 0 0 20px rgba(16, 185, 129, 0.12)' : '0 10px 30px rgba(0, 0, 0, 0.05)',
            transform: hoveredCard === 'tafel' ? 'translateY(-6px)' : 'translateY(0)',
            position: 'relative',
            overflow: 'visible'
          }}
        >
          {/* Draped Sparkles on Top-Right Corner */}
          <div style={{
            position: 'absolute',
            top: '-18px',
            right: '-14px',
            zIndex: 12,
            pointerEvents: 'none',
            opacity: hoveredCard === 'tafel' ? 0.95 : 0,
            transform: hoveredCard === 'tafel' ? 'scale(1) translateY(0)' : 'scale(0.7) translateY(8px)',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            filter: 'drop-shadow(0 4px 10px rgba(5, 150, 105, 0.3))'
          }}>
            <ThreeSparklesLogo size={52} theme="tafel" />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              background: 'rgba(16, 185, 129, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#10b981'
            }}>
              <PlayingCardsIcon size={32} useTafelGradient={true} />
            </div>
            <span style={{
              fontSize: '0.8rem',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: '#059669',
              background: 'rgba(16, 185, 129, 0.1)',
              padding: '4px 12px',
              borderRadius: '9999px'
            }}>
              Interventie
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.8rem', minHeight: '3.6rem' }}>
            <h2 style={{ fontSize: '1.5rem', color: 'var(--text-main)', fontWeight: '700', margin: 0, paddingTop: '4px' }}>
              Tafelopstelling
            </h2>

            {/* Ronde Sticker: MET AI ANALYSE */}
            <div style={{
              position: 'relative',
              width: '76px',
              height: '76px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
              color: '#ffffff',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              boxShadow: '0 6px 20px rgba(5, 150, 105, 0.45), 0 2px 6px rgba(0, 0, 0, 0.15)',
              transform: 'rotate(-8deg)',
              userSelect: 'none',
              padding: '6px 4px 4px 4px',
              flexShrink: 0,
              marginTop: '-10px',
              overflow: 'visible'
            }}>
              {/* Groter Sterrenlogo dat over de top van de cirkel loopt */}
              <div style={{
                position: 'absolute',
                top: '-13px',
                left: '50%',
                transform: 'translateX(-50%)',
                filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.25))',
                zIndex: 2
              }}>
                <SparklesIcon size={24} color="white" />
              </div>

              <div style={{ fontSize: '0.62rem', fontWeight: '800', letterSpacing: '0.07em', textTransform: 'uppercase', opacity: 0.95, lineHeight: 1, marginTop: '4px' }}>
                MET
              </div>
              <div style={{ fontSize: '1.05rem', fontWeight: '900', letterSpacing: '-0.02em', lineHeight: '1.05', margin: '1px 0', textShadow: '0 1px 2px rgba(0,0,0,0.25)' }}>
                AI
              </div>
              <div style={{ fontSize: '0.6rem', fontWeight: '800', letterSpacing: '0.06em', textTransform: 'uppercase', opacity: 0.95, lineHeight: 1 }}>
                ANALYSE
              </div>
            </div>
          </div>

          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.6', marginBottom: '1.8rem', minHeight: '5.5rem' }}>
            Breng een concrete conflictsituatie of emotionele trigger interactief in kaart. Koppel de reactie (modus) aan het geraakte schema en ontvang direct advies voor je Gezonde Volwassene.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: 'auto', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: '1.4' }}>
              <CheckIcon size={18} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>Interactieve opstelling op tafel</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: '1.4' }}>
              <CheckIcon size={18} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>AI-gestuurde hypothesevorming o.b.v. situatie</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: '1.4' }}>
              <CheckIcon size={18} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>Gezonde Volwassene handelingsadvies</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: '1.4' }}>
              <CheckIcon size={18} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>Uitgebreide analyse & printbaar</span>
            </div>
          </div>

          <a 
            href="tafel.html" 
            className="btn btn-gradient-tafel"
            style={{
              textDecoration: 'none',
              padding: '14px 20px',
              fontSize: '1.05rem',
              fontWeight: '600',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              color: 'white',
              boxShadow: '0 4px 15px rgba(16, 185, 129, 0.25)'
            }}
          >
            Open Tafelopstelling <ArrowRightIcon size={18} />
          </a>
        </div>

      </div>

      {/* Subtiele Socials Balk (Grijstinten) */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '2.5rem',
        width: '100%',
        marginBottom: '3rem',
        borderTop: '1px solid #e2e8f0',
        paddingTop: '2rem'
      }}>
        <a href="linkedin.html" target="_blank" rel="noopener noreferrer" style={{
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          color: '#64748b',
          fontSize: '0.95rem',
          fontWeight: '500',
          transition: 'color 0.2s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.color = '#0f172a'}
        onMouseLeave={(e) => e.currentTarget.style.color = '#64748b'}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          Volg de lancering op LinkedIn
        </a>

        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" style={{
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          color: '#64748b',
          fontSize: '0.95rem',
          fontWeight: '500',
          transition: 'color 0.2s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.color = '#0f172a'}
        onMouseLeave={(e) => e.currentTarget.style.color = '#64748b'}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          Praat mee in onze Facebook groep
        </a>
      </div>

      {/* Trust & Info Strip */}
      <div className="glass-panel" style={{
        width: '100%',
        padding: '2rem 2.5rem',
        borderRadius: '20px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '2rem',
        marginBottom: '3rem',
        border: '1px solid var(--border-color)'
      }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
          <div style={{ padding: '10px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', flexShrink: 0 }}>
            <ShieldIcon size={24} />
          </div>
          <div>
            <h4 style={{ margin: '0 0 0.3rem 0', color: 'var(--text-main)', fontSize: '1.05rem' }}>Privacy-bewust &amp; zonder accounts</h4>
            <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
              Geen accounts, geen tracking en geen centrale database. Je antwoorden blijven in je browser; alleen als je zelf een AI-functie gebruikt, gaan gegevens naar Google. Lees de{' '}
              <a href="#verantwoording" style={{ color: 'var(--primary)', fontWeight: '600' }}>verantwoording en privacyverklaring</a>.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
          <div style={{ padding: '10px', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', flexShrink: 0 }}>
            <BrainIcon size={24} />
          </div>
          <div>
            <h4 style={{ margin: '0 0 0.3rem 0', color: 'var(--text-main)', fontSize: '1.05rem' }}>Theoretische basis & VSt 2021</h4>
            <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
              Gebaseerd op het klassieke schematherapiemodel van Jeffrey Young, met de uitbreiding uit het position paper van Arntz et al. (2021): 21 schema's, 20 modi en 7 basisbehoeften. Een eigen uitwerking, geen officiële uitgave.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
          <div style={{ padding: '10px', borderRadius: '12px', background: 'rgba(107, 114, 128, 0.1)', color: 'var(--text-main)', flexShrink: 0 }}>
            <InfoIcon size={24} />
          </div>
          <div>
            <h4 style={{ margin: '0 0 0.3rem 0', color: 'var(--text-main)', fontSize: '1.05rem' }}>Meer Informatie</h4>
            <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
              Zoek je achtergrondinformatie of een geregistreerde therapeut? Bezoek de website van de{' '}
              <a href="https://www.schematherapie.nl/home" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', fontWeight: '600' }}>
                Vereniging voor Schematherapie
              </a>.
            </p>
          </div>
        </div>
      </div>

      {/* Version Footer */}
      <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
        Schematherapie Suite v{packageJson.version} &bull; Vrij te gebruiken voor psycho-educatie en opleiding &bull;{' '}
        <a href="#verantwoording" style={{ color: 'var(--text-muted)', textDecoration: 'underline' }}>Verantwoording &amp; privacy</a>
      </div>

    </div>
  );
}
