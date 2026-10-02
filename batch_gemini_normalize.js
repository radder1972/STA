import fs from 'fs';
import path from 'path';

// Catalog of all 55 Schematherapie cards by category
const CARDS_CATALOG = [
  // 1. Basisbehoeften (7)
  { id: 'b1', name: 'Veiligheid & Verbinding', cat: 'basisbehoeften', file: 'basisbehoeften/1.png' },
  { id: 'b2', name: 'Autonomie & Competentie', cat: 'basisbehoeften', file: 'basisbehoeften/2.png' },
  { id: 'b3', name: 'Vrijheid van Expressie', cat: 'basisbehoeften', file: 'basisbehoeften/3.png' },
  { id: 'b4', name: 'Spontaniteit & Spel', cat: 'basisbehoeften', file: 'basisbehoeften/4.png' },
  { id: 'b5', name: 'Realistische Grenzen', cat: 'basisbehoeften', file: 'basisbehoeften/5.png' },
  { id: 'b6', name: 'Zelfcoherentie', cat: 'basisbehoeften', file: 'basisbehoeften/6.png' },
  { id: 'b7', name: 'Rechtvaardigheid', cat: 'basisbehoeften', file: 'basisbehoeften/7.png' },

  // 2. Schema's (18)
  { id: 's1', name: 'Verlating / Instabiliteit', cat: 'schemas', file: 'schemas/Abandonment.png' },
  { id: 's2', name: 'Wantrouwen / Misbruik', cat: 'schemas', file: 'schemas/Mistrust.png' },
  { id: 's3', name: 'Emotioneel Tekort', cat: 'schemas', file: 'schemas/Emotional deprivation.png' },
  { id: 's4', name: 'Minderwaardigheid / Schaamte', cat: 'schemas', file: 'schemas/Defectiveness_unlovability.png' },
  { id: 's5', name: 'Sociaal Isolement / Vervreemding', cat: 'schemas', file: 'schemas/Social isolation_Alienation.png' },
  { id: 's6', name: 'Afhankelijkheid / Onbekwaamheid', cat: 'schemas', file: 'schemas/Practical incompetence_Dependence.png' },
  { id: 's7', name: 'Kwetsbaarheid voor Ziekte en Gevaar', cat: 'schemas', file: 'schemas/Vulnerability to harm_illness.png' },
  { id: 's8', name: 'Verstrengeling / Onontwikkeld Zelf', cat: 'schemas', file: 'schemas/Enmeshment.png' },
  { id: 's9', name: 'Mislukking', cat: 'schemas', file: 'schemas/Failure to achieve.png' },
  { id: 's10', name: 'Zich Rechten Toe-eigenen', cat: 'schemas', file: 'schemas/Entitlement_Superiority.png' },
  { id: 's11', name: 'Gebrek aan Zelfcontrole / Zelfdiscipline', cat: 'schemas', file: 'schemas/Insufficient self-control_self-discipline.png' },
  { id: 's12', name: 'Onderwerping', cat: 'schemas', file: 'schemas/Subjugation.png' },
  { id: 's13', name: 'Zelfoffering', cat: 'schemas', file: 'schemas/Self-sacrifice.png' },
  { id: 's14', name: 'Goedkeuring & Erkenning Zoeken', cat: 'schemas', file: 'schemas/Admiration_Recognition-seeking.png' },
  { id: 's15', name: 'Negativiteit & Pessimisme', cat: 'schemas', file: 'schemas/Pessimism_Worry.png' },
  { id: 's16', name: 'Emotionele Remming', cat: 'schemas', file: 'schemas/Emotional inhibition.png' },
  { id: 's17', name: 'Meedogenloze Normen / Overmatig Kritisch', cat: 'schemas', file: 'schemas/Unrelenting Standards.png' },
  { id: 's18', name: 'Bestraffendheid', cat: 'schemas', file: 'schemas/Self-punitiveness.png' },

  // 3. Modi (14)
  { id: 'm1', name: 'Kwetsbare Kind', cat: 'modes', file: 'modes/kk.png' },
  { id: 'm2', name: 'Boze Kind', cat: 'modes', file: 'modes/bk.png' },
  { id: 'm3', name: 'Impulsieve Kind', cat: 'modes', file: 'modes/ik.png' },
  { id: 'm4', name: 'Ongedisciplineerde Kind', cat: 'modes', file: 'modes/ok.png' },
  { id: 'm5', name: 'Onthechte Beschermer', cat: 'modes', file: 'modes/ob.png' },
  { id: 'm6', name: 'Onthechte Zelfsusser', cat: 'modes', file: 'modes/oz.png' },
  { id: 'm7', name: 'Wantrouwende Overcontroleerder', cat: 'modes', file: 'modes/vo.png' },
  { id: 'm8', name: 'Zelfverheerlijker', cat: 'modes', file: 'modes/zh.png' },
  { id: 'm9', name: 'Pest en Aanval', cat: 'modes', file: 'modes/pa.png' },
  { id: 'm10', name: 'Willoze Inschikkelijke', cat: 'modes', file: 'modes/wi.png' },
  { id: 'm11', name: 'Straffende Oudermodus', cat: 'modes', file: 'modes/so.png' },
  { id: 'm12', name: 'Veeleisende Oudermodus', cat: 'modes', file: 'modes/vo.png' },
  { id: 'm13', name: 'Gezonde Volwassene', cat: 'modes', file: 'modes/gv.png' },
  { id: 'm14', name: 'Blije Kind', cat: 'modes', file: 'modes/rk.png' },

  // 4. Coping & VST Uitbreidingen (10)
  { id: 'v1', name: 'Aandacht & Erkenningzoeker', cat: 'vst', file: 'vst/aandacht_erkenningzoeker.png' },
  { id: 'v2', name: 'Bedrog & Manipulatie', cat: 'vst', file: 'vst/bedrog_en_manipulatie.png' },
  { id: 'v3', name: 'Betekenisvolle Wereld', cat: 'vst', file: 'vst/betekenisvolle_wereld.png' },
  { id: 'v4', name: 'Blije Kind (VST)', cat: 'vst', file: 'vst/blije_kind.png' },
  { id: 'v5', name: 'Boze Beschermer', cat: 'vst', file: 'vst/boze_beschermer.png' },
  { id: 'v6', name: 'Coherente Identiteit', cat: 'vst', file: 'vst/coherente_identiteit.png' },
  { id: 'v7', name: 'Coping: Omkering', cat: 'vst', file: 'vst/coping_omkering.png' },
  { id: 'v8', name: 'Onrechtvaardigheid', cat: 'vst', file: 'vst/onrechtvaardigheid.png' },
  { id: 'v9', name: 'Perfectionistische Overcontroleerder', cat: 'vst', file: 'vst/perfectionistische_overcontroleerder.png' },
  { id: 'v10', name: 'Roofdier', cat: 'vst', file: 'vst/roofdier.png' },

  // 5. Modicategorieën (6)
  { id: 'c1', name: 'Kindmodi (Categorie)', cat: 'modicategorieen', file: 'modicategorieen/1.png' },
  { id: 'c2', name: 'Beschermermodi (Categorie)', cat: 'modicategorieen', file: 'modicategorieen/2.png' },
  { id: 'c3', name: 'Oudermodi (Categorie)', cat: 'modicategorieen', file: 'modicategorieen/4.png' },
  { id: 'c4', name: 'Coping: Overcompensatie', cat: 'modicategorieen', file: 'modicategorieen/coping_overcompensatie.png' },
  { id: 'c5', name: 'Coping: Overgave', cat: 'modicategorieen', file: 'modicategorieen/coping_overgave.png' },
  { id: 'c6', name: 'Coping: Vermijding', cat: 'modicategorieen', file: 'modicategorieen/coping_vermijding.png' }
];

console.log('=== GEMINI BATCH NORMALIZATION CATALOG ===');
console.log(`Total items to process: ${CARDS_CATALOG.length}`);

// Output summary table
CARDS_CATALOG.forEach((item, index) => {
  console.log(`[${index + 1}/${CARDS_CATALOG.length}] [${item.cat.toUpperCase()}] ${item.name} (${item.file})`);
});
