import React, { useEffect } from 'react';
import { ArrowLeftIcon } from 'lucide-react';
import { CardInnerBorder } from '../utils/colors';
import img1 from '../assets/images/basisbehoeften/1.png';
import img2 from '../assets/images/basisbehoeften/2.png';
import img3 from '../assets/images/basisbehoeften/3.png';
import img4 from '../assets/images/basisbehoeften/4.png';
import img5 from '../assets/images/basisbehoeften/5.png';

const Basisbehoeften = ({ onBack }) => {
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

      <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>De 5 Emotionele Basisbehoeften</h1>
      
      <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: 'var(--text-main)', marginBottom: '3rem' }}>
        Binnen de schematherapie worden vijf universele emotionele basisbehoeften onderscheiden die elk kind nodig heeft om zich te ontwikkelen tot een psychologisch gezonde en veerkrachtige volwassene. Wanneer aan deze behoeften chronisch niet wordt voldaan, ontstaan er vroege maladaptieve schema's.
      </p>

      {/* Behoefte 1 */}
      <div className="glass-panel page-break" style={{ padding: '2rem', marginBottom: '2rem', borderRadius: '16px', border: '1px solid var(--border-color)', display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 300px' }}>
          <h2 style={{ color: '#34d399', marginBottom: '1rem', fontSize: '1.5rem' }}>1. Veilige hechting en verbondenheid</h2>
          <p style={{ lineHeight: '1.6', color: 'var(--text-main)' }}>
            Dit is de meest fundamentele behoefte. Het draait om veiligheid, stabiliteit, verzorging en onvoorwaardelijke acceptatie. Een kind moet voelen dat het gewenst is en dat de opvoeders een veilige thuishaven bieden waarop altijd kan worden teruggevallen, zonder angst voor verlating of afwijzing.
          </p>
        </div>
        <div className="schema-img playing-card" style={{ flexShrink: 0, width: '230px', height: '330px', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px', transform: 'rotate(2deg)' }}>
          <CardInnerBorder color="#34d399" />
          <img src={img1} alt="Veilige hechting" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>
      </div>

      {/* Behoefte 2 */}
      <div className="glass-panel page-break" style={{ padding: '2rem', marginBottom: '2rem', borderRadius: '16px', border: '1px solid var(--border-color)', display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap', flexDirection: 'row-reverse' }}>
        <div style={{ flex: '1 1 300px' }}>
          <h2 style={{ color: '#60a5fa', marginBottom: '1rem', fontSize: '1.5rem' }}>2. Autonomie, competentie en identiteitsgevoel</h2>
          <p style={{ lineHeight: '1.6', color: 'var(--text-main)' }}>
            Dit is de behoefte om je als een onafhankelijk, capabel individu te ontwikkelen. Het gaat om de ruimte om zelf de wereld te ontdekken, fouten te mogen maken en vertrouwen te krijgen in je eigen kunnen. Als deze behoefte in de knel komt, voelt iemand zich als volwassene vaak extreem afhankelijk of kwetsbaar.
          </p>
        </div>
        <div className="schema-img playing-card" style={{ flexShrink: 0, width: '230px', height: '330px', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px', transform: 'rotate(5deg)' }}>
          <CardInnerBorder color="#60a5fa" />
          <img src={img2} alt="Autonomie en competentie" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>
      </div>

      {/* Behoefte 3 */}
      <div className="glass-panel page-break" style={{ padding: '2rem', marginBottom: '2rem', borderRadius: '16px', border: '1px solid var(--border-color)', display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 300px' }}>
          <h2 style={{ color: '#facc15', marginBottom: '1rem', fontSize: '1.5rem' }}>3. Vrijheid om behoeften en emoties te uiten</h2>
          <p style={{ lineHeight: '1.6', color: 'var(--text-main)' }}>
            Ieder mens heeft de behoefte om zich vrij uit te drukken. Het kind moet ervaren dat de eigen gevoelens (ook boosheid of verdriet) en behoeften geldig zijn, en niet minder belangrijk zijn dan die van anderen. Wanneer deze behoefte wordt onderdrukt, ontstaat vaak zelfopoffering of onderwerping.
          </p>
        </div>
        <div className="schema-img playing-card" style={{ flexShrink: 0, width: '230px', height: '330px', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px', transform: 'rotate(-4deg)' }}>
          <CardInnerBorder color="#facc15" />
          <img src={img3} alt="Vrijheid en emoties" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>
      </div>

      {/* Behoefte 4 */}
      <div className="glass-panel page-break" style={{ padding: '2rem', marginBottom: '2rem', borderRadius: '16px', border: '1px solid var(--border-color)', display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap', flexDirection: 'row-reverse' }}>
        <div style={{ flex: '1 1 300px' }}>
          <h2 style={{ color: '#fb923c', marginBottom: '1rem', fontSize: '1.5rem' }}>4. Spontaniteit en spel</h2>
          <p style={{ lineHeight: '1.6', color: 'var(--text-main)' }}>
            Er moet ruimte zijn voor plezier, creativiteit en onbezorgdheid. Niet alles hoeft nuttig, perfect of efficiënt te zijn. Deze behoefte beschermt ons tegen meedogenloze normen, overmatige prestatiedruk en het gevoel dat het leven uitsluitend uit plichten bestaat.
          </p>
        </div>
        <div className="schema-img playing-card" style={{ flexShrink: 0, width: '230px', height: '330px', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px', transform: 'rotate(5deg)' }}>
          <CardInnerBorder color="#fb923c" />
          <img src={img4} alt="Spontaniteit en spel" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>
      </div>

      {/* Behoefte 5 */}
      <div className="glass-panel page-break" style={{ padding: '2rem', marginBottom: '2rem', borderRadius: '16px', border: '1px solid var(--border-color)', display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 300px' }}>
          <h2 style={{ color: '#f87171', marginBottom: '1rem', fontSize: '1.5rem' }}>5. Realistische grenzen en zelfcontrole</h2>
          <p style={{ lineHeight: '1.6', color: 'var(--text-main)' }}>
            Naast vrijheid heeft een kind kaders nodig om te leren omgaan met frustratie. Dit betekent leren dat je niet altijd je zin kunt krijgen, dat je rekening moet houden met anderen, en dat je discipline moet opbrengen voor taken die minder leuk zijn. Het ontbreken hiervan leidt vaak tot onvoldoende zelfcontrole of veeleisendheid richting anderen.
          </p>
        </div>
        <div className="schema-img playing-card" style={{ flexShrink: 0, width: '230px', height: '330px', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px', transform: 'rotate(3deg)' }}>
          <CardInnerBorder color="#f87171" />
          <img src={img5} alt="Realistische grenzen" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
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

export default Basisbehoeften;
