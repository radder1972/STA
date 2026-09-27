import React, { useEffect } from 'react';
import { ArrowLeftIcon } from 'lucide-react';
import img1 from '../assets/images/modicategorieen/1.png';
import img2 from '../assets/images/modicategorieen/2.png';
import img3a from '../assets/images/modicategorieen/3a.png';
import img3b from '../assets/images/modicategorieen/3b.png';
import img3c from '../assets/images/modicategorieen/3c.png';
import img4 from '../assets/images/modicategorieen/4.png';

const ModiCategorieen = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="details-section" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', background: 'var(--bg-color)', borderRadius: '16px' }}>
      <button 
        onClick={onBack} 
        className="btn btn-outline no-print" 
        style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '8px' }}
      >
        <ArrowLeftIcon size={18} /> Terug naar resultaten
      </button>

      <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>De 4 Modi Categorieën</h1>
      
      <p style={{ fontSize: '1.1rem', lineHeight: '1.7', color: 'var(--text-main)', marginBottom: '3rem' }}>
        Binnen de schematherapie worden de modi ingedeeld in vier hoofdcategorieën:
      </p>

      {/* Categorie 1 */}
      <div className="glass-panel page-break" style={{ padding: '2rem', marginBottom: '2rem', borderRadius: '16px', border: '1px solid var(--border-color)', display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 300px' }}>
          <h2 style={{ color: '#10b981', marginBottom: '1rem', fontSize: '1.5rem' }}>1. Kindmodi</h2>
          <p style={{ lineHeight: '1.6', color: 'var(--text-muted)' }}>
            Dit zijn de intense, oorspronkelijke emoties en behoeften die iemand als kind ervoer en die in het heden weer opspelen bij een trigger. Voorbeelden zijn het Kwetsbare kind, het Boze kind, het Impulsieve/Ongedisciplineerde kind en het Blije/Gezonde kind.
          </p>
        </div>
        <div className="schema-img playing-card" style={{ flexShrink: 0, width: '200px', height: '240px', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px' }}>
          <img src={img1} alt="Kindmodi" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>
      </div>

      {/* Categorie 2 */}
      <div className="glass-panel page-break" style={{ padding: '2rem', marginBottom: '2rem', borderRadius: '16px', border: '1px solid var(--border-color)', display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap', flexDirection: 'row-reverse' }}>
        <div style={{ flex: '1 1 300px' }}>
          <h2 style={{ color: '#3b82f6', marginBottom: '1rem', fontSize: '1.5rem' }}>2. Disfunctionele oudermodi</h2>
          <p style={{ lineHeight: '1.6', color: 'var(--text-muted)' }}>
            Dit zijn de geïnternaliseerde, negatieve stemmen en houdingen van belangrijke figuren uit de jeugd. Voorbeelden zijn de Straffende ouder, de Veeleisende ouder en de Schuldinducerende ouder.
          </p>
        </div>
        <div className="schema-img playing-card" style={{ flexShrink: 0, width: '200px', height: '240px', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px' }}>
          <img src={img2} alt="Disfunctionele oudermodi" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>
      </div>

      {/* Categorie 3 */}
      <div className="glass-panel page-break" style={{ padding: '2rem', marginBottom: '2rem', borderRadius: '16px', border: '1px solid var(--border-color)', display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 300px' }}>
          <h2 style={{ color: '#eab308', marginBottom: '1rem', fontSize: '1.5rem' }}>3. Copingmodi</h2>
          <p style={{ lineHeight: '1.6', color: 'var(--text-muted)' }}>
            Dit zijn de overlevingsstrategieën (afweermechanismen) die in de jeugd zijn aangeleerd om pijn en druk te vermijden. Ze zijn gebaseerd op de biologische reacties van vechten, vluchten en bevriezen:
          </p>
          <ul style={{ lineHeight: '1.6', color: 'var(--text-muted)', paddingLeft: '1.5rem', margin: '0.5rem 0' }}>
            <li style={{ marginBottom: '0.5rem' }}><strong>Overgave (meebewegen/onderwerpen):</strong> Bijvoorbeeld de Willoze inschikker.</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Vermijding (vluchten/afsluiten):</strong> Bijvoorbeeld de Onthechte beschermer of de Onthechte zelfsusser.</li>
            <li><strong>Overcompensatie (vechten/tegenaanval):</strong> Bijvoorbeeld de Grandioze overcompensator of de Pest-en-aanvalmodus.</li>
          </ul>
        </div>
        <div className="schema-img playing-card" style={{ flexShrink: 0, width: '220px', height: '240px', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px', position: 'relative' }}>
          <img src={img3c} alt="Overcompensatie" style={{ width: '120px', height: 'auto', position: 'absolute', right: '10px', top: '40px', zIndex: 1, objectFit: 'contain', transform: 'rotate(5deg)' }} />
          <img src={img3b} alt="Vermijding" style={{ width: '120px', height: 'auto', position: 'absolute', right: '50px', top: '30px', zIndex: 2, objectFit: 'contain' }} />
          <img src={img3a} alt="Overgave" style={{ width: '120px', height: 'auto', position: 'absolute', right: '90px', top: '20px', zIndex: 3, objectFit: 'contain', transform: 'rotate(-5deg)', filter: 'drop-shadow(2px 4px 6px rgba(0,0,0,0.1))' }} />
        </div>
      </div>

      {/* Categorie 4 */}
      <div className="glass-panel page-break" style={{ padding: '2rem', marginBottom: '2rem', borderRadius: '16px', border: '1px solid var(--border-color)', display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap', flexDirection: 'row-reverse' }}>
        <div style={{ flex: '1 1 300px' }}>
          <h2 style={{ color: '#f97316', marginBottom: '1rem', fontSize: '1.5rem' }}>4. De Gezonde Volwassene</h2>
          <p style={{ lineHeight: '1.6', color: 'var(--text-muted)' }}>
            Dit is de gebalanceerde, rationele en zorgzame kant. Deze modus neemt de regie, troost het Kwetsbare kind, stelt grenzen aan de disfunctionele oudermodi en vervangt automatische copingmodi door effectieve, bewuste keuzes.
          </p>
        </div>
        <div className="schema-img playing-card" style={{ flexShrink: 0, width: '200px', height: '240px', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px' }}>
          <img src={img4} alt="De Gezonde Volwassene" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>
      </div>

      <div className="no-print" style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
        <button 
          onClick={onBack} 
          className="btn btn-outline" 
          style={{ padding: '12px 24px', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <ArrowLeftIcon size={20} /> Terug naar resultaten
        </button>
      </div>
    </div>
  );
};

export default ModiCategorieen;
