import { ysqSchemaNamesMap, smiModesMap } from '../data/cards';
import { schemaDescriptions } from '../data/descriptions';

// Geeft de props voor een kaart zoals hij verkocht wordt: met volledige DSP-labeling
// (typebadge S/M, typelabel, copingstijl, officiële kaarttitel en achterkanttekst).
// kind: 'schema' (YSQ) of 'mode' (SMI); id: de scoring-id uit ysq-/smi-scoring.json.
export const getOfficialCardProps = (kind, id) => {
  if (kind === 'schema') {
    const key = (id || '').replace(/\//g, '_');
    const title = ysqSchemaNamesMap[key] || id;
    return {
      type: 'schema',
      title,
      description: schemaDescriptions[title] || title,
      imageStyle: { transform: title === 'Kwetsbaarheid voor ziekte en gevaar' ? 'scale(1.4)' : 'scale(1)' }
    };
  }
  const title = smiModesMap[id] || id;
  return {
    type: 'mode',
    title,
    description: schemaDescriptions[title] || title,
    imageStyle: { transform: 'scale(1.1)' }
  };
};
