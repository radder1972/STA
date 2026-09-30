import React, { useEffect } from 'react';
import { ArrowLeftIcon } from 'lucide-react';
import { CardInnerBorder } from '../utils/colors';
import SchemaCard from './SchemaCard';
import img1 from '../assets/images/modicategorieen/1.png';
import img2 from '../assets/images/modicategorieen/2.png';
import imgOvergave from '../assets/images/modicategorieen/coping_overgave.png';
import imgVermijding from '../assets/images/modicategorieen/coping_vermijding.png';
import imgOvercomp from '../assets/images/modicategorieen/coping_overcompensatie.png';
import img4 from '../assets/images/modicategorieen/4.png';

const ModiCategorieen = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="glass-panel" style={{ padding: '3rem', maxWidth: '850px', margin: '0 auto', borderRadius: '24px' }}>
      <button 
        onClick={onBack} 
        className="btn btn-outline no-print" 
        style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '8px' }}
      >
        <ArrowLeftIcon size={18} /> Terug naar resultaten
      </button>

      <h1 className="box-heading text-gradient" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>De 4 Modi Categorieën</h1>
      
      <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: 'var(--text-main)', marginBottom: '3rem' }}>
        Binnen de schematherapie worden de modi ingedeeld in vier hoofdcategorieën:
      </p>

      {/* Categorie 1 */}
      <div className="inner-box page-break" style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 300px' }}>
          <h2 className="box-heading" style={{ color: '#60a5fa', marginBottom: '1rem' }}>1. Kindmodi</h2>
          <p style={{ lineHeight: '1.6', color: 'var(--text-main)' }}>
            Dit zijn de intense, oorspronkelijke emoties en behoeften die iemand als kind ervoer en die in het heden weer opspelen bij een trigger. Voorbeelden zijn het Kwetsbare kind, het Boze kind, het Impulsieve/Ongedisciplineerde kind en het Blije/Gezonde kind.
          </p>
        </div>
        <SchemaCard 
          id="m1"
          src={img1}
          color="#60a5fa"
          width="230px"
          height="330px"
          rotation={-4}
          flipOnClick={false}
          style={{ flexShrink: 0 }}
        />
      </div>

      {/* Categorie 2 */}
      <div className="inner-box page-break" style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap', flexDirection: 'row-reverse' }}>
        <div style={{ flex: '1 1 300px' }}>
          <h2 className="box-heading" style={{ color: '#f87171', marginBottom: '1rem' }}>2. Disfunctionele oudermodi</h2>
          <p style={{ lineHeight: '1.6', color: 'var(--text-main)' }}>
            Dit zijn de geïnternaliseerde, negatieve stemmen en houdingen van belangrijke figuren uit de jeugd. Voorbeelden zijn de Straffende ouder, de Veeleisende ouder en de Schuldinducerende ouder.
          </p>
        </div>
        <SchemaCard 
          id="m2"
          src={img2}
          color="#f87171"
          width="230px"
          height="330px"
          rotation={-2}
          flipOnClick={false}
          style={{ flexShrink: 0 }}
        />
      </div>

      {/* Categorie 3 */}
      <div className="inner-box page-break" style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 300px' }}>
          <h2 className="box-heading" style={{ color: '#facc15', marginBottom: '1rem' }}>3. Copingmodi</h2>
          <p style={{ lineHeight: '1.6', color: 'var(--text-main)' }}>
            Dit zijn de overlevingsstrategieën (afweermechanismen) die in de jeugd zijn aangeleerd om pijn en druk te vermijden. Ze zijn gebaseerd op de biologische reacties van vechten, vluchten en bevriezen:
          </p>
          <ul style={{ lineHeight: '1.6', color: 'var(--text-main)', paddingLeft: '1.5rem', margin: '0.5rem 0' }}>
            <li style={{ marginBottom: '0.5rem' }}><strong>Overgave (meebewegen/onderwerpen):</strong> Bijvoorbeeld de Willoze inschikker.</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Vermijding (vluchten/afsluiten):</strong> Bijvoorbeeld de Onthechte beschermer of de Onthechte zelfsusser.</li>
            <li><strong>Overcompensatie (vechten/tegenaanval):</strong> Bijvoorbeeld de Grandioze overcompensator of de Pest-en-aanvalmodus.</li>
          </ul>
        </div>
        <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', position: 'relative' }}>
          <SchemaCard 
            id="overgave"
            src={imgOvergave}
            color="#facc15"
            width="230px"
            height="330px"
            rotation={2}
            flipOnClick={false}
            style={{ zIndex: 1 }}
          />
          <SchemaCard 
            id="vermijding"
            src={imgVermijding}
            color="#facc15"
            width="230px"
            height="330px"
            rotation={-4}
            flipOnClick={false}
            style={{ zIndex: 2, marginTop: '-110px' }}
            imageStyle={{ transform: 'scale(0.8)' }}
          />
          <SchemaCard 
            id="overcomp"
            src={imgOvercomp}
            color="#facc15"
            width="230px"
            height="330px"
            rotation={4}
            flipOnClick={false}
            style={{ zIndex: 3, marginTop: '-110px' }}
          />
        </div>
      </div>

      {/* Categorie 4 */}
      <div className="inner-box page-break" style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap', flexDirection: 'row-reverse' }}>
        <div style={{ flex: '1 1 300px' }}>
          <h2 className="box-heading" style={{ color: '#34d399', marginBottom: '1rem' }}>4. De Gezonde Volwassene</h2>
          <p style={{ lineHeight: '1.6', color: 'var(--text-main)' }}>
            Dit is de gebalanceerde, rationele en zorgzame kant. Deze modus neemt de regie, troost het Kwetsbare kind, stelt grenzen aan de disfunctionele oudermodi en vervangt automatische copingmodi door effectieve, bewuste keuzes.
          </p>
        </div>
        <SchemaCard 
          id="m4"
          src={img4}
          color="#34d399"
          width="230px"
          height="330px"
          rotation={-4}
          flipOnClick={false}
          style={{ flexShrink: 0 }}
        />
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
