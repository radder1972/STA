import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { Share2, Rotate3d, Eye, Play, Pause, ZoomIn, ZoomOut, Coins, X, BookOpen, ChevronDown, ChevronUp, Search, HelpCircle, ArrowLeftRight } from 'lucide-react';
import SchemaCard from './SchemaCard';
import ysqScoring from '../data/ysq-scoring.json';
import smiScoring from '../data/smi-scoring.json';
import { getSchemaImage, getModeImage } from '../utils/images';
import { schemaDescriptions } from '../data/descriptions';
import { getCardColor } from '../utils/colors';

const MODES_INFO = [
  { id: 'gv', title: 'Gezonde volwassene', category: 'gezond', abbr: 'GV' },
  { id: 'bk', title: 'Blije kind', category: 'gezond', abbr: 'BK' },
  { id: 'kk', title: 'Kwetsbare kind', category: 'kind', abbr: 'KK' },
  { id: 'rk', title: 'Razende kind', category: 'kind', abbr: 'RK' },
  { id: 'boos_k', title: 'Boze kind', category: 'kind', abbr: 'WK' },
  { id: 'ik', title: 'Impulsieve kind', category: 'kind', abbr: 'IK' },
  { id: 'ok', title: 'Ongedisciplineerde kind', category: 'kind', abbr: 'OK' },
  { id: 'wi', title: 'Willoze inschikkelijke', category: 'coping', abbr: 'WI' },
  { id: 'ob', title: 'Onthechte beschermer', category: 'coping', abbr: 'OB' },
  { id: 'oz', title: 'Onthechte zelfsusser', category: 'coping', abbr: 'OZ' },
  { id: 'zh', title: 'Zelfverheerlijker', category: 'coping', abbr: 'ZH' },
  { id: 'pa', title: 'Pest en aanval', category: 'coping', abbr: 'PA' },
  { id: 'so', title: 'Straffende ouder', category: 'ouder', abbr: 'SO' },
  { id: 'vo', title: 'Veeleisende ouder', category: 'ouder', abbr: 'VO' }
];

const SCHEMAS_INFO = [
  // Domein I: Verbondenheid & Veiligheid (#60a5fa)
  { id: 'Abandonment', title: 'Verlating / Instabiliteit', domain: 'Verbondenheid & Veiligheid', abbr: 'VE' },
  { id: 'Mistrust', title: 'Wantrouwen / Misbruik', domain: 'Verbondenheid & Veiligheid', abbr: 'WA' },
  { id: 'Emotional deprivation', title: 'Emotionele verwaarlozing', domain: 'Verbondenheid & Veiligheid', abbr: 'EV' },
  { id: 'Defectiveness/unlovability', title: 'Minderwaardigheid / Schaamte', domain: 'Verbondenheid & Veiligheid', abbr: 'MI' },
  { id: 'Social isolation/Alienation', title: 'Sociaal isolement / Vervreemding', domain: 'Verbondenheid & Veiligheid', abbr: 'SI' },

  // Domein II: Autonomie & Prestatie (#34d399)
  { id: 'Practical incompetence/Dependence', title: 'Afhankelijkheid / Onbekwaamheid', domain: 'Autonomie', abbr: 'AF' },
  { id: 'Vulnerability to harm/illness', title: 'Kwetsbaarheid voor ziekte en gevaar', domain: 'Autonomie', abbr: 'KW' },
  { id: 'Enmeshment', title: 'Verstrengeling / Kluwen', domain: 'Autonomie', abbr: 'VS' },
  { id: 'Failure to achieve', title: 'Mislukking', domain: 'Autonomie', abbr: 'ML' },

  // Domein III: Realistische Grenzen (#fb923c)
  { id: 'Entitlement/Superiority', title: 'Zich rechten toe-eigenen', domain: 'Realistische Grenzen', abbr: 'ZR' },
  { id: 'Insufficient self-control/self-discipline', title: 'Gebrek aan zelfcontrole / Zelfdiscipline', domain: 'Realistische Grenzen', abbr: 'ZC' },

  // Domein IV: Zelfexpressie (#facc15)
  { id: 'Subjugation', title: 'Onderwerping', domain: 'Zelfexpressie', abbr: 'OW' },
  { id: 'Self-sacrifice', title: 'Zelfopoffering', domain: 'Zelfexpressie', abbr: 'ZO' },
  { id: 'Admiration/Recognition-seeking', title: 'Goedkeuring en erkenning zoeken', domain: 'Zelfexpressie', abbr: 'EZ' },

  // Domein V: Spontaniteit & Spel (#f87171)
  { id: 'Pessimism/Worry', title: 'Negativiteit en pessimisme', domain: 'Spontaniteit & Spel', abbr: 'PE' },
  { id: 'Emotional inhibition', title: 'Emotionele geremdheid', domain: 'Spontaniteit & Spel', abbr: 'EG' },
  { id: 'Unrelenting Standards', title: 'Meedogenloze normen / Overmatig kritisch', domain: 'Spontaniteit & Spel', abbr: 'MN' },
  { id: 'Self-punitiveness', title: 'Bestraffende houding', domain: 'Spontaniteit & Spel', abbr: 'BH' }
];

const SMI_KEY_TO_ID = {
  'gv': 'gv', 'bk': 'bk', 'so': 'so', 'vo': 'vo', 'rk': 'rk',
  'wk': 'boos_k', 'boos_k': 'boos_k', 'ik': 'ik', 'ok': 'ok', 'kk': 'kk',
  'zh': 'zh', 'ob': 'ob', 'pa': 'pa', 'oz': 'oz', 'wi': 'wi'
};

// Theoretical correlation links between schemas and triggered modes
const SCHEMA_TO_MODI_MAP = {
  'Emotional deprivation': ['kk', 'ob', 'oz'],
  'Abandonment': ['kk', 'boos_k', 'wi'],
  'Mistrust': ['ob', 'pa'],
  'Defectiveness/unlovability': ['kk', 'so', 'zh'],
  'Social isolation/Alienation': ['ob', 'kk'],
  'Practical incompetence/Dependence': ['kk', 'wi'],
  'Vulnerability to harm/illness': ['kk', 'ob'],
  'Enmeshment': ['wi', 'kk'],
  'Failure to achieve': ['so', 'kk'],
  'Entitlement/Superiority': ['zh', 'pa'],
  'Insufficient self-control/self-discipline': ['ok', 'ik'],
  'Subjugation': ['wi'],
  'Self-sacrifice': ['wi', 'vo'],
  'Admiration/Recognition-seeking': ['zh', 'vo'],
  'Pessimism/Worry': ['kk', 'ob'],
  'Emotional inhibition': ['ob', 'so'],
  'Unrelenting Standards': ['vo'],
  'Self-punitiveness': ['so']
};

// Clinical case conceptualization dynamics for elevated patterns (score >= 3.0)
const CLINICAL_DYNAMICS = [
  {
    id: 'dyn-1',
    title: 'Emotionele verwaarlozing & Verdovende Onthechting',
    schemaIds: ['Emotional deprivation'],
    modeIds: ['kk', 'oz', 'ob'],
    schemaAbbrs: ['EV (5.25)'],
    modeAbbrs: ['KK (4.10)', 'OZ (4.50)', 'OB (3.75)'],
    summary: 'Het diepe gevoel van emotionele leegte en niet gehoord of gekoesterd worden (EV: 5.25) activeert het Kwetsbare Kind (KK: 4.10). Om deze intense pijn niet te voelen treedt onmiddellijk sterke onthechting op: verdoven via afleiding of comfort-gedrag (OZ: 4.50) en een beschermende emotionele muur optrekken (OB: 3.75).'
  },
  {
    id: 'dyn-2',
    title: 'Gebrek aan Zelfcontrole & Het Ongedisciplineerde Kind',
    schemaIds: ['Insufficient self-control/self-discipline'],
    modeIds: ['ok'],
    schemaAbbrs: ['ZC (4.80)'],
    modeAbbrs: ['OK (5.00)'],
    summary: 'De hoogste modus van de cliënt is het Ongedisciplineerde Kind (OK: 5.00). Dit is een rechtstreekse expressie van het schema Gebrek aan zelfdiscipline (ZC: 4.80): moeite met grenzen stellen, lage frustratietolerantie en het ontwijken van verplichtingen of moeilijke taken door uitstelgedrag.'
  },
  {
    id: 'dyn-3',
    title: 'Prestatiedruk & De Veeleisende Interne Criticus',
    schemaIds: ['Unrelenting Standards', 'Admiration/Recognition-seeking'],
    modeIds: ['vo'],
    schemaAbbrs: ['MN (4.20)', 'EZ (4.00)'],
    modeAbbrs: ['VO (4.00)'],
    summary: 'De strenge Veeleisende Ouder (VO: 4.00) voedt en handhaaft de meedogenloze normen (MN: 4.20) en de drang naar erkenning en bevestiging (EZ: 4.00). De cliënt voelt voortdurende druk om te presteren en vreest afwijzing wanneer er niet aan deze torenhoge standaarden wordt voldaan.'
  },
  {
    id: 'dyn-4',
    title: 'Sociaal Isolement & Emotionele Geremdheid',
    schemaIds: ['Social isolation/Alienation', 'Emotional inhibition'],
    modeIds: ['ob', 'kk'],
    schemaAbbrs: ['SI (3.50)', 'EG (3.00)'],
    modeAbbrs: ['OB (3.75)', 'KK (4.10)'],
    summary: 'Het gevoel er fundamenteel niet bij te horen (SI: 3.50) en de angst om emoties te tonen (EG: 3.00) zorgen ervoor dat de Onthechte Beschermer (OB: 3.75) het contact met anderen op veilige afstand houdt. Dit voorkomt kwetsbaarheid, maar houdt het Kwetsbare Kind (KK: 4.10) geïsoleerd.'
  },
  {
    id: 'dyn-5',
    title: 'Faalangst & Kwetsbare Gevoeligheid',
    schemaIds: ['Failure to achieve'],
    modeIds: ['kk'],
    schemaAbbrs: ['ML (3.00)'],
    modeAbbrs: ['KK (4.10)'],
    summary: 'De overtuiging minder bekwaam te zijn of te falen ten opzichte van leeftijdsgenoten (ML: 3.00) raakt direct de kwetsbaarheid en onzekerheid in het Kwetsbare Kind (KK: 4.10). Dit vormt vaak de onderliggende trigger voor vermijding (OK: 5.00) of emotionele terugtrekking (OB: 3.75).'
  },
  {
    id: 'dyn-gv',
    title: 'De Regierol van de Gezonde Volwassene (Therapeutische Hefboom)',
    schemaIds: [],
    modeIds: ['gv', 'kk', 'ok', 'vo', 'oz'],
    schemaAbbrs: [],
    modeAbbrs: ['GV (3.20)', 'KK (4.10)', 'OK (5.00)', 'VO (4.00)', 'OZ (4.50)'],
    isTherapeutic: true,
    summary: 'Met een score van 3.20 bezit de cliënt al een gezond fundament. In de schematherapie fungeert de Gezonde Volwassene (GV) als regisseur om: 1) Het Kwetsbare Kind (KK: 4.10) te koesteren en veiligheid te bieden, 2) Het Ongedisciplineerde Kind (OK: 5.00) empathisch doch resoluut te begrenzen, 3) De Veeleisende Ouder (VO: 4.00) het zwijgen op te leggen en te relativeren, en 4) De Onthechte Zelfsusser (OZ: 4.50) empathisch te confronteren en verdovend gedrag te vervangen door gezonde zelfzorg.'
  }
];

const CATEGORY_COLORS = {
  // Modi
  gezond: '#34d399',
  ouder: '#f87171',
  kind: '#60a5fa',
  coping: '#facc15',

  // Schema Domeinen
  'Verbondenheid & Veiligheid': '#60a5fa',
  'Autonomie': '#34d399',
  'Realistische Grenzen': '#fb923c',
  'Zelfexpressie': '#facc15',
  'Spontaniteit & Spel': '#f87171'
};

const LIGHT_CATEGORY_COLORS = {
  // Modi
  gezond: '#a7f3d0',
  ouder: '#fecaca',
  kind: '#bfdbfe',
  coping: '#fef08a',

  // Schema Domeinen
  'Verbondenheid & Veiligheid': '#bfdbfe',
  'Autonomie': '#a7f3d0',
  'Realistische Grenzen': '#fed7aa',
  'Zelfexpressie': '#fef08a',
  'Spontaniteit & Spel': '#fecaca'
};

const DEFAULT_YSQ_SCORES = {
  'Emotional deprivation': 5.25,
  'Insufficient self-control/self-discipline': 4.8,
  'Unrelenting Standards': 4.2,
  'Admiration/Recognition-seeking': 4.0,
  'Social isolation/Alienation': 3.5,
  'Emotional inhibition': 3.0,
  'Failure to achieve': 3.0,
  'Self-punitiveness': 3.0,
  'Abandonment': 2.6,
  'Practical incompetence/Dependence': 2.6,
  'Pessimism/Worry': 2.6,
  'Vulnerability to harm/illness': 2.4,
  'Self-sacrifice': 2.4,
  'Subjugation': 2.2,
  'Mistrust': 2.0,
  'Defectiveness/unlovability': 1.6,
  'Entitlement/Superiority': 1.5,
  'Enmeshment': 1.0
};

const DEFAULT_SMI_SCORES = {
  ok: 5.0,
  oz: 4.5,
  kk: 4.1,
  vo: 4.0,
  ob: 3.75,
  gv: 3.2,
  boos_k: 2.9,
  pa: 2.67,
  wi: 2.67,
  zh: 2.56,
  so: 2.5,
  ik: 2.25,
  bk: 1.56,
  rk: 1.22
};

// 3D vector math helpers
function crossProduct(v1, v2) {
  return [
    v1[1] * v2[2] - v1[2] * v2[1],
    v1[2] * v2[0] - v1[0] * v2[2],
    v1[0] * v2[1] - v1[1] * v2[0]
  ];
}

function dot(v1, v2) {
  return v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2];
}

function normalize(v) {
  const len = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]) || 1;
  return [v[0] / len, v[1] / len, v[2] / len];
}

// 3D Projection math
function project3D(x, y, z, pitchRad, yawRad, zoom, cx, cy, d = 850) {
  const x1 = x * Math.cos(yawRad) + z * Math.sin(yawRad);
  const y1 = y;
  const z1 = -x * Math.sin(yawRad) + z * Math.cos(yawRad);

  const x2 = x1;
  const y2 = y1 * Math.cos(pitchRad) - z1 * Math.sin(pitchRad);
  const z2 = y1 * Math.sin(pitchRad) + z1 * Math.cos(pitchRad);

  const factor = d / (d + z2);
  return {
    screenX: cx + x2 * factor * zoom,
    screenY: cy + y2 * factor * zoom,
    scale: factor * zoom,
    depth: z2
  };
}

// Format score to match the report bar chart (e.g. 5.25, 4.8, 3, 1)
function formatScore(val) {
  if (val === undefined || val === null || isNaN(val)) return '';
  const num = typeof val === 'number' ? val : parseFloat(val);
  if (isNaN(num)) return '';
  return Math.round(num * 100) / 100 + '';
}

function getScoreForItem(scoresMap, item) {
  if (!scoresMap || !item) return 0;
  if (typeof item === 'string') {
    if (scoresMap[item] !== undefined) return scoresMap[item];
    const clean = item.toLowerCase().replace(/[^a-z0-9]/g, '');
    for (const [k, v] of Object.entries(scoresMap)) {
      if (k.toLowerCase().replace(/[^a-z0-9]/g, '') === clean) return v;
    }
    return 0;
  }
  if (scoresMap[item.id] !== undefined) return scoresMap[item.id];
  if (item.title && scoresMap[item.title] !== undefined) return scoresMap[item.title];
  if (item.abbr && scoresMap[item.abbr] !== undefined) return scoresMap[item.abbr];
  const cleanId = (item.id || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const cleanTitle = (item.title || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  for (const [k, v] of Object.entries(scoresMap)) {
    const cleanK = k.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (cleanK === cleanId || (cleanTitle && cleanK === cleanTitle)) return v;
  }
  return 0;
}

// Check if an array or object contains YSQ schema items
function containsSchemaData(data) {
  if (!data) return false;
  if (Array.isArray(data)) {
    return data.some(s => s && (
      SCHEMAS_INFO.some(si => si.id === s.id || si.title === s.name || si.title === s.id || si.title === s.title)
    ));
  }
  if (typeof data === 'object') {
    const keys = Object.keys(data);
    return keys.some(k => SCHEMAS_INFO.some(si => si.id === k || si.title === k));
  }
  return false;
}

// Check if an array or object contains SMI mode items
function containsModeData(data) {
  if (!data) return false;
  if (Array.isArray(data)) {
    return data.some(s => s && (
      MODES_INFO.some(mi => mi.id === s.id || mi.title === s.name || mi.title === s.id || mi.title === s.title || SMI_KEY_TO_ID[s.id] || SMI_KEY_TO_ID[s.name])
    ));
  }
  if (typeof data === 'object') {
    const keys = Object.keys(data);
    return keys.some(k => MODES_INFO.some(mi => mi.id === k || mi.title === k || SMI_KEY_TO_ID[k]));
  }
  return false;
}

// Extract scores into a standardized lookup map
function extractScoreMap(input, isMode) {
  const map = {};
  if (!input) return map;

  if (Array.isArray(input)) {
    input.forEach(s => {
      if (!s) return;
      const rawVal = s.mean !== undefined ? s.mean : (s.score !== undefined ? s.score : s.value);
      const val = parseFloat(rawVal);
      if (isNaN(val)) return;

      const rawId = s.id || s.name || s.title;
      if (!rawId) return;

      if (isMode) {
        const canonical = SMI_KEY_TO_ID[rawId] || rawId;
        map[canonical] = val;
        if (s.name) map[s.name] = val;
        if (s.title) map[s.title] = val;
      } else {
        map[rawId] = val;
        if (s.name) map[s.name] = val;
        if (s.title) map[s.title] = val;
        map[rawId.replace(/\//g, '_')] = val;
      }
    });
  } else if (typeof input === 'object') {
    Object.entries(input).forEach(([k, v]) => {
      const rawVal = typeof v === 'object' && v !== null ? (v.mean !== undefined ? v.mean : v.score) : v;
      const val = parseFloat(rawVal);
      if (isNaN(val)) return;

      if (isMode) {
        const canonical = SMI_KEY_TO_ID[k] || k;
        map[canonical] = val;
      } else {
        map[k] = val;
        map[k.replace(/\//g, '_')] = val;
      }
    });
  }
  return map;
}

function calculateYsqFromAnswers(answers) {
  if (!answers || typeof answers !== 'object' || Object.keys(answers).length === 0) return null;
  const map = {};
  let total = 0;
  Object.entries(ysqScoring).forEach(([sKey, qList]) => {
    let sum = 0;
    let count = 0;
    qList.forEach(qId => {
      if (answers[qId] !== undefined) {
        sum += Number(answers[qId]);
        count++;
      }
    });
    if (count > 0) {
      map[sKey] = Math.round((sum / count) * 100) / 100;
      total++;
    }
  });
  return total > 0 ? map : null;
}

function calculateSmiFromAnswers(answers) {
  if (!answers || typeof answers !== 'object' || Object.keys(answers).length === 0) return null;
  const map = {};
  let total = 0;
  Object.entries(smiScoring).forEach(([sKey, qList]) => {
    let sum = 0;
    let count = 0;
    qList.forEach(qId => {
      if (answers[qId] !== undefined) {
        sum += Number(answers[qId]);
        count++;
      }
    });
    if (count > 0) {
      const canonical = SMI_KEY_TO_ID[sKey] || sKey;
      map[canonical] = Math.round((sum / count) * 100) / 100;
      total++;
    }
  });
  return total > 0 ? map : null;
}

// Complete card brand color palette across all categories (Modi, Schemas, VST, Basisbehoeften)
const CARD_BRAND_COLORS = [
  '#60a5fa', // Kindmodi / Domein I Verbondenheid (Blauw)
  '#34d399', // Gezonde Volwassene & Blije Kind / Autonomie (Groen)
  '#facc15', // Copingmodi / Zelfexpressie (Geel)
  '#f87171', // Oudermodi / Spontaniteit & Spel (Rood)
  '#fb923c', // Domein III Realistische Grenzen (Oranje)
  '#a855f7', // Zelfcoherentie / VST Coherente Identiteit & Betekenisvolle Wereld (Paars)
  '#b45309', // VST Rechtvaardigheid (Warm Terracotta / Bruin)
  '#0284c7', // Kaartenset Platform (Oceaanblauw)
  '#059669', // Tafelopstelling (Smaragdgroen)
  '#ffffff'  // Witgouden Glans
];

// Huisstijl Schematherapie Suite Sparkle (losse 4-puntige diamantster uit het ThreeSparklesLogo)
const SuiteSparkle = ({ size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" fill={color} />
  </svg>
);

export default function SmiRadarGraph({ scores, ysqScores, rawAnswers, onOpenModusWeb, showAction = true, initialDimension = '3d', initialSide = 'modi' }) {
  const [activeSide, setActiveSide] = useState(initialSide); // 'modi' or 'schemas'
  const [ringOrientation, setRingOrientation] = useState('modi-inner'); // 'modi-inner' (default: modi binnen, schema's buiten) or 'schemas-inner' (klassiek: schema's binnen, modi buiten)
  const isModiInner = ringOrientation === 'modi-inner';
  const [viewDimension, setViewDimension] = useState(initialDimension); // '2d' or '3d'
  const [hoveredNode, setHoveredNode] = useState(null);
  const [popupFlipped, setPopupFlipped] = useState(false);
  const [minLinkScore, setMinLinkScore] = useState(3.0); // Cutoff threshold: limit correlation links to scores >= 3.0
  const [showClinicalNotes, setShowClinicalNotes] = useState(true);
  const [hoveredDynamicId, setHoveredDynamicId] = useState(null);
  const [showLegend, setShowLegend] = useState(false);
  const [legendFilter, setLegendFilter] = useState('all'); // 'all', 'modi', 'schemas', 'elevated'
  const [legendSearch, setLegendSearch] = useState('');

  // Active dynamic cluster hovered in the clinical notes panel
  const activeDynamic = useMemo(() => {
    return CLINICAL_DYNAMICS.find(d => d.id === hoveredDynamicId) || null;
  }, [hoveredDynamicId]);

  // Dynamic IDs that match the currently hovered node in the graph
  const matchingDynamicIds = useMemo(() => {
    if (!hoveredNode) return [];
    return CLINICAL_DYNAMICS.filter(d =>
      d.schemaIds.includes(hoveredNode.id) ||
      d.modeIds.includes(hoveredNode.id) ||
      d.modeIds.includes(SMI_KEY_TO_ID[hoveredNode.id]) ||
      (hoveredNode.id === 'boos_k' && d.modeIds.includes('wk')) ||
      (hoveredNode.id === 'wk' && d.modeIds.includes('boos_k'))
    ).map(d => d.id);
  }, [hoveredNode]);

  // Keep activeSide in sync when initialSide prop updates
  useEffect(() => {
    setActiveSide(initialSide);
  }, [initialSide]);

  // 3D Orbit Camera State
  const [pitch, setPitch] = useState(48);
  const [yaw, setYaw] = useState(28);
  const [zoom, setZoom] = useState(1.0);
  const [isDragging, setIsDragging] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [isFlipping, setIsFlipping] = useState(false);

  const lastMousePos = useRef({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const hoverTimeoutRef = useRef(null);
  const flipTimeoutRef = useRef(null);
  const animFrameRef = useRef(null);
  const sparkleTimeoutRef = useRef(null);

  // Easter Egg: Blije Kind Sparkle Regen State
  const [sparkles, setSparkles] = useState([]);
  const [showEasterEggToast, setShowEasterEggToast] = useState(false);

  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (sparkleTimeoutRef.current) clearTimeout(sparkleTimeoutRef.current);
    };
  }, []);

  // Easter egg: trigger golden sparkle rain & gentle chime when clicking Blije Kind (BK)
  const triggerSparkleRain = useCallback(() => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const notes = [523.25, 659.25, 783.99, 987.77, 1046.50, 1318.51]; // C5, E5, G5, B5, C6, E6
        notes.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.07);
          gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.07);
          gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + i * 0.07 + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + i * 0.07 + 0.85);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + i * 0.07);
          osc.stop(ctx.currentTime + i * 0.07 + 0.9);
        });
      }
    } catch (e) {
      // Audio autoplay policy fallback
    }

    const newSparkles = Array.from({ length: 65 }).map((_, i) => {
      // Mix van formaten: klein (12-22px), medium (24-38px), groot (42-60px)
      const sizeTier = Math.random();
      let size;
      if (sizeTier < 0.45) {
        size = 12 + Math.random() * 10;
      } else if (sizeTier < 0.8) {
        size = 24 + Math.random() * 14;
      } else {
        size = 42 + Math.random() * 18;
      }

      return {
        id: `sparkle-${Date.now()}-${i}-${Math.random()}`,
        left: 4 + Math.random() * 92,
        top: 6 + Math.random() * 86,
        delay: Math.random() * 1.5,
        duration: 1.2 + Math.random() * 1.1,
        size,
        color: CARD_BRAND_COLORS[i % CARD_BRAND_COLORS.length]
      };
    });

    setSparkles(newSparkles);
    setShowEasterEggToast(true);

    if (sparkleTimeoutRef.current) clearTimeout(sparkleTimeoutRef.current);
    sparkleTimeoutRef.current = setTimeout(() => {
      setSparkles([]);
      setShowEasterEggToast(false);
    }, 3800);
  }, []);

  // Smoothly rotate the 3D orbit camera so that the selected dynamic faces forward
  const rotateToDynamic = useCallback((dyn) => {
    if (!dyn) return;
    setAutoRotate(false);
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

    let angle = 0;
    if (dyn.schemaIds && dyn.schemaIds.length > 0) {
      const idx = SCHEMAS_INFO.findIndex(s => s.id === dyn.schemaIds[0]);
      if (idx !== -1) angle = -Math.PI / 2 + idx * ((2 * Math.PI) / SCHEMAS_INFO.length);
    } else if (dyn.modeIds && dyn.modeIds.length > 0) {
      const idx = MODES_INFO.findIndex(m => m.id === dyn.modeIds[0]);
      if (idx !== -1) angle = -Math.PI / 2 + idx * ((2 * Math.PI) / MODES_INFO.length);
    }

    let targetYaw = ((angle + Math.PI / 2) * 180 / Math.PI) % 360;
    if (targetYaw < 0) targetYaw += 360;

    let currentYaw = yaw % 360;
    if (currentYaw < 0) currentYaw += 360;

    let diff = targetYaw - currentYaw;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;

    const startYaw = yaw;
    const targetPitch = 48;
    const startPitch = pitch;
    const startTime = performance.now();
    const duration = 650;

    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setYaw(startYaw + diff * ease);
      setPitch(startPitch + (targetPitch - startPitch) * ease);

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(step);
      }
    };
    animFrameRef.current = requestAnimationFrame(step);
  }, [yaw, pitch]);

  // Check if there is space on the right side of the graph to display the card popup without overlapping
  const [canFitRight, setCanFitRight] = useState(() => typeof window !== 'undefined' ? window.innerWidth >= 1180 : true);

  useEffect(() => {
    const updatePlacement = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const space = window.innerWidth - rect.right;
        setCanFitRight(space >= 225);
      } else {
        setCanFitRight(window.innerWidth >= 1180);
      }
    };
    updatePlacement();
    window.addEventListener('resize', updatePlacement);
    return () => window.removeEventListener('resize', updatePlacement);
  }, []);

  useEffect(() => {
    if (hoveredNode && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const space = window.innerWidth - rect.right;
      setCanFitRight(space >= 225);
    }
  }, [hoveredNode]);

  // Normalize YSQ Schema Scores (exact scores matching report)
  const normalizedSchemaScores = useMemo(() => {
    // 1. Direct scores prop if containing schema data
    let input = null;
    if (containsSchemaData(scores)) {
      input = scores;
    } else if (containsSchemaData(ysqScores)) {
      input = ysqScores;
    } else if (initialSide === 'schemas' && scores) {
      input = scores;
    }

    let map = extractScoreMap(input, false);
    if (Object.keys(map).length > 0) return map;

    // 2. Calculate directly from ysqScores, rawAnswers, or scores if provided as question answers
    const fromYsqAnswers = calculateYsqFromAnswers(ysqScores) || 
                           calculateYsqFromAnswers(rawAnswers) || 
                           calculateYsqFromAnswers(scores);
    if (fromYsqAnswers && Object.keys(fromYsqAnswers).length > 0) return fromYsqAnswers;

    // 3. Check localStorage for completed or in-progress YSQ
    try {
      const savedCompleted = localStorage.getItem('schemaApp_completed_ysq');
      const savedProgress = localStorage.getItem('schemaApp_progress_ysq');
      const raw = savedCompleted || savedProgress;
      if (raw) {
        const answers = JSON.parse(raw);
        const fromSaved = calculateYsqFromAnswers(answers);
        if (fromSaved && Object.keys(fromSaved).length > 0) return fromSaved;
      }
    } catch (e) {
      // ignore
    }

    // 4. Default demo fallback if empty
    return DEFAULT_YSQ_SCORES;
  }, [scores, ysqScores, rawAnswers, initialSide]);

  // Normalize Modi Scores (exact scores matching report)
  const normalizedModiScores = useMemo(() => {
    // 1. Direct scores prop if containing mode data
    let input = null;
    if (containsModeData(scores)) {
      input = scores;
    } else if (initialSide === 'modi' && scores && !containsSchemaData(scores)) {
      input = scores;
    }

    let map = extractScoreMap(input, true);
    if (Object.keys(map).length > 0) return map;

    // 2. Calculate directly from scores or rawAnswers if provided as question answers
    const fromSmiAnswers = calculateSmiFromAnswers(scores) || calculateSmiFromAnswers(rawAnswers);
    if (fromSmiAnswers && Object.keys(fromSmiAnswers).length > 0) return fromSmiAnswers;

    // 3. Check localStorage for completed or in-progress SMI or modusweb scores
    try {
      const savedCompleted = localStorage.getItem('schemaApp_completed_smi');
      const savedProgress = localStorage.getItem('schemaApp_progress_smi');
      const raw = savedCompleted || savedProgress;
      if (raw) {
        const answers = JSON.parse(raw);
        const fromSaved = calculateSmiFromAnswers(answers);
        if (fromSaved && Object.keys(fromSaved).length > 0) return fromSaved;
      }

      const savedModusWebScores = localStorage.getItem('schemaApp_modusweb_scores');
      if (savedModusWebScores) {
        const parsed = JSON.parse(savedModusWebScores);
        const extracted = extractScoreMap(parsed, true);
        if (Object.keys(extracted).length > 0) return extracted;
      }
    } catch (e) {
      // ignore
    }

    // 4. Default demo fallback
    return DEFAULT_SMI_SCORES;
  }, [scores, rawAnswers, initialSide]);

  // Helper to test if an item is a theoretical link partner of the currently hovered node
  const isLinkedPartner = useCallback((item, hovered) => {
    if (!hovered || !item || hovered.id === item.id) return false;
    // When minLinkScore threshold is active, only elevate connections between items with score >= minLinkScore
    if (minLinkScore > 0 && (item.scoreVal < minLinkScore || hovered.scoreVal < minLinkScore)) return false;

    const hoveredIsSchema = hovered.itemType === 'schema' || hovered.domain !== undefined;
    const itemIsMode = item.itemType === 'mode' || item.category !== undefined;

    if (hoveredIsSchema && itemIsMode) {
      const targets = SCHEMA_TO_MODI_MAP[hovered.id] || [];
      const itemCanonical = SMI_KEY_TO_ID[item.id] || item.id;
      return targets.some(t => t === item.id || t === itemCanonical || (item.id === 'boos_k' && t === 'wk') || (item.id === 'wk' && t === 'boos_k'));
    }

    const hoveredIsMode = hovered.itemType === 'mode' || hovered.category !== undefined;
    const itemIsSchema = item.itemType === 'schema' || item.domain !== undefined;
    if (hoveredIsMode && itemIsSchema) {
      const targets = SCHEMA_TO_MODI_MAP[item.id] || [];
      const hoveredCanonical = SMI_KEY_TO_ID[hovered.id] || hovered.id;
      return targets.some(t => t === hovered.id || t === hoveredCanonical || (hovered.id === 'boos_k' && t === 'wk') || (hovered.id === 'wk' && t === 'boos_k'));
    }
    return false;
  }, [minLinkScore]);

  // Card details helper with exact score included
  const getCardDetails = useCallback((item, side) => {
    if (!item) return null;

    let resolved = item;
    if (typeof item === 'string') {
      resolved = MODES_INFO.find(x => x.id === item || x.title === item || x.abbr === item)
              || SCHEMAS_INFO.find(x => x.id === item || x.title === item || x.abbr === item);
    }

    const isMode = (item && item.itemType === 'mode') || (resolved && resolved.category !== undefined) || (side === 'modi');
    const currentScoresMap = isMode ? normalizedModiScores : normalizedSchemaScores;
    const scoreVal = getScoreForItem(currentScoresMap, resolved || item);

    if (!resolved) {
      return {
        id: item,
        type: isMode ? 'mode' : 'schema',
        title: item,
        description: schemaDescriptions[item] || '',
        src: isMode ? getModeImage(item) : getSchemaImage(item),
        color: getCardColor(isMode ? 'mode' : 'schema', item, item),
        scoreVal
      };
    }

    if (isMode) {
      const canonicalId = resolved.id === 'boos_k' ? 'wk' : resolved.id;
      const title = resolved.title;
      const src = getModeImage(canonicalId);
      const description = schemaDescriptions[title] || '';
      const color = getCardColor('mode', canonicalId, title);

      return {
        id: canonicalId,
        type: 'mode',
        title,
        description,
        src,
        color,
        scoreVal,
        imageStyle: { transform: 'scale(1.1)' }
      };
    } else {
      const id = resolved.id;
      const title = resolved.title;
      const src = getSchemaImage(id);
      const description = schemaDescriptions[title] || schemaDescriptions[id] || '';
      const color = getCardColor('schema', id, title);

      return {
        id,
        type: 'schema',
        title,
        description,
        src,
        color,
        scoreVal,
        imageStyle: {
          transform: title === 'Kwetsbaarheid voor ziekte en gevaar' ? 'scale(1.4)' : 'scale(1)'
        }
      };
    }
  }, [normalizedModiScores, normalizedSchemaScores]);

  const activeCardDetails = useMemo(() => {
    if (!hoveredNode) return null;
    const side = (hoveredNode.itemType === 'mode' || hoveredNode.category !== undefined) ? 'modi' : (hoveredNode.itemType === 'schema' || hoveredNode.domain !== undefined ? 'schemas' : activeSide);
    return getCardDetails(hoveredNode, side);
  }, [hoveredNode, activeSide, getCardDetails]);

  const handleNodeHover = useCallback((nodeItem) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    if (flipTimeoutRef.current) {
      clearTimeout(flipTimeoutRef.current);
      flipTimeoutRef.current = null;
    }
    setHoveredNode(nodeItem);
    setPopupFlipped(false);

    // Auto-flip to theorie after 2.2 seconds of hovering
    flipTimeoutRef.current = setTimeout(() => {
      setPopupFlipped(true);
    }, 2200);
  }, []);

  const handleNodeLeave = useCallback(() => {
    if (flipTimeoutRef.current) {
      clearTimeout(flipTimeoutRef.current);
      flipTimeoutRef.current = null;
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredNode(null);
      setPopupFlipped(false);
    }, 250);
  }, []);

  const handleCardMouseEnter = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  }, []);

  const handleCardMouseLeave = useCallback(() => {
    if (flipTimeoutRef.current) {
      clearTimeout(flipTimeoutRef.current);
      flipTimeoutRef.current = null;
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredNode(null);
      setPopupFlipped(false);
    }, 200);
  }, []);

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
      if (flipTimeoutRef.current) clearTimeout(flipTimeoutRef.current);
    };
  }, []);

  // Active items based on current side
  const currentItems = activeSide === 'both' ? [...SCHEMAS_INFO, ...MODES_INFO] : (activeSide === 'modi' ? MODES_INFO : SCHEMAS_INFO);
  const isCopingOrDomain = (item) => {
    if (!item) return false;
    if (item.category) return item.category === 'coping';
    return item.domain === 'Zelfexpressie' || item.domain === 'Realistische Grenzen';
  };

  // Auto-rotation loop
  useEffect(() => {
    if (!autoRotate || viewDimension !== '3d' || isDragging || isFlipping) return;
    let animId;
    const step = () => {
      setYaw(prev => (prev + 0.35) % 360);
      animId = requestAnimationFrame(step);
    };
    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [autoRotate, viewDimension, isDragging, isFlipping]);

  // Smooth Coin Flip Animation (180 degree rotation)
  const flipCoin = useCallback(() => {
    if (isFlipping) return;
    setIsFlipping(true);
    setAutoRotate(false);

    const startYaw = yaw;
    const startTime = performance.now();
    const duration = 650;
    const nextSide = activeSide === 'modi' ? 'schemas' : (activeSide === 'schemas' ? 'modi' : 'both');

    let switched = false;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease in-out cubic
      const ease = progress < 0.5 
        ? 4 * progress * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      setYaw((startYaw + 180 * ease) % 360);

      // Switch data at the 90 degree edge point (only when switching single sides)
      if (progress >= 0.5 && !switched) {
        if (nextSide !== 'both') {
          setActiveSide(nextSide);
        }
        switched = true;
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsFlipping(false);
      }
    };

    requestAnimationFrame(animate);
  }, [isFlipping, yaw, activeSide]);

  // Mouse drag handlers for 3D orbit
  const handleMouseDown = useCallback((e) => {
    if (viewDimension !== '3d') return;
    setIsDragging(true);
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  }, [viewDimension]);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging || viewDimension !== '3d') return;
    const deltaX = e.clientX - lastMousePos.current.x;
    const deltaY = e.clientY - lastMousePos.current.y;
    lastMousePos.current = { x: e.clientX, y: e.clientY };

    setYaw(prev => (prev + deltaX * 0.5) % 360);
    setPitch(prev => Math.max(12, Math.min(85, prev + deltaY * 0.4)));
  }, [isDragging, viewDimension]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Touch handlers
  const handleTouchStart = useCallback((e) => {
    if (viewDimension !== '3d' || e.touches.length !== 1) return;
    setIsDragging(true);
    lastMousePos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, [viewDimension]);

  const handleTouchMove = useCallback((e) => {
    if (!isDragging || viewDimension !== '3d' || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - lastMousePos.current.x;
    const deltaY = e.touches[0].clientY - lastMousePos.current.y;
    lastMousePos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };

    setYaw(prev => (prev + deltaX * 0.6) % 360);
    setPitch(prev => Math.max(12, Math.min(85, prev + deltaY * 0.5)));
  }, [isDragging, viewDimension]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleOpenModusWeb = () => {
    if (rawAnswers && Object.keys(rawAnswers).length > 0) {
      localStorage.setItem('schemaApp_modusweb_smi', JSON.stringify(rawAnswers));
    }
    if (normalizedModiScores && Object.keys(normalizedModiScores).length > 0) {
      localStorage.setItem('schemaApp_modusweb_scores', JSON.stringify(normalizedModiScores));
    }
    localStorage.setItem('schemaApp_modusweb_initial_view', 'network');

    if (onOpenModusWeb) {
      onOpenModusWeb();
    } else {
      window.location.href = 'modusweb.html';
    }
  };

  // Dimensions & Projection constants
  const size = 680;
  const cx = size / 2;
  const cy = size / 2 + 15;

  const pitchRad = (pitch * Math.PI) / 180;
  const yawRad = (yaw * Math.PI) / 180;

  // 1. Calculate 3D points for Schemas (Outer or Inner ring in dual mode, or full ring in single mode)
  const schemaItems3D = useMemo(() => {
    const n = SCHEMAS_INFO.length; // 18
    const isDual = activeSide === 'both';
    const isOuter = isDual && isModiInner;
    const rBase = 192;
    const rSpan = 56;
    const rMaxInner = 110;
    const rMaxSingle = 180;
    const rBall = isDual ? (isOuter ? 282 : 160) : 252;
    const elevFactor = isDual ? (isOuter ? 26 : 18) : 25;
    const baseRadius = isDual ? (isOuter ? 18.5 : 13.5) : 18;

    return SCHEMAS_INFO.map((item, idx) => {
      const angle = -Math.PI / 2 + idx * ((2 * Math.PI) / n);
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);

      const scoreVal = getScoreForItem(normalizedSchemaScores, item);
      const ratio = Math.min(Math.max(scoreVal / 6, 0.08), 1);

      const elevation = scoreVal * elevFactor;
      const peakRadius = isDual
        ? (isOuter ? (rBase + ratio * rSpan) : (rMaxInner * ratio))
        : (rMaxSingle * ratio);
      const peakX = peakRadius * cosA;
      const peakZ = peakRadius * sinA;
      const peakY = -elevation;

      const groundX = peakRadius * cosA;
      const groundZ = peakRadius * sinA;

      const baseFloorX = (isDual && isOuter ? rBase : 0) * cosA;
      const baseFloorZ = (isDual && isOuter ? rBase : 0) * sinA;

      const ballX = rBall * cosA;
      const ballZ = rBall * sinA;
      const ballY = -(scoreVal * (isDual && !isOuter ? 7 : 10));

      const projPeak = project3D(peakX, peakY, peakZ, pitchRad, yawRad, zoom, cx, cy);
      const projGround = project3D(groundX, 0, groundZ, pitchRad, yawRad, zoom, cx, cy);
      const projBaseFloor = project3D(baseFloorX, 0, baseFloorZ, pitchRad, yawRad, zoom, cx, cy);
      const projBall = project3D(ballX, ballY, ballZ, pitchRad, yawRad, zoom, cx, cy);

      const scale = scoreVal === 0 ? 0.7 : 0.6 + scoreVal * 0.25;
      const ballRadius = Math.max(isDual && !isOuter ? 11 : 13, baseRadius * scale * (viewDimension === '3d' ? projBall.scale : 1));

      const categoryKey = item.domain;
      const bg = scoreVal < 3.0 ? LIGHT_CATEGORY_COLORS[categoryKey] : CATEGORY_COLORS[categoryKey];
      const textColor = (scoreVal < 3.0 || isCopingOrDomain(item)) ? '#451a03' : '#ffffff';

      return {
        ...item,
        itemType: 'schema',
        scoreVal,
        angle,
        cosA,
        sinA,
        peakX,
        peakY,
        peakZ,
        groundX,
        groundZ,
        baseFloorX,
        baseFloorZ,
        ballX,
        ballZ,
        projPeak,
        projGround,
        projBaseFloor,
        projBall,
        ballRadius,
        bg,
        textColor,
        elevation
      };
    });
  }, [normalizedSchemaScores, activeSide, isModiInner, pitchRad, yawRad, zoom, cx, cy, viewDimension]);

  // 2. Calculate 3D points for Modi (Inner or Outer ring in dual mode, or full ring in single mode)
  const modiItems3D = useMemo(() => {
    const n = MODES_INFO.length; // 14
    const isDual = activeSide === 'both';
    const isOuter = isDual && !isModiInner;
    const rBase = 192;
    const rSpan = 56;
    const rMaxInner = 110;
    const rMaxSingle = 180;
    const rBall = isDual ? (isOuter ? 282 : 160) : 252;
    const elevFactor = isDual ? (isOuter ? 26 : 18) : 25;
    const baseRadius = isDual ? (isOuter ? 19.5 : 14) : 21;

    return MODES_INFO.map((item, idx) => {
      const angle = -Math.PI / 2 + idx * ((2 * Math.PI) / n);
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);

      const scoreVal = getScoreForItem(normalizedModiScores, item);
      const ratio = Math.min(Math.max(scoreVal / 6, 0.08), 1);

      const elevation = scoreVal * elevFactor;
      const peakRadius = isDual
        ? (isOuter ? (rBase + ratio * rSpan) : (rMaxInner * ratio))
        : (rMaxSingle * ratio);
      const peakX = peakRadius * cosA;
      const peakZ = peakRadius * sinA;
      const peakY = -elevation;

      const groundX = peakRadius * cosA;
      const groundZ = peakRadius * sinA;

      const baseFloorX = (isDual && isOuter ? rBase : 0) * cosA;
      const baseFloorZ = (isDual && isOuter ? rBase : 0) * sinA;

      const ballX = rBall * cosA;
      const ballZ = rBall * sinA;
      const ballY = -(scoreVal * (isDual && !isOuter ? 7 : 10));

      const projPeak = project3D(peakX, peakY, peakZ, pitchRad, yawRad, zoom, cx, cy);
      const projGround = project3D(groundX, 0, groundZ, pitchRad, yawRad, zoom, cx, cy);
      const projBaseFloor = project3D(baseFloorX, 0, baseFloorZ, pitchRad, yawRad, zoom, cx, cy);
      const projBall = project3D(ballX, ballY, ballZ, pitchRad, yawRad, zoom, cx, cy);

      const scale = scoreVal === 0 ? 0.7 : 0.6 + scoreVal * 0.25;
      const ballRadius = Math.max(isDual && !isOuter ? 11 : 13, baseRadius * scale * (viewDimension === '3d' ? projBall.scale : 1));

      const categoryKey = item.category;
      const bg = scoreVal < 3.0 ? LIGHT_CATEGORY_COLORS[categoryKey] : CATEGORY_COLORS[categoryKey];
      const textColor = (scoreVal < 3.0 || isCopingOrDomain(item)) ? '#451a03' : '#ffffff';

      return {
        ...item,
        itemType: 'mode',
        scoreVal,
        angle,
        cosA,
        sinA,
        peakX,
        peakY,
        peakZ,
        groundX,
        groundZ,
        baseFloorX,
        baseFloorZ,
        ballX,
        ballZ,
        projPeak,
        projGround,
        projBaseFloor,
        projBall,
        ballRadius,
        bg,
        textColor,
        elevation
      };
    });
  }, [normalizedModiScores, activeSide, isModiInner, pitchRad, yawRad, zoom, cx, cy, viewDimension]);

  // Combined 3D items for active side
  const items3D = useMemo(() => {
    if (activeSide === 'both') {
      return [...schemaItems3D, ...modiItems3D];
    }
    return activeSide === 'modi' ? modiItems3D : schemaItems3D;
  }, [activeSide, schemaItems3D, modiItems3D]);

  // 3. Facets calculation (Combined crystal canopies according to ringOrientation)
  const { facets, projApexSchema, projApexModi } = useMemo(() => {
    const lightDir = normalize([0.4, -0.9, 0.45]);
    const facetList = [];

    // Inner Canopy (central peak apex)
    const innerItems = activeSide === 'both'
      ? (isModiInner ? modiItems3D : schemaItems3D)
      : (activeSide === 'modi' ? modiItems3D : schemaItems3D);
    const innerColor = activeSide === 'both'
      ? (isModiInner ? '59, 130, 246' : '16, 185, 129')
      : (activeSide === 'modi' ? '59, 130, 246' : '16, 185, 129');
    const innerType = activeSide === 'both'
      ? (isModiInner ? 'modi' : 'schema')
      : (activeSide === 'modi' ? 'modi' : 'schema');

    let pApex = null;
    if (activeSide === 'both' || activeSide === 'modi' || activeSide === 'schemas') {
      const nInner = innerItems.length;
      const avgElev = innerItems.reduce((sum, m) => sum + m.elevation, 0) / nInner;
      const apexHeight = -(avgElev * 1.15 + (activeSide === 'both' ? 14 : 15));
      pApex = project3D(0, apexHeight, 0, pitchRad, yawRad, zoom, cx, cy);

      for (let i = 0; i < nInner; i++) {
        const nextIdx = (i + 1) % nInner;
        const m1 = innerItems[i];
        const m2 = innerItems[nextIdx];

        const v1 = [m1.peakX, m1.peakY - apexHeight, m1.peakZ];
        const v2 = [m2.peakX, m2.peakY - apexHeight, m2.peakZ];
        const norm = normalize(crossProduct(v1, v2));

        const lightDot = Math.abs(dot(norm, lightDir));
        const intensity = Math.max(0.18, Math.min(0.85, lightDot * 0.6 + 0.25));
        const avgDepth = (pApex.depth + m1.projPeak.depth + m2.projPeak.depth) / 3;

        facetList.push({
          pts: `${pApex.screenX.toFixed(1)},${pApex.screenY.toFixed(1)} ${m1.projPeak.screenX.toFixed(1)},${m1.projPeak.screenY.toFixed(1)} ${m2.projPeak.screenX.toFixed(1)},${m2.projPeak.screenY.toFixed(1)}`,
          intensity,
          avgDepth,
          idx: `${innerType}-${i}`,
          color: innerColor
        });
      }
    }

    // Outer Ridge in dual mode (surrounding caldera mountain ridge)
    if (activeSide === 'both') {
      const outerItems = isModiInner ? schemaItems3D : modiItems3D;
      const outerColor = isModiInner ? '16, 185, 129' : '59, 130, 246';
      const outerType = isModiInner ? 'schema' : 'modi';
      const nOuter = outerItems.length;

      for (let i = 0; i < nOuter; i++) {
        const nextIdx = (i + 1) % nOuter;
        const m1 = outerItems[i];
        const m2 = outerItems[nextIdx];

        // Triangle 1: Base1 -> Peak1 -> Peak2
        const v1 = [m1.peakX - m1.baseFloorX, m1.peakY, m1.peakZ - m1.baseFloorZ];
        const v2 = [m2.peakX - m1.baseFloorX, m2.peakY, m2.peakZ - m1.baseFloorZ];
        const norm1 = normalize(crossProduct(v1, v2));
        const lightDot1 = Math.abs(dot(norm1, lightDir));
        const intensity1 = Math.max(0.16, Math.min(0.80, lightDot1 * 0.55 + 0.22));
        const avgDepth1 = (m1.projBaseFloor.depth + m1.projPeak.depth + m2.projPeak.depth) / 3;

        facetList.push({
          pts: `${m1.projBaseFloor.screenX.toFixed(1)},${m1.projBaseFloor.screenY.toFixed(1)} ${m1.projPeak.screenX.toFixed(1)},${m1.projPeak.screenY.toFixed(1)} ${m2.projPeak.screenX.toFixed(1)},${m2.projPeak.screenY.toFixed(1)}`,
          intensity: intensity1,
          avgDepth: avgDepth1,
          idx: `${outerType}-a-${i}`,
          color: outerColor
        });

        // Triangle 2: Base1 -> Peak2 -> Base2
        const v3 = [m2.peakX - m1.baseFloorX, m2.peakY, m2.peakZ - m1.baseFloorZ];
        const v4 = [m2.baseFloorX - m1.baseFloorX, 0, m2.baseFloorZ - m1.baseFloorZ];
        const norm2 = normalize(crossProduct(v3, v4));
        const lightDot2 = Math.abs(dot(norm2, lightDir));
        const intensity2 = Math.max(0.14, Math.min(0.75, lightDot2 * 0.55 + 0.20));
        const avgDepth2 = (m1.projBaseFloor.depth + m2.projPeak.depth + m2.projBaseFloor.depth) / 3;

        facetList.push({
          pts: `${m1.projBaseFloor.screenX.toFixed(1)},${m1.projBaseFloor.screenY.toFixed(1)} ${m2.projPeak.screenX.toFixed(1)},${m2.projPeak.screenY.toFixed(1)} ${m2.projBaseFloor.screenX.toFixed(1)},${m2.projBaseFloor.screenY.toFixed(1)}`,
          intensity: intensity2,
          avgDepth: avgDepth2,
          idx: `${outerType}-b-${i}`,
          color: outerColor
        });
      }
    }

    facetList.sort((a, b) => b.avgDepth - a.avgDepth);

    return {
      facets: facetList,
      projApexSchema: (activeSide === 'schemas' || (activeSide === 'both' && !isModiInner)) ? pApex : null,
      projApexModi: (activeSide === 'modi' || (activeSide === 'both' && isModiInner)) ? pApex : null
    };
  }, [activeSide, schemaItems3D, modiItems3D, isModiInner, pitchRad, yawRad, zoom, cx, cy]);

  // 4. Concentric 3D Floor Grid Polygons
  const floorGridRings = useMemo(() => {
    if (activeSide === 'both') {
      const innerTargetItems = isModiInner ? modiItems3D : schemaItems3D;
      const outerTargetItems = isModiInner ? schemaItems3D : modiItems3D;

      // Inner Grid (levels 2, 4, 6)
      const innerRings = [2, 4, 6].map(lvl => {
        const r = 110 * (lvl / 6);
        const pts = [];
        const n = innerTargetItems.length;
        for (let i = 0; i < n; i++) {
          const angle = -Math.PI / 2 + i * ((2 * Math.PI) / n);
          const p = project3D(r * Math.cos(angle), 0, r * Math.sin(angle), pitchRad, yawRad, zoom, cx, cy);
          pts.push(`${p.screenX.toFixed(1)},${p.screenY.toFixed(1)}`);
        }
        return { key: `inner-${lvl}`, lvl, pts: pts.join(' '), color: '#cbd5e1' };
      });

      // Outer Grid (levels 2, 4, 6)
      const outerRings = [2, 4, 6].map(lvl => {
        const r = 192 + (lvl / 6) * 56;
        const pts = [];
        const n = outerTargetItems.length;
        for (let i = 0; i < n; i++) {
          const angle = -Math.PI / 2 + i * ((2 * Math.PI) / n);
          const p = project3D(r * Math.cos(angle), 0, r * Math.sin(angle), pitchRad, yawRad, zoom, cx, cy);
          pts.push(`${p.screenX.toFixed(1)},${p.screenY.toFixed(1)}`);
        }
        return { key: `outer-${lvl}`, lvl, pts: pts.join(' '), color: '#e2e8f0' };
      });

      return [...innerRings, ...outerRings];
    }

    // Single mode grid
    const targetItems = activeSide === 'modi' ? modiItems3D : schemaItems3D;
    const n = targetItems.length;
    return [2, 4, 6].map(lvl => {
      const r = 180 * (lvl / 6);
      const pts = [];
      for (let i = 0; i < n; i++) {
        const angle = -Math.PI / 2 + i * ((2 * Math.PI) / n);
        const p = project3D(r * Math.cos(angle), 0, r * Math.sin(angle), pitchRad, yawRad, zoom, cx, cy);
        pts.push(`${p.screenX.toFixed(1)},${p.screenY.toFixed(1)}`);
      }
      return { key: `single-${lvl}`, lvl, pts: pts.join(' '), color: '#e2e8f0' };
    });
  }, [activeSide, schemaItems3D, modiItems3D, isModiInner, pitchRad, yawRad, zoom, cx, cy]);

  // 3D Demarcation Ring between inner Schemas and outer Modi in dual mode
  const dividerRing3D = useMemo(() => {
    if (activeSide !== 'both') return null;
    const pts = [];
    const segments = 36;
    for (let i = 0; i <= segments; i++) {
      const angle = (i * 2 * Math.PI) / segments;
      const p = project3D(176 * Math.cos(angle), 0, 176 * Math.sin(angle), pitchRad, yawRad, zoom, cx, cy);
      pts.push(`${p.screenX.toFixed(1)},${p.screenY.toFixed(1)}`);
    }
    return pts.join(' ');
  }, [activeSide, pitchRad, yawRad, zoom, cx, cy]);

  const projCenter = useMemo(() => project3D(0, 0, 0, pitchRad, yawRad, zoom, cx, cy), [pitchRad, yawRad, zoom, cx, cy]);

  const floorShadowPointsSchema = useMemo(() => schemaItems3D.map(m => `${m.projGround.screenX.toFixed(1)},${m.projGround.screenY.toFixed(1)}`).join(' '), [schemaItems3D]);
  const floorShadowPointsModi = useMemo(() => modiItems3D.map(m => `${m.projGround.screenX.toFixed(1)},${m.projGround.screenY.toFixed(1)}`).join(' '), [modiItems3D]);

  const schemaPeakPolygonPoints = useMemo(() => schemaItems3D.map(m => `${m.projPeak.screenX.toFixed(1)},${m.projPeak.screenY.toFixed(1)}`).join(' '), [schemaItems3D]);
  const modiPeakPolygonPoints = useMemo(() => modiItems3D.map(m => `${m.projPeak.screenX.toFixed(1)},${m.projPeak.screenY.toFixed(1)}`).join(' '), [modiItems3D]);

  // 5. 3D Correlation Links between Schemas and Modi (Dual Mode)
  const correlationLinks3D = useMemo(() => {
    if (activeSide !== 'both') return [];
    const links = [];

    schemaItems3D.forEach(schema => {
      // Threshold check on schema
      if (minLinkScore > 0 && schema.scoreVal < minLinkScore) return;

      const targets = SCHEMA_TO_MODI_MAP[schema.id] || [];
      targets.forEach(targetId => {
        const mode = modiItems3D.find(m => m.id === targetId || SMI_KEY_TO_ID[m.id] === targetId || (m.id === 'boos_k' && targetId === 'wk') || (m.id === 'wk' && targetId === 'boos_k'));
        if (mode) {
          // Threshold check on mode
          if (minLinkScore > 0 && mode.scoreVal < minLinkScore) return;

          const isSchemaHovered = hoveredNode && (hoveredNode.id === schema.id || hoveredNode.abbr === schema.abbr);
          const isModeHovered = hoveredNode && (hoveredNode.id === mode.id || hoveredNode.abbr === mode.abbr || SMI_KEY_TO_ID[hoveredNode.id] === mode.id);
          
          const isDynamicHighlighted = activeDynamic && activeDynamic.schemaIds.includes(schema.id) && (
            activeDynamic.modeIds.includes(mode.id) ||
            activeDynamic.modeIds.includes(SMI_KEY_TO_ID[mode.id]) ||
            (mode.id === 'boos_k' && activeDynamic.modeIds.includes('wk')) ||
            (mode.id === 'wk' && activeDynamic.modeIds.includes('boos_k'))
          );

          const isHighlighted = isSchemaHovered || isModeHovered || isDynamicHighlighted;
          const isDimmed = (hoveredNode || activeDynamic) && !isHighlighted;

          links.push({
            key: `${schema.id}-${mode.id}`,
            schema,
            mode,
            isHighlighted,
            isDimmed,
            x1: schema.projBall.screenX,
            y1: schema.projBall.screenY,
            x2: mode.projBall.screenX,
            y2: mode.projBall.screenY,
            depth: (schema.projBall.depth + mode.projBall.depth) / 2
          });
        }
      });
    });

    return links.sort((a, b) => {
      if (a.isHighlighted && !b.isHighlighted) return 1;
      if (!a.isHighlighted && b.isHighlighted) return -1;
      return b.depth - a.depth;
    });
  }, [activeSide, schemaItems3D, modiItems3D, hoveredNode, activeDynamic, minLinkScore]);

  // 5b. 3D Therapeutic Intervention Vectors from Gezonde Volwassene (GV)
  const therapeuticLinks3D = useMemo(() => {
    if (activeSide !== 'both' && activeSide !== 'modi') return [];
    const gv = modiItems3D.find(m => m.id === 'gv');
    if (!gv) return [];

    const targets = [
      { id: 'kk', label: 'Koesteren & Geruststellen', color: '#10b981' },
      { id: 'ok', label: 'Begrenzen & Structureren', color: '#10b981' },
      { id: 'vo', label: 'Kritiek begrenzen & Relativeren', color: '#10b981' },
      { id: 'oz', label: 'Verdoving doorbreken & Gezonde zelfzorg', color: '#10b981' }
    ];

    return targets.map(t => {
      const targetMode = modiItems3D.find(m => m.id === t.id);
      if (!targetMode) return null;
      const isHighlighted = (activeDynamic && activeDynamic.id === 'dyn-gv') || 
                            (hoveredNode && (hoveredNode.id === 'gv' || hoveredNode.id === t.id));
      return {
        key: `gv-${t.id}`,
        targetId: t.id,
        x1: gv.projBall.screenX,
        y1: gv.projBall.screenY,
        x2: targetMode.projBall.screenX,
        y2: targetMode.projBall.screenY,
        label: t.label,
        color: t.color,
        isHighlighted,
        depth: (gv.projBall.depth + targetMode.projBall.depth) / 2
      };
    }).filter(Boolean);
  }, [activeSide, modiItems3D, activeDynamic, hoveredNode]);

  // 6. Depth-Sorted Balls (Painter's algorithm for complete 3D scene)
  const depthSortedBalls = useMemo(() => {
    return [...items3D].sort((a, b) => b.projBall.depth - a.projBall.depth);
  }, [items3D]);

  // 7. 2D Classic Static Data (Dual Concentric & Single according to ringOrientation)
  const schemaItems2D = useMemo(() => {
    const n = SCHEMAS_INFO.length;
    const isDual = activeSide === 'both';
    const isOuter = isDual && isModiInner;
    const rBase = 192;
    const rSpan = 56;
    const rMaxInner = 110;
    const rMaxSingle = 180;
    const rBall = isDual ? (isOuter ? 282 : 160) : 252;
    const baseRadius = isDual ? (isOuter ? 18.5 : 13.5) : 18;

    return SCHEMAS_INFO.map((item, idx) => {
      const angle = -Math.PI / 2 + idx * ((2 * Math.PI) / n);
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);
      const ballX = cx + rBall * cosA;
      const ballY = cy + rBall * sinA;

      const scoreVal = getScoreForItem(normalizedSchemaScores, item);
      const ratio = Math.min(Math.max(scoreVal / 6, 0), 1);
      const ptRadius = isDual
        ? (isOuter ? (rBase + ratio * rSpan) : (rMaxInner * ratio))
        : (rMaxSingle * ratio);
      const ptX = cx + ptRadius * cosA;
      const ptY = cy + ptRadius * sinA;

      const scale = scoreVal === 0 ? 0.7 : 0.6 + scoreVal * 0.25;
      const ballRadius = Math.max(isDual && !isOuter ? 11 : 13, baseRadius * scale);

      const categoryKey = item.domain;
      const bg = scoreVal < 3.0 ? LIGHT_CATEGORY_COLORS[categoryKey] : CATEGORY_COLORS[categoryKey];
      const textColor = (scoreVal < 3.0 || isCopingOrDomain(item)) ? '#451a03' : '#ffffff';

      return { ...item, itemType: 'schema', scoreVal, ballX, ballY, ptX, ptY, ballRadius, bg, textColor, cosA, sinA };
    });
  }, [normalizedSchemaScores, activeSide, isModiInner, cx, cy]);

  const modiItems2D = useMemo(() => {
    const n = MODES_INFO.length;
    const isDual = activeSide === 'both';
    const isOuter = isDual && !isModiInner;
    const rBase = 192;
    const rSpan = 56;
    const rMaxInner = 110;
    const rMaxSingle = 180;
    const rBall = isDual ? (isOuter ? 282 : 160) : 252;
    const baseRadius = isDual ? (isOuter ? 19.5 : 14) : 21;

    return MODES_INFO.map((item, idx) => {
      const angle = -Math.PI / 2 + idx * ((2 * Math.PI) / n);
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);
      const ballX = cx + rBall * cosA;
      const ballY = cy + rBall * sinA;

      const scoreVal = getScoreForItem(normalizedModiScores, item);
      const ratio = Math.min(Math.max(scoreVal / 6, 0), 1);
      const ptRadius = isDual
        ? (isOuter ? (rBase + ratio * rSpan) : (rMaxInner * ratio))
        : (rMaxSingle * ratio);
      const ptX = cx + ptRadius * cosA;
      const ptY = cy + ptRadius * sinA;

      const scale = scoreVal === 0 ? 0.7 : 0.6 + scoreVal * 0.25;
      const ballRadius = Math.max(isDual && !isOuter ? 11 : 13, baseRadius * scale);

      const categoryKey = item.category;
      const bg = scoreVal < 3.0 ? LIGHT_CATEGORY_COLORS[categoryKey] : CATEGORY_COLORS[categoryKey];
      const textColor = (scoreVal < 3.0 || isCopingOrDomain(item)) ? '#451a03' : '#ffffff';

      return { ...item, itemType: 'mode', scoreVal, ballX, ballY, ptX, ptY, ballRadius, bg, textColor, cosA, sinA };
    });
  }, [normalizedModiScores, activeSide, isModiInner, cx, cy]);

  const items2D = useMemo(() => {
    if (activeSide === 'both') {
      return [...schemaItems2D, ...modiItems2D];
    }
    return activeSide === 'modi' ? modiItems2D : schemaItems2D;
  }, [activeSide, schemaItems2D, modiItems2D]);

  const correlationLinks2D = useMemo(() => {
    if (activeSide !== 'both') return [];
    const links = [];
    schemaItems2D.forEach(schema => {
      if (minLinkScore > 0 && schema.scoreVal < minLinkScore) return;

      const targets = SCHEMA_TO_MODI_MAP[schema.id] || [];
      targets.forEach(targetId => {
        const mode = modiItems2D.find(m => m.id === targetId || SMI_KEY_TO_ID[m.id] === targetId || (m.id === 'boos_k' && targetId === 'wk') || (m.id === 'wk' && targetId === 'boos_k'));
        if (mode) {
          if (minLinkScore > 0 && mode.scoreVal < minLinkScore) return;

          const isSchemaHovered = hoveredNode && (hoveredNode.id === schema.id || hoveredNode.abbr === schema.abbr);
          const isModeHovered = hoveredNode && (hoveredNode.id === mode.id || hoveredNode.abbr === mode.abbr || SMI_KEY_TO_ID[hoveredNode.id] === mode.id);
          
          const isDynamicHighlighted = activeDynamic && activeDynamic.schemaIds.includes(schema.id) && (
            activeDynamic.modeIds.includes(mode.id) ||
            activeDynamic.modeIds.includes(SMI_KEY_TO_ID[mode.id]) ||
            (mode.id === 'boos_k' && activeDynamic.modeIds.includes('wk')) ||
            (mode.id === 'wk' && activeDynamic.modeIds.includes('boos_k'))
          );

          const isHighlighted = isSchemaHovered || isModeHovered || isDynamicHighlighted;
          const isDimmed = (hoveredNode || activeDynamic) && !isHighlighted;

          links.push({
            key: `2d-${schema.id}-${mode.id}`,
            schema,
            mode,
            isHighlighted,
            isDimmed,
            x1: schema.ballX,
            y1: schema.ballY,
            x2: mode.ballX,
            y2: mode.ballY
          });
        }
      });
    });

    return links.sort((a, b) => (a.isHighlighted ? 1 : 0) - (b.isHighlighted ? 1 : 0));
  }, [activeSide, schemaItems2D, modiItems2D, hoveredNode, activeDynamic, minLinkScore]);

  // 7b. 2D Therapeutic Intervention Vectors from Gezonde Volwassene (GV)
  const therapeuticLinks2D = useMemo(() => {
    if (activeSide !== 'both' && activeSide !== 'modi') return [];
    const gv = modiItems2D.find(m => m.id === 'gv');
    if (!gv) return [];

    const targets = [
      { id: 'kk', label: 'Koesteren & Geruststellen', color: '#10b981' },
      { id: 'ok', label: 'Begrenzen & Structureren', color: '#10b981' },
      { id: 'vo', label: 'Kritiek begrenzen & Relativeren', color: '#10b981' },
      { id: 'oz', label: 'Verdoving doorbreken & Gezonde zelfzorg', color: '#10b981' }
    ];

    return targets.map(t => {
      const targetMode = modiItems2D.find(m => m.id === t.id);
      if (!targetMode) return null;
      const isHighlighted = (activeDynamic && activeDynamic.id === 'dyn-gv') || 
                            (hoveredNode && (hoveredNode.id === 'gv' || hoveredNode.id === t.id));
      return {
        key: `2d-gv-${t.id}`,
        targetId: t.id,
        x1: gv.ballX,
        y1: gv.ballY,
        x2: targetMode.ballX,
        y2: targetMode.ballY,
        label: t.label,
        color: t.color,
        isHighlighted
      };
    }).filter(Boolean);
  }, [activeSide, modiItems2D, activeDynamic, hoveredNode]);

  const schemaPolygonPoints2D = useMemo(() => schemaItems2D.map(m => `${m.ptX.toFixed(1)},${m.ptY.toFixed(1)}`).join(' '), [schemaItems2D]);
  const modiPolygonPoints2D = useMemo(() => modiItems2D.map(m => `${m.ptX.toFixed(1)},${m.ptY.toFixed(1)}`).join(' '), [modiItems2D]);

  const gridLevels2D = useMemo(() => {
    if (activeSide === 'both') {
      const innerTarget = isModiInner ? modiItems2D : schemaItems2D;
      const outerTarget = isModiInner ? schemaItems2D : modiItems2D;

      const inner = [2, 4, 6].map(lvl => {
        const ratio = lvl / 6;
        const pts = innerTarget.map(m => `${(cx + 110 * ratio * m.cosA).toFixed(1)},${(cy + 110 * ratio * m.sinA).toFixed(1)}`).join(' ');
        return { key: `2d-inner-${lvl}`, lvl, pts, color: '#cbd5e1' };
      });
      const outer = [2, 4, 6].map(lvl => {
        const ratio = lvl / 6;
        const r = 192 + ratio * 56;
        const pts = outerTarget.map(m => `${(cx + r * m.cosA).toFixed(1)},${(cy + r * m.sinA).toFixed(1)}`).join(' ');
        return { key: `2d-outer-${lvl}`, lvl, pts, color: '#e2e8f0' };
      });
      return [...inner, ...outer];
    }

    const current2D = activeSide === 'modi' ? modiItems2D : schemaItems2D;
    return [2, 4, 6].map(lvl => {
      const ratio = lvl / 6;
      const pts = current2D.map(m => `${(cx + 180 * ratio * m.cosA).toFixed(1)},${(cy + 180 * ratio * m.sinA).toFixed(1)}`).join(' ');
      return { key: `2d-single-${lvl}`, lvl, pts, color: '#e2e8f0' };
    });
  }, [activeSide, schemaItems2D, modiItems2D, isModiInner, cx, cy]);

  // Active hovered ball with real-time coordinates and metadata for instant floating tooltip & HUD
  const activeBall = useMemo(() => {
    if (!hoveredNode) return null;
    const is3d = viewDimension === '3d';
    const list = is3d ? items3D : items2D;
    const match = list.find(m => m.id === hoveredNode.id && m.itemType === hoveredNode.itemType) ||
                  list.find(m => m.abbr === hoveredNode.abbr);
    if (!match) return null;
    const x = is3d ? match.projBall.screenX : match.ballX;
    const y = is3d ? match.projBall.screenY : match.ballY;
    const r = match.ballRadius;
    const catLabel = match.itemType === 'mode'
      ? (match.category === 'kind' ? 'Kindmodus' : match.category === 'coping' ? 'Copingmodus' : match.category === 'ouder' ? 'Oudermodus' : 'Gezonde modus')
      : `Domein: ${match.domain}`;
    return { ...match, x, y, r, catLabel };
  }, [hoveredNode, viewDimension, items3D, items2D]);

  // Rotate 3D orbit camera smoothly to focus on an item from the legend
  const rotateToItem = useCallback((item) => {
    if (!item) return;
    setAutoRotate(false);
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

    let angle = 0;
    if (item.itemType === 'schema') {
      const idx = SCHEMAS_INFO.findIndex(s => s.id === item.id);
      if (idx !== -1) angle = -Math.PI / 2 + idx * ((2 * Math.PI) / SCHEMAS_INFO.length);
    } else {
      const idx = MODES_INFO.findIndex(m => m.id === item.id);
      if (idx !== -1) angle = -Math.PI / 2 + idx * ((2 * Math.PI) / MODES_INFO.length);
    }

    const targetYaw = ((angle * 180 / Math.PI) % 360 + 360) % 360;
    setYaw(targetYaw);
    setPitch(45);
    setHoveredNode(item);
  }, []);

  // Formatted items for the interactive abbreviation legend (all 14 Modi and 18 Schemas)
  const allLegendModi = useMemo(() => {
    return modiItems3D.map(m => ({
      ...m,
      itemType: 'mode',
      catLabel: m.category === 'kind' ? 'Kindmodus' : m.category === 'coping' ? 'Copingmodus' : m.category === 'ouder' ? 'Oudermodus' : 'Gezonde modus'
    }));
  }, [modiItems3D]);

  const allLegendSchemas = useMemo(() => {
    return schemaItems3D.map(s => ({
      ...s,
      itemType: 'schema',
      catLabel: `Domein: ${s.domain}`
    }));
  }, [schemaItems3D]);

  const filteredLegendItems = useMemo(() => {
    let list = [];
    if (legendFilter === 'modi') {
      list = allLegendModi;
    } else if (legendFilter === 'schemas') {
      list = allLegendSchemas;
    } else if (legendFilter === 'elevated') {
      list = [...allLegendModi, ...allLegendSchemas].filter(item => item.scoreVal >= 3.0);
    } else {
      list = [...allLegendModi, ...allLegendSchemas];
    }

    if (legendSearch.trim()) {
      const q = legendSearch.toLowerCase().trim();
      list = list.filter(item =>
        item.abbr.toLowerCase().includes(q) ||
        item.title.toLowerCase().includes(q) ||
        (item.catLabel && item.catLabel.toLowerCase().includes(q))
      );
    }
    return list;
  }, [legendFilter, legendSearch, allLegendModi, allLegendSchemas]);

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '720px', margin: '0 auto', userSelect: 'none' }}>
      
      {/* Top Banner: Concentric Dual Ring Selector, Single Mode Tabs & Orbit Controls */}
      <div className="no-print" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', gap: '0.6rem', background: '#f8fafc', padding: '8px 14px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
        
        {/* View Mode Tabs: Gecombineerd (Dual • 32) vs Modi (14) vs Schema's (18) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', background: '#e2e8f0', padding: '3px', borderRadius: '8px', gap: '3px' }}>
            <button
              onClick={() => setActiveSide('both')}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '5px 12px', borderRadius: '6px', border: 'none',
                background: activeSide === 'both' ? 'linear-gradient(135deg, #059669 0%, #2563eb 100%)' : 'transparent',
                color: activeSide === 'both' ? 'white' : '#475569',
                cursor: 'pointer', fontWeight: 'bold', fontSize: '0.85rem',
                boxShadow: activeSide === 'both' ? '0 2px 6px rgba(37, 99, 235, 0.3)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              Gecombineerd (Dual • 32)
            </button>
            <button
              onClick={() => setActiveSide('modi')}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '5px 12px', borderRadius: '6px', border: 'none',
                background: activeSide === 'modi' ? '#3b82f6' : 'transparent',
                color: activeSide === 'modi' ? 'white' : '#475569',
                cursor: 'pointer', fontWeight: 'bold', fontSize: '0.85rem',
                boxShadow: activeSide === 'modi' ? '0 2px 4px rgba(59, 130, 246, 0.25)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              Modi (SMI • 14)
            </button>
            <button
              onClick={() => setActiveSide('schemas')}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '5px 12px', borderRadius: '6px', border: 'none',
                background: activeSide === 'schemas' ? '#10b981' : 'transparent',
                color: activeSide === 'schemas' ? 'white' : '#475569',
                cursor: 'pointer', fontWeight: 'bold', fontSize: '0.85rem',
                boxShadow: activeSide === 'schemas' ? '0 2px 4px rgba(16, 185, 129, 0.25)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              Schema's (YSQ • 18)
            </button>
          </div>

          {/* 3D Coin Flip / 180 Orbit Button */}
          <button
            onClick={flipCoin}
            disabled={isFlipping}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '5px 12px', borderRadius: '8px',
              border: '1px solid #cbd5e1', background: 'white',
              color: '#1e293b', cursor: isFlipping ? 'wait' : 'pointer',
              fontWeight: 'bold', fontSize: '0.82rem',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
              transition: 'all 0.2s'
            }}
            title={activeSide === 'both' ? "Draai de concentrische weergave 180° rond" : "Draai de munt 180° om naar de andere zijde"}
          >
            <Coins size={15} color="#eab308" />
            {activeSide === 'both' ? "Draai 180° om" : `Keer munt om (${activeSide === 'modi' ? "Schema's" : "Modi"})`}
          </button>
        </div>

        {/* 2D vs 3D Dimension Switcher & Orbit Tools */}
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
          
          <div style={{ display: 'flex', background: '#e2e8f0', padding: '3px', borderRadius: '8px', gap: '3px' }}>
            <button
              onClick={() => setViewDimension('2d')}
              style={{
                display: 'flex', alignItems: 'center', gap: '5px',
                padding: '4px 10px', borderRadius: '6px', border: 'none',
                background: viewDimension === '2d' ? '#3b82f6' : 'transparent',
                color: viewDimension === '2d' ? 'white' : '#475569',
                cursor: 'pointer', fontWeight: 'bold', fontSize: '0.82rem'
              }}
            >
              <Eye size={14} /> 2D
            </button>
            <button
              onClick={() => setViewDimension('3d')}
              style={{
                display: 'flex', alignItems: 'center', gap: '5px',
                padding: '4px 10px', borderRadius: '6px', border: 'none',
                background: viewDimension === '3d' ? '#3b82f6' : 'transparent',
                color: viewDimension === '3d' ? 'white' : '#475569',
                cursor: 'pointer', fontWeight: 'bold', fontSize: '0.82rem'
              }}
            >
              <Rotate3d size={14} /> 3D
            </button>
          </div>

          {viewDimension === '3d' && (
            <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
              <button
                onClick={() => { setPitch(48); setYaw(28); setZoom(1.0); }}
                style={{ padding: '4px 7px', borderRadius: '6px', border: '1px solid #cbd5e1', background: 'white', fontSize: '0.75rem', fontWeight: '600', color: '#475569', cursor: 'pointer' }}
                title="Herstel naar perspectief"
              >
                Perspectief
              </button>
              <button
                onClick={() => { setPitch(85); setYaw(0); setZoom(0.95); }}
                style={{ padding: '4px 7px', borderRadius: '6px', border: '1px solid #cbd5e1', background: 'white', fontSize: '0.75rem', fontWeight: '600', color: '#475569', cursor: 'pointer' }}
                title="Bovenaanzicht"
              >
                Boven
              </button>
              <button
                onClick={() => setAutoRotate(!autoRotate)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '3px',
                  padding: '4px 7px', borderRadius: '6px',
                  border: '1px solid ' + (autoRotate ? '#93c5fd' : '#cbd5e1'),
                  background: autoRotate ? '#eff6ff' : 'white',
                  color: autoRotate ? '#1d4ed8' : '#475569',
                  fontSize: '0.75rem', fontWeight: '600', cursor: 'pointer'
                }}
                title={autoRotate ? "Pauzeer draaien" : "Start continu ronddraaien"}
              >
                {autoRotate ? <Pause size={12} /> : <Play size={12} />}
              </button>
              <button
                onClick={() => setZoom(z => Math.max(0.7, z - 0.1))}
                style={{ padding: '4px 5px', borderRadius: '6px', border: '1px solid #cbd5e1', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                title="Zoom uit"
              >
                <ZoomOut size={12} color="#475569" />
              </button>
              <button
                onClick={() => setZoom(z => Math.min(1.4, z + 0.1))}
                style={{ padding: '4px 5px', borderRadius: '6px', border: '1px solid #cbd5e1', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                title="Zoom in"
              >
                <ZoomIn size={12} color="#475569" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Side Explanation Subtitle */}
      <div style={{ textAlign: 'center', marginBottom: '0.75rem' }}>
        {activeSide === 'both' ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <span style={{
                fontSize: '0.84rem', fontWeight: 'bold', color: '#0f172a', background: '#f8fafc',
                padding: '4px 14px', borderRadius: '20px', border: '1px solid #cbd5e1',
                display: 'inline-flex', alignItems: 'center', gap: '8px'
              }}>
                <span style={{ display: 'inline-block', width: '9px', height: '9px', borderRadius: '50%', background: isModiInner ? '#3b82f6' : '#10b981' }}></span>
                {isModiInner ? "Binnenring: 14 Modi (Actuele expressie)" : "Binnenring: 18 Schema's (Diepe wortels)"}
                <span style={{ color: '#94a3b8' }}>•</span>
                <span style={{ display: 'inline-block', width: '9px', height: '9px', borderRadius: '50%', background: isModiInner ? '#10b981' : '#3b82f6' }}></span>
                {isModiInner ? "Buitenring: 18 Schema's (Diepe wortels)" : "Buitenring: 14 Modi (Actuele expressie)"}
              </span>

              {/* Ring Orientation Toggle Switch */}
              <button
                type="button"
                onClick={() => setRingOrientation(prev => prev === 'modi-inner' ? 'schemas-inner' : 'modi-inner')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: '#ffffff',
                  border: '1px solid #cbd5e1',
                  color: '#1e293b',
                  padding: '4px 12px',
                  borderRadius: '16px',
                  fontSize: '0.76rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                  transition: 'all 0.15s ease'
                }}
                title="Wissel de binnenste en buitenste ring om (Modi binnen ↔ Schema's binnen)"
              >
                <ArrowLeftRight size={13} color="#0284c7" />
                <span>Ringen wisselen</span>
              </button>

              {/* Threshold Filter Toggle */}
              <div style={{ display: 'inline-flex', background: '#e2e8f0', padding: '2px', borderRadius: '16px', gap: '2px', fontSize: '0.74rem' }}>
                <button
                  type="button"
                  onClick={() => setMinLinkScore(3.0)}
                  style={{
                    border: 'none',
                    background: minLinkScore === 3.0 ? '#0f172a' : 'transparent',
                    color: minLinkScore === 3.0 ? '#ffffff' : '#475569',
                    padding: '2px 9px',
                    borderRadius: '14px',
                    fontWeight: minLinkScore === 3.0 ? 'bold' : 'normal',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                  title="Toon alleen verbanden tussen klinisch verheven schema's en modi (score ≥ 3.0)"
                >
                  Score ≥ 3.0 ({correlationLinks3D.length} verbanden)
                </button>
                <button
                  type="button"
                  onClick={() => setMinLinkScore(0)}
                  style={{
                    border: 'none',
                    background: minLinkScore === 0 ? '#0f172a' : 'transparent',
                    color: minLinkScore === 0 ? '#ffffff' : '#475569',
                    padding: '2px 9px',
                    borderRadius: '14px',
                    fontWeight: minLinkScore === 0 ? 'bold' : 'normal',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                  title="Toon alle theoretische verbanden ongeacht de score"
                >
                  Alle
                </button>
              </div>
            </div>

            <span style={{ fontSize: '0.76rem', color: '#64748b' }}>
              {minLinkScore === 3.0
                ? "Beperkt tot actieve patronen: alleen koppelingen waar zowel het schema als de modus score ≥ 3.0 hebben"
                : "Beweeg over een bol om de theoretische koppeling tussen schema en modus in goud op te lichten"
              }
            </span>
          </div>
        ) : (
          <span style={{
            fontSize: '0.85rem', fontWeight: 'bold',
            color: activeSide === 'modi' ? '#2563eb' : '#059669',
            background: activeSide === 'modi' ? '#eff6ff' : '#ecfdf5',
            padding: '3px 12px', borderRadius: '20px',
            border: `1px solid ${activeSide === 'modi' ? '#bfdbfe' : '#a7f3d0'}`
          }}>
            {activeSide === 'modi' 
              ? "Muntzijde 1: Modi (SMI) — Actuele gemoedstoestanden en overlevingsreacties" 
              : "Muntzijde 2: Schema's (YSQ) — Vroege disfunctionele schema's en overtuigingen"
            }
          </span>
        )}
      </div>

      {/* Realtime Abbreviation Inspector HUD & Legend Toggle */}
      <div style={{
        width: '100%',
        margin: '0 auto 10px auto',
        padding: '8px 14px',
        background: activeBall ? '#ffffff' : '#f8fafc',
        borderRadius: '12px',
        border: activeBall ? `1.5px solid ${activeBall.bg}` : '1px solid #e2e8f0',
        boxShadow: activeBall ? '0 4px 14px rgba(0,0,0,0.06)' : '0 1px 3px rgba(0,0,0,0.02)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '8px',
        transition: 'all 0.15s ease'
      }}>
        {/* Left: Active ball info or idle helper prompt */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: '240px' }}>
          {activeBall ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{
                background: activeBall.bg,
                color: activeBall.textColor,
                fontWeight: 900,
                fontSize: '0.85rem',
                padding: '2px 8px',
                borderRadius: '6px',
                letterSpacing: '0.5px'
              }}>
                {activeBall.abbr}
              </span>
              <strong style={{ fontSize: '0.92rem', color: '#0f172a' }}>
                {activeBall.title}
              </strong>
              <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
                • {activeBall.catLabel}
              </span>
              <span style={{
                fontSize: '0.76rem',
                fontWeight: 800,
                padding: '2px 8px',
                borderRadius: '10px',
                background: activeBall.scoreVal >= 3.0 ? '#fee2e2' : '#ecfdf5',
                color: activeBall.scoreVal >= 3.0 ? '#b91c1c' : '#047857',
                border: activeBall.scoreVal >= 3.0 ? '1px solid #fca5a5' : '1px solid #a7f3d0'
              }}>
                Score: {formatScore(activeBall.scoreVal)} {activeBall.scoreVal >= 3.0 ? '• Verhoogd (≥ 3.0)' : ''}
              </span>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b', fontSize: '0.80rem' }}>
              <HelpCircle size={15} color="#3b82f6" />
              <span>
                Beweeg over een bol voor directe uitschrijving, of bekijk alle 32 afkortingen in de legenda:
              </span>
            </div>
          )}
        </div>

        {/* Right: Legend Toggle Button */}
        <button
          type="button"
          onClick={() => setShowLegend(prev => !prev)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '5px 12px',
            borderRadius: '20px',
            border: showLegend ? '1.5px solid #2563eb' : '1px solid #cbd5e1',
            background: showLegend ? '#eff6ff' : '#ffffff',
            color: showLegend ? '#1d4ed8' : '#334155',
            fontWeight: 700,
            fontSize: '0.80rem',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
            boxShadow: '0 2px 4px rgba(0,0,0,0.04)'
          }}
          title={showLegend ? "Sluit afkortingenlegenda" : "Bekijk alle afkortingen en schalen uitgeschreven"}
        >
          <BookOpen size={14} color={showLegend ? '#2563eb' : '#64748b'} />
          Legenda Afkortingen ({showLegend ? 'Inklappen' : '32 Schalen'})
          {showLegend ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>

      {/* Collapsible Legenda Panel */}
      {showLegend && (
        <div style={{
          width: '100%',
          margin: '0 auto 16px auto',
          background: '#ffffff',
          borderRadius: '14px',
          border: '1.5px solid #cbd5e1',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
          padding: '16px 20px',
          transition: 'all 0.2s ease'
        }}>
          {/* Header with Search and Filter Tabs */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '14px', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px' }}>
            <div>
              <h4 style={{ margin: 0, fontSize: '0.96rem', fontWeight: 800, color: '#0f172a' }}>
                Legenda: Alle 32 Schalen & Afkortingen
              </h4>
              <p style={{ margin: '2px 0 0', fontSize: '0.78rem', color: '#64748b' }}>
                Beweeg over een schaal om de bol in de grafiek op te lichten, of klik om de 3D-camera te richten.
              </p>
            </div>

            {/* Search Input */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#f1f5f9', padding: '4px 10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
              <Search size={14} color="#64748b" />
              <input
                type="text"
                placeholder="Zoek afkorting of naam..."
                value={legendSearch}
                onChange={(e) => setLegendSearch(e.target.value)}
                style={{
                  border: 'none',
                  background: 'transparent',
                  outline: 'none',
                  fontSize: '0.80rem',
                  color: '#1e293b',
                  width: '180px'
                }}
              />
              {legendSearch && (
                <button
                  type="button"
                  onClick={() => setLegendSearch('')}
                  style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 0, color: '#64748b' }}
                >
                  <X size={12} />
                </button>
              )}
            </div>

            {/* Filter Pills */}
            <div style={{ display: 'flex', gap: '4px', background: '#e2e8f0', padding: '2px', borderRadius: '14px' }}>
              {[
                { id: 'all', label: 'Alles (32)' },
                { id: 'modi', label: 'Modi (14)' },
                { id: 'schemas', label: "Schema's (18)" },
                { id: 'elevated', label: 'Verhoogd (≥ 3.0)' }
              ].map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setLegendFilter(tab.id)}
                  style={{
                    border: 'none',
                    background: legendFilter === tab.id ? '#0f172a' : 'transparent',
                    color: legendFilter === tab.id ? '#ffffff' : '#475569',
                    padding: '3px 10px',
                    borderRadius: '12px',
                    fontSize: '0.75rem',
                    fontWeight: legendFilter === tab.id ? 700 : 500,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(215px, 1fr))',
            gap: '8px',
            maxHeight: '340px',
            overflowY: 'auto',
            paddingRight: '4px'
          }}>
            {filteredLegendItems.map(item => {
              const isSelected = hoveredNode && (hoveredNode.id === item.id || hoveredNode.abbr === item.abbr);
              const isElevated = item.scoreVal >= 3.0;

              return (
                <div
                  key={`legend-${item.itemType}-${item.id}`}
                  onMouseEnter={() => handleNodeHover(item)}
                  onMouseLeave={handleNodeLeave}
                  onClick={() => {
                    if (viewDimension === '3d') {
                      rotateToItem(item);
                    }
                    if (item.id === 'bk') {
                      triggerSparkleRain();
                    }
                    setHoveredNode(item);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '7px 10px',
                    borderRadius: '8px',
                    border: isSelected ? `1.5px solid ${item.bg}` : (isElevated ? '1px solid #fed7aa' : '1px solid #e2e8f0'),
                    background: isSelected ? '#f0f9ff' : (isElevated ? '#fffaf5' : '#ffffff'),
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    boxShadow: isSelected ? '0 2px 8px rgba(0,0,0,0.06)' : 'none'
                  }}
                  title={`Klik om te focussen: ${item.title}`}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minWidth: '28px',
                      height: '24px',
                      borderRadius: '6px',
                      background: item.bg,
                      color: item.textColor,
                      fontWeight: 900,
                      fontSize: '0.78rem',
                      letterSpacing: '0.4px',
                      flexShrink: 0
                    }}>
                      {item.abbr}
                    </span>
                    <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                      <span style={{
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        color: '#1e293b',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>
                        {item.title}
                      </span>
                      <span style={{ fontSize: '0.70rem', color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {item.catLabel}
                      </span>
                    </div>
                  </div>

                  <span style={{
                    fontSize: '0.78rem',
                    fontWeight: 800,
                    padding: '2px 6px',
                    borderRadius: '8px',
                    background: isElevated ? '#fee2e2' : '#f1f5f9',
                    color: isElevated ? '#dc2626' : '#475569',
                    flexShrink: 0,
                    marginLeft: '4px'
                  }}>
                    {formatScore(item.scoreVal)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Interactive 3D Canvas / SVG Container */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          position: 'relative',
          width: '100%',
          cursor: viewDimension === '3d' ? (isDragging ? 'grabbing' : 'grab') : 'default',
          touchAction: viewDimension === '3d' ? 'none' : 'auto'
        }}
      >
        {/* Floating guidance hint for 3D */}
        {viewDimension === '3d' && (
          <div
            className="no-print"
            style={{
              position: 'absolute',
              top: '8px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(4px)',
              border: '1px solid #e2e8f0',
              padding: '3px 12px',
              borderRadius: '20px',
              fontSize: '0.75rem',
              color: '#64748b',
              pointerEvents: 'none',
              zIndex: 10,
              boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
            }}
          >
            Sleep met de muis om de dubbelzijdige 3D-munt rondom te draaien
          </div>
        )}

        <svg
          viewBox={`0 0 ${size} ${size}`}
          style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }}
        >
          <defs>
            <filter id="radar3dBallShadow" x="-40%" y="-40%" width="180%" height="180%">
              <feDropShadow dx="0" dy="5" stdDeviation="5" floodOpacity="0.2" />
            </filter>
            <filter id="radar3dDotShadow" x="-40%" y="-40%" width="180%" height="180%">
              <feDropShadow dx="0" dy="3" stdDeviation="3" floodOpacity="0.3" />
            </filter>
            <radialGradient id="sphereLight" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
              <stop offset="70%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.2" />
            </radialGradient>
            <style>{`
              @keyframes schemaEnergyFlow {
                from { stroke-dashoffset: 24; }
                to { stroke-dashoffset: 0; }
              }
              @keyframes gvEnergyFlow {
                from { stroke-dashoffset: 20; }
                to { stroke-dashoffset: 0; }
              }
              @keyframes sparkleTwinkle {
                0% {
                  transform: scale(0) rotate(0deg);
                  opacity: 0;
                  filter: brightness(1) drop-shadow(0 0 0px transparent);
                }
                25% {
                  transform: scale(1.2) rotate(20deg);
                  opacity: 1;
                  filter: brightness(1.5) drop-shadow(0 0 16px currentColor);
                }
                55% {
                  transform: scale(1) rotate(45deg);
                  opacity: 0.95;
                  filter: brightness(1.2) drop-shadow(0 0 10px currentColor);
                }
                80% {
                  transform: scale(0.7) rotate(70deg);
                  opacity: 0.6;
                  filter: brightness(1) drop-shadow(0 0 4px currentColor);
                }
                100% {
                  transform: scale(0) rotate(90deg);
                  opacity: 0;
                  filter: brightness(0.8) drop-shadow(0 0 0px transparent);
                }
              }
              @keyframes easterEggToastPop {
                0% {
                  transform: translate(-50%, -20px) scale(0.85);
                  opacity: 0;
                }
                12% {
                  transform: translate(-50%, 0) scale(1.05);
                  opacity: 1;
                }
                22% {
                  transform: translate(-50%, 0) scale(1);
                  opacity: 1;
                }
                85% {
                  transform: translate(-50%, 0) scale(1);
                  opacity: 1;
                }
                100% {
                  transform: translate(-50%, -25px) scale(0.9);
                  opacity: 0;
                }
              }
            `}</style>
          </defs>

          {/* ===================== 3D VIEW RENDERING ===================== */}
          {viewDimension === '3d' && (
            <g className="radar-3d-scene">
              
              {/* Floor Shadows */}
              {activeSide === 'both' ? (
                <>
                  <polygon points={floorShadowPointsSchema} fill="rgba(16, 185, 129, 0.08)" stroke="none" />
                  <polygon points={floorShadowPointsModi} fill="rgba(59, 130, 246, 0.08)" stroke="none" />
                </>
              ) : (
                <polygon
                  points={activeSide === 'modi' ? floorShadowPointsModi : floorShadowPointsSchema}
                  fill="rgba(30, 41, 59, 0.08)"
                  stroke="none"
                />
              )}

              {/* Concentric 3D Floor Grid Polygons */}
              {floorGridRings.map(({ key, pts, color }) => (
                <polygon
                  key={`floor-grid-${key}`}
                  points={pts}
                  fill="none"
                  stroke={color}
                  strokeWidth="1.1"
                />
              ))}

              {/* Demarcation Ring between inner and outer realms */}
              {dividerRing3D && (
                <polygon
                  points={dividerRing3D}
                  fill="none"
                  stroke="#cbd5e1"
                  strokeWidth="1.4"
                  strokeDasharray="4 3"
                />
              )}

              {/* Radial axes from center to points on the floor */}
              {items3D.map(m => {
                const isOuter = activeSide === 'both' && (isModiInner ? m.itemType === 'schema' : m.itemType === 'mode');
                return (
                  <line
                    key={`axis-${m.itemType}-${m.id}`}
                    x1={isOuter ? m.projBaseFloor.screenX : projCenter.screenX}
                    y1={isOuter ? m.projBaseFloor.screenY : projCenter.screenY}
                    x2={m.projBall.screenX}
                    y2={m.projBall.screenY}
                    stroke="#f1f5f9"
                    strokeWidth="1.6"
                  />
                );
              })}

              {/* Vertical 3D Pillars rising from floor up to the score peaks */}
              {items3D.map(m => (
                <line
                  key={`pillar-${m.itemType}-${m.id}`}
                  x1={m.projGround.screenX}
                  y1={m.projGround.screenY}
                  x2={m.projPeak.screenX}
                  y2={m.projPeak.screenY}
                  stroke={m.bg}
                  strokeWidth="2"
                  strokeDasharray={m.scoreVal < 2 ? "2 2" : "none"}
                  opacity="0.75"
                />
              ))}

              {/* Shaded 3D Facets (Crystal mountain canopies) */}
              {facets.map(({ pts, intensity, idx, color }) => (
                <polygon
                  key={`facet-${idx}`}
                  points={pts}
                  fill={`rgba(${color}, ${(0.16 + intensity * 0.28).toFixed(2)})`}
                  stroke={`rgba(${color}, 0.5)`}
                  strokeWidth="1"
                  strokeLinejoin="round"
                />
              ))}

              {/* 3D boundary line connecting the peaks */}
              {activeSide === 'both' ? (
                <>
                  <polygon
                    points={schemaPeakPolygonPoints}
                    fill="none"
                    stroke="#059669"
                    strokeWidth="2.8"
                    strokeLinejoin="round"
                  />
                  <polygon
                    points={modiPeakPolygonPoints}
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="2.8"
                    strokeLinejoin="round"
                  />
                </>
              ) : (
                <polygon
                  points={activeSide === 'modi' ? modiPeakPolygonPoints : schemaPeakPolygonPoints}
                  fill="none"
                  stroke={activeSide === 'modi' ? "#2563eb" : "#059669"}
                  strokeWidth="3.2"
                  strokeLinejoin="round"
                />
              )}

              {/* Central Apex Point for schemas */}
              {projApexSchema && (
                <circle
                  cx={projApexSchema.screenX}
                  cy={projApexSchema.screenY}
                  r={4.5 * projApexSchema.scale}
                  fill="#10b981"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  filter="url(#radar3dDotShadow)"
                />
              )}
              {projApexModi && (
                <circle
                  cx={projApexModi.screenX}
                  cy={projApexModi.screenY}
                  r={4.5 * projApexModi.scale}
                  fill="#3b82f6"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  filter="url(#radar3dDotShadow)"
                />
              )}

              {/* Glowing 3D Score Vertex Dots */}
              {items3D.map(m => (
                <g key={`dot-${m.itemType}-${m.id}`}>
                  <circle
                    cx={m.projPeak.screenX}
                    cy={m.projPeak.screenY}
                    r={5.5 * m.projPeak.scale}
                    fill={m.bg}
                    stroke="#ffffff"
                    strokeWidth="2.2"
                    filter="url(#radar3dDotShadow)"
                  />
                  <circle
                    cx={m.projPeak.screenX}
                    cy={m.projPeak.screenY}
                    r={5.5 * m.projPeak.scale}
                    fill="url(#sphereLight)"
                  />
                </g>
              ))}

              {/* 3D Correlation Links between Schemas and Modi (Flowing Energy from Schema Trigger to Mode Reaction) */}
              {activeSide === 'both' && correlationLinks3D.map(link => (
                <line
                  key={`link-3d-${link.key}`}
                  x1={link.x1}
                  y1={link.y1}
                  x2={link.x2}
                  y2={link.y2}
                  stroke={link.isHighlighted ? "#f59e0b" : "#94a3b8"}
                  strokeWidth={link.isHighlighted ? 3.2 : 1.2}
                  strokeDasharray={link.isHighlighted ? "7 5" : "3 3"}
                  opacity={link.isHighlighted ? 0.96 : (link.isDimmed ? 0.04 : 0.18)}
                  strokeLinecap="round"
                  style={{
                    transition: 'stroke 0.2s, stroke-width 0.2s, opacity 0.2s',
                    filter: link.isHighlighted ? 'drop-shadow(0 0 6px rgba(245, 158, 11, 0.8))' : 'none',
                    animation: link.isHighlighted
                      ? 'schemaEnergyFlow 0.85s linear infinite'
                      : 'schemaEnergyFlow 2.8s linear infinite'
                  }}
                />
              ))}

              {/* 3D Therapeutic Intervention Vectors from Gezonde Volwassene (GV) */}
              {(activeSide === 'both' || activeSide === 'modi') && therapeuticLinks3D.map(link => (
                <line
                  key={`gv-3d-${link.key}`}
                  x1={link.x1}
                  y1={link.y1}
                  x2={link.x2}
                  y2={link.y2}
                  stroke="#10b981"
                  strokeWidth={link.isHighlighted ? 3.4 : 1.5}
                  strokeDasharray={link.isHighlighted ? "8 4" : "4 3"}
                  opacity={link.isHighlighted ? 0.96 : (activeDynamic || hoveredNode ? 0.04 : 0.20)}
                  strokeLinecap="round"
                  style={{
                    transition: 'stroke 0.2s, stroke-width 0.2s, opacity 0.2s',
                    filter: link.isHighlighted ? 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.85))' : 'none',
                    animation: 'gvEnergyFlow 1.05s linear infinite'
                  }}
                />
              ))}

              {/* Depth-Sorted Outer 3D Mode/Schema Balls (NO WHITE BORDER) */}
              {depthSortedBalls.map(m => {
                const isLinked = isLinkedPartner(m, hoveredNode);
                const isHovered = hoveredNode && (hoveredNode.id === m.id || hoveredNode.abbr === m.abbr);
                const isInActiveDynamic = activeDynamic && (
                  (m.itemType === 'schema' && activeDynamic.schemaIds.includes(m.id)) ||
                  (m.itemType === 'mode' && (
                    activeDynamic.modeIds.includes(m.id) ||
                    activeDynamic.modeIds.includes(SMI_KEY_TO_ID[m.id]) ||
                    (m.id === 'boos_k' && activeDynamic.modeIds.includes('wk')) ||
                    (m.id === 'wk' && activeDynamic.modeIds.includes('boos_k'))
                  ))
                );
                const ringStroke = (activeDynamic && activeDynamic.id === 'dyn-gv') ? '#10b981' : '#f59e0b';

                return (
                  <g
                    key={`ball-3d-${m.itemType}-${m.id}`}
                    transform={`translate(${m.projBall.screenX}, ${m.projBall.screenY})`}
                    style={{ cursor: 'pointer' }}
                    onMouseEnter={() => handleNodeHover(m)}
                    onMouseLeave={handleNodeLeave}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (m.id === 'bk') {
                        triggerSparkleRain();
                      }
                      if (flipTimeoutRef.current) clearTimeout(flipTimeoutRef.current);
                      setPopupFlipped(prev => !prev);
                    }}
                  >
                    {/* Linked Partner or Active Dynamic Golden/Emerald Pulse Ring */}
                    {(isLinked || isInActiveDynamic) && (
                      <circle
                        r={m.ballRadius + 4.5}
                        fill="none"
                        stroke={ringStroke}
                        strokeWidth="2.4"
                        strokeDasharray={isInActiveDynamic ? "none" : "4 2"}
                        opacity="0.96"
                      />
                    )}

                    {/* Hovered Ball Golden Focus Ring */}
                    {isHovered && (
                      <circle
                        r={m.ballRadius + 4}
                        fill="none"
                        stroke="#fbbf24"
                        strokeWidth="2.8"
                        opacity="1"
                      />
                    )}

                    {/* Clean Solid Ball without white stroke */}
                    <circle
                      r={m.ballRadius}
                      fill={m.bg}
                      stroke="none"
                      filter="url(#radar3dBallShadow)"
                    />

                    {/* 3D Sphere Shading Highlight */}
                    <circle
                      r={m.ballRadius}
                      fill="url(#sphereLight)"
                    />

                    {/* Abbreviation (e.g. GV, OK, VE, WA) */}
                    <text
                      textAnchor="middle"
                      y={m.scoreVal > 0 ? -1 : 5}
                      fill={m.textColor}
                      fontWeight="900"
                      fontSize={Math.max(m.itemType === 'mode' ? 10.5 : 9.2, m.ballRadius * 0.58)}
                      style={{ userSelect: 'none', letterSpacing: '0.3px' }}
                    >
                      {m.abbr}
                    </text>

                    {/* Score */}
                    {m.scoreVal > 0 && (
                      <text
                        textAnchor="middle"
                        y={m.ballRadius * 0.52}
                        fill={m.textColor}
                        fontWeight="bold"
                        fontSize={Math.max(m.itemType === 'mode' ? 8 : 7.2, m.ballRadius * 0.38)}
                        opacity={0.92}
                        style={{ userSelect: 'none' }}
                      >
                        {formatScore(m.scoreVal)}
                      </text>
                    )}
                  </g>
                );
              })}
            </g>
          )}

          {/* ===================== 2D VIEW RENDERING ===================== */}
          {viewDimension === '2d' && (
            <g className="radar-2d-scene">
              {/* Concentric grid polygons */}
              {gridLevels2D.map(({ key, pts, color }) => (
                <polygon
                  key={key}
                  points={pts}
                  fill="none"
                  stroke={color}
                  strokeWidth="1.2"
                />
              ))}

              {/* Demarcation circle in dual mode */}
              {activeSide === 'both' && (
                <circle
                  cx={cx}
                  cy={cy}
                  r="176"
                  fill="none"
                  stroke="#cbd5e1"
                  strokeWidth="1.4"
                  strokeDasharray="4 3"
                />
              )}

              {/* Radial axes */}
              {items2D.map(m => {
                const isOuter = activeSide === 'both' && (isModiInner ? m.itemType === 'schema' : m.itemType === 'mode');
                return (
                  <line
                    key={`axis-2d-${m.itemType}-${m.id}`}
                    x1={isOuter ? (cx + 192 * m.cosA) : cx}
                    y1={isOuter ? (cy + 192 * m.sinA) : cy}
                    x2={m.ballX}
                    y2={m.ballY}
                    stroke="#f1f5f9"
                    strokeWidth="2"
                  />
                );
              })}

              {/* 2D Correlation Links (Flowing Energy from Schema Trigger to Mode Reaction) */}
              {activeSide === 'both' && correlationLinks2D.map(link => (
                <line
                  key={`link-2d-${link.key}`}
                  x1={link.x1}
                  y1={link.y1}
                  x2={link.x2}
                  y2={link.y2}
                  stroke={link.isHighlighted ? "#f59e0b" : "#94a3b8"}
                  strokeWidth={link.isHighlighted ? 3.2 : 1.2}
                  strokeDasharray={link.isHighlighted ? "7 5" : "3 3"}
                  opacity={link.isHighlighted ? 0.96 : (link.isDimmed ? 0.04 : 0.18)}
                  strokeLinecap="round"
                  style={{
                    transition: 'stroke 0.2s, stroke-width 0.2s, opacity 0.2s',
                    filter: link.isHighlighted ? 'drop-shadow(0 0 6px rgba(245, 158, 11, 0.8))' : 'none',
                    animation: link.isHighlighted
                      ? 'schemaEnergyFlow 0.85s linear infinite'
                      : 'schemaEnergyFlow 2.8s linear infinite'
                  }}
                />
              ))}

              {/* 2D Therapeutic Intervention Vectors from Gezonde Volwassene (GV) */}
              {(activeSide === 'both' || activeSide === 'modi') && therapeuticLinks2D.map(link => (
                <line
                  key={`gv-2d-${link.key}`}
                  x1={link.x1}
                  y1={link.y1}
                  x2={link.x2}
                  y2={link.y2}
                  stroke="#10b981"
                  strokeWidth={link.isHighlighted ? 3.4 : 1.5}
                  strokeDasharray={link.isHighlighted ? "8 4" : "4 3"}
                  opacity={link.isHighlighted ? 0.96 : (activeDynamic || hoveredNode ? 0.04 : 0.20)}
                  strokeLinecap="round"
                  style={{
                    transition: 'stroke 0.2s, stroke-width 0.2s, opacity 0.2s',
                    filter: link.isHighlighted ? 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.85))' : 'none',
                    animation: 'gvEnergyFlow 1.05s linear infinite'
                  }}
                />
              ))}

              {/* Data Polygons */}
              {activeSide === 'both' ? (
                <>
                  <polygon
                    points={schemaPolygonPoints2D}
                    fill="#10b981"
                    fillOpacity="0.22"
                    stroke="#10b981"
                    strokeWidth="2.8"
                    strokeLinejoin="round"
                  />
                  <polygon
                    points={modiPolygonPoints2D}
                    fill="#3b82f6"
                    fillOpacity="0.20"
                    stroke="#3b82f6"
                    strokeWidth="2.8"
                    strokeLinejoin="round"
                  />
                </>
              ) : (
                <polygon
                  points={activeSide === 'modi' ? modiPolygonPoints2D : schemaPolygonPoints2D}
                  fill={activeSide === 'modi' ? "#3b82f6" : "#10b981"}
                  fillOpacity="0.25"
                  stroke={activeSide === 'modi' ? "#3b82f6" : "#10b981"}
                  strokeWidth="3"
                  strokeLinejoin="round"
                />
              )}

              {/* Vertex dots */}
              {items2D.map(m => (
                <circle
                  key={`pt-2d-${m.itemType}-${m.id}`}
                  cx={m.ptX}
                  cy={m.ptY}
                  r="6"
                  fill={m.bg}
                  stroke="#ffffff"
                  strokeWidth="2.2"
                  filter="url(#radar3dDotShadow)"
                />
              ))}

              {/* Outer Balls (NO WHITE BORDER) */}
              {items2D.map(m => {
                const isLinked = isLinkedPartner(m, hoveredNode);
                const isHovered = hoveredNode && (hoveredNode.id === m.id || hoveredNode.abbr === m.abbr);
                const isInActiveDynamic = activeDynamic && (
                  (m.itemType === 'schema' && activeDynamic.schemaIds.includes(m.id)) ||
                  (m.itemType === 'mode' && (
                    activeDynamic.modeIds.includes(m.id) ||
                    activeDynamic.modeIds.includes(SMI_KEY_TO_ID[m.id]) ||
                    (m.id === 'boos_k' && activeDynamic.modeIds.includes('wk')) ||
                    (m.id === 'wk' && activeDynamic.modeIds.includes('boos_k'))
                  ))
                );
                const ringStroke = (activeDynamic && activeDynamic.id === 'dyn-gv') ? '#10b981' : '#f59e0b';

                return (
                  <g
                    key={`ball-2d-${m.itemType}-${m.id}`}
                    transform={`translate(${m.ballX}, ${m.ballY})`}
                    style={{ cursor: 'pointer' }}
                    onMouseEnter={() => handleNodeHover(m)}
                    onMouseLeave={handleNodeLeave}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (m.id === 'bk') {
                        triggerSparkleRain();
                      }
                      if (flipTimeoutRef.current) clearTimeout(flipTimeoutRef.current);
                      setPopupFlipped(prev => !prev);
                    }}
                  >
                    {/* Linked Partner or Active Dynamic Golden/Emerald Pulse Ring */}
                    {(isLinked || isInActiveDynamic) && (
                      <circle
                        r={m.ballRadius + 4.5}
                        fill="none"
                        stroke={ringStroke}
                        strokeWidth="2.4"
                        strokeDasharray={isInActiveDynamic ? "none" : "4 2"}
                        opacity="0.96"
                      />
                    )}

                    {/* Hovered Ball Golden Focus Ring */}
                    {isHovered && (
                      <circle
                        r={m.ballRadius + 4}
                        fill="none"
                        stroke="#fbbf24"
                        strokeWidth="2.8"
                        opacity="1"
                      />
                    )}

                    <circle
                      r={m.ballRadius}
                      fill={m.bg}
                      stroke="none"
                      filter="url(#radar3dBallShadow)"
                    />
                    <text
                      textAnchor="middle"
                      y={m.scoreVal > 0 ? -1 : 5}
                      fill={m.textColor}
                      fontWeight="900"
                      fontSize={Math.max(m.itemType === 'mode' ? 10.5 : 9.5, m.ballRadius * 0.58)}
                      style={{ userSelect: 'none', letterSpacing: '0.4px' }}
                    >
                      {m.abbr}
                    </text>
                    {m.scoreVal > 0 && (
                      <text
                        textAnchor="middle"
                        y={m.ballRadius * 0.52}
                        fill={m.textColor}
                        fontWeight="bold"
                        fontSize={Math.max(m.itemType === 'mode' ? 8.2 : 7.6, m.ballRadius * 0.38)}
                        opacity={0.92}
                        style={{ userSelect: 'none' }}
                      >
                        {formatScore(m.scoreVal)}
                      </text>
                    )}
                  </g>
                );
              })}
            </g>
          )}

          {/* Direct On-Hover Instant Tooltip attached above/below the active ball */}
          {activeBall && (
            <g
              style={{ pointerEvents: 'none', transition: 'all 0.08s ease-out' }}
              transform={`translate(${activeBall.x}, ${activeBall.y})`}
            >
              {(() => {
                const titleLen = activeBall.title.length;
                const boxWidth = Math.max(165, Math.min(270, titleLen * 7.0 + 44));
                const boxHeight = 44;
                const isTopEdge = activeBall.y < 85;
                const offsetY = isTopEdge ? (activeBall.r + 8) : (-activeBall.r - boxHeight - 8);

                return (
                  <g transform={`translate(0, ${offsetY})`}>
                    {/* Pointer arrow */}
                    <polygon
                      points={isTopEdge ? `-6,0 6,0 0,-6` : `-6,${boxHeight} 6,${boxHeight} 0,${boxHeight + 6}`}
                      fill="#0f172a"
                    />
                    {/* Tooltip Background Card */}
                    <rect
                      x={-boxWidth / 2}
                      y={0}
                      width={boxWidth}
                      height={boxHeight}
                      rx="8"
                      ry="8"
                      fill="#0f172a"
                      stroke={activeBall.bg}
                      strokeWidth="1.8"
                      filter="url(#radar3dBallShadow)"
                    />
                    {/* Abbreviation badge */}
                    <rect
                      x={-boxWidth / 2 + 8}
                      y={7}
                      width={28}
                      height={18}
                      rx="4"
                      fill={activeBall.bg}
                    />
                    <text
                      x={-boxWidth / 2 + 22}
                      y={20}
                      textAnchor="middle"
                      fill={activeBall.textColor}
                      fontWeight="900"
                      fontSize="10"
                      letterSpacing="0.4px"
                    >
                      {activeBall.abbr}
                    </text>
                    {/* Full title text */}
                    <text
                      x={-boxWidth / 2 + 42}
                      y={20}
                      fill="#ffffff"
                      fontWeight="bold"
                      fontSize="11.5"
                    >
                      {activeBall.title.length > 29 ? `${activeBall.title.slice(0, 28)}…` : activeBall.title}
                    </text>
                    {/* Category & Score subline */}
                    <text
                      x={-boxWidth / 2 + 8}
                      y={35}
                      fill="#94a3b8"
                      fontSize="9.5"
                      fontWeight="500"
                    >
                      {activeBall.catLabel}
                    </text>
                    <text
                      x={boxWidth / 2 - 8}
                      y={35}
                      textAnchor="end"
                      fill={activeBall.scoreVal >= 3.0 ? "#f87171" : "#34d399"}
                      fontWeight="bold"
                      fontSize="9.5"
                    >
                      Score: {formatScore(activeBall.scoreVal)} {activeBall.scoreVal >= 3.0 ? '(≥ 3.0)' : ''}
                    </text>
                  </g>
                );
              })()}
            </g>
          )}
        </svg>
      </div>

      {/* Hover Card Preview with Full Front & Back Content (Positioned Top-Right without overlapping graph) */}
      {activeCardDetails && (
        <div
          onMouseEnter={handleCardMouseEnter}
          onMouseLeave={handleCardMouseLeave}
          style={{
            position: 'absolute',
            top: '70px',
            ...(canFitRight
              ? { left: 'calc(100% + 24px)', transform: 'none' }
              : { right: '8px', transform: 'scale(0.88)', transformOrigin: 'top right' }
            ),
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.35))',
            pointerEvents: 'auto',
            transition: 'opacity 0.15s ease'
          }}
        >
          {/* Flip Toggle Pills, Score Indicator & Close Button */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            marginBottom: '8px',
            background: 'rgba(15, 23, 42, 0.88)',
            backdropFilter: 'blur(8px)',
            padding: '4px 8px',
            borderRadius: '20px',
            border: '1px solid rgba(255,255,255,0.2)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.25)'
          }}>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (flipTimeoutRef.current) clearTimeout(flipTimeoutRef.current);
                setPopupFlipped(false);
              }}
              style={{
                border: 'none',
                background: !popupFlipped ? 'var(--primary, #3b82f6)' : 'transparent',
                color: !popupFlipped ? '#ffffff' : '#cbd5e1',
                padding: '4px 12px',
                borderRadius: '12px',
                fontSize: '0.78rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              Voorkant (Afbeelding)
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (flipTimeoutRef.current) clearTimeout(flipTimeoutRef.current);
                setPopupFlipped(true);
              }}
              style={{
                border: 'none',
                background: popupFlipped ? 'var(--primary, #3b82f6)' : 'transparent',
                color: popupFlipped ? '#ffffff' : '#cbd5e1',
                padding: '4px 12px',
                borderRadius: '12px',
                fontSize: '0.78rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              Achterkant (Theorie)
            </button>
            {activeCardDetails.scoreVal > 0 && (
              <span style={{
                background: 'rgba(255, 255, 255, 0.18)',
                color: '#ffffff',
                padding: '4px 10px',
                borderRadius: '12px',
                fontSize: '0.78rem',
                fontWeight: 'bold',
                marginLeft: '2px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                border: '1px solid rgba(255, 255, 255, 0.25)'
              }}>
                Score: {formatScore(activeCardDetails.scoreVal)}
              </span>
            )}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
                if (flipTimeoutRef.current) clearTimeout(flipTimeoutRef.current);
                setHoveredNode(null);
                setPopupFlipped(false);
              }}
              style={{
                border: 'none',
                background: 'rgba(255, 255, 255, 0.18)',
                color: '#cbd5e1',
                padding: '3px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                marginLeft: '2px'
              }}
              title="Sluit pop-up"
            >
              <X size={13} />
            </button>
          </div>

          {/* Interactive 3D Card */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              if (activeCardDetails.id === 'bk') {
                triggerSparkleRain();
              }
              if (flipTimeoutRef.current) clearTimeout(flipTimeoutRef.current);
              setPopupFlipped(prev => !prev);
            }}
            style={{ cursor: 'pointer' }}
            title="Klik om te draaien (voor/achter)"
          >
            <SchemaCard
              id={activeCardDetails.id}
              type={activeCardDetails.type}
              title={activeCardDetails.title}
              description={activeCardDetails.description}
              src={activeCardDetails.src}
              color={activeCardDetails.color}
              width="210px"
              height="298px"
              imageStyle={activeCardDetails.imageStyle}
              isFlipped={popupFlipped}
              flipOnClick={false}
              zoomOnClick={false}
            />
          </div>

          <div style={{
            marginTop: '8px',
            fontSize: '0.72rem',
            color: 'rgba(255,255,255,0.9)',
            background: 'rgba(0,0,0,0.65)',
            backdropFilter: 'blur(4px)',
            padding: '3px 10px',
            borderRadius: '6px',
            pointerEvents: 'none',
            letterSpacing: '0.3px',
            fontWeight: 500
          }}>
            Klik op kaart of tab om om te draaien
          </div>
        </div>
      )}

      {/* Klinische Casusconceptualisatie Panel (Score >= 3.0) */}
      {activeSide === 'both' && (
        <div className="no-print" style={{
          marginTop: '1.25rem',
          background: '#ffffff',
          borderRadius: '14px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
          overflow: 'hidden',
          transition: 'all 0.2s ease'
        }}>
          {/* Header with toggle */}
          <div
            onClick={() => setShowClinicalNotes(prev => !prev)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 18px',
              background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
              borderBottom: showClinicalNotes ? '1px solid #e2e8f0' : 'none',
              cursor: 'pointer'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                background: '#eff6ff',
                color: '#2563eb',
                padding: '6px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <BookOpen size={18} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: '#1e293b' }}>
                    Klinische Casusconceptualisatie (Verbanden Score ≥ 3.0)
                  </h4>
                  <span style={{
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    color: '#2563eb',
                    background: '#dbeafe',
                    padding: '2px 8px',
                    borderRadius: '10px'
                  }}>
                    {CLINICAL_DYNAMICS.length} actieve kernpatronen
                  </span>
                </div>
                <p style={{ margin: '2px 0 0', fontSize: '0.78rem', color: '#64748b' }}>
                  Wisselwerking tussen actieve schema's en geactiveerde modi van de cliënt
                </p>
              </div>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: '#64748b',
              fontSize: '0.8rem',
              fontWeight: 500
            }}>
              <span>{showClinicalNotes ? 'Inklappen' : 'Uitklappen'}</span>
              {showClinicalNotes ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>
          </div>

          {/* Collapsible Content */}
          {showClinicalNotes && (
            <div style={{ padding: '14px 18px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{
                fontSize: '0.82rem',
                color: '#475569',
                background: '#f8fafc',
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                lineHeight: 1.45
              }}>
                In de schematherapie zijn schema's en modi met een score <strong>≥ 3.0</strong> klinisch verheven en bepalend voor de actuele lijdensdruk en copingdynamiek. <strong>Klik op een patroon</strong> om de 3D-camera er direct naartoe te draaien en de energiestromen en hefbomen te focussen:
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {CLINICAL_DYNAMICS.map((dyn, idx) => {
                  const isHovered = hoveredDynamicId === dyn.id;
                  const isMatchingHoveredNode = matchingDynamicIds.includes(dyn.id);
                  const isActive = isHovered || isMatchingHoveredNode;

                  return (
                    <div
                      key={dyn.id}
                      onClick={() => {
                        if (viewDimension === '3d') {
                          rotateToDynamic(dyn);
                        }
                        setHoveredDynamicId(prev => prev === dyn.id ? null : dyn.id);
                      }}
                      onMouseEnter={() => setHoveredDynamicId(dyn.id)}
                      onMouseLeave={() => setHoveredDynamicId(null)}
                      style={{
                        padding: '12px 14px',
                        borderRadius: '10px',
                        border: isActive 
                          ? (dyn.isTherapeutic ? '1.5px solid #10b981' : '1.5px solid #3b82f6')
                          : '1px solid #e2e8f0',
                        background: isActive 
                          ? (dyn.isTherapeutic ? '#ecfdf5' : '#f0f7ff')
                          : '#ffffff',
                        boxShadow: isActive 
                          ? (dyn.isTherapeutic ? '0 4px 14px rgba(16, 185, 129, 0.16)' : '0 4px 14px rgba(59, 130, 246, 0.14)')
                          : 'none',
                        transition: 'all 0.18s ease',
                        cursor: 'pointer'
                      }}
                      title="Klik om de 3D-camera naar dit patroon te draaien"
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '6px', marginBottom: '6px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            background: isActive 
                              ? (dyn.isTherapeutic ? '#10b981' : '#2563eb')
                              : '#e2e8f0',
                            color: isActive ? '#ffffff' : '#475569',
                            fontSize: '0.72rem',
                            fontWeight: 700
                          }}>
                            {idx + 1}
                          </span>
                          <h5 style={{ margin: 0, fontSize: '0.88rem', fontWeight: 700, color: '#1e293b' }}>
                            {dyn.title}
                          </h5>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                          {dyn.isTherapeutic && (
                            <span style={{
                              fontSize: '0.72rem',
                              fontWeight: 700,
                              padding: '2px 7px',
                              borderRadius: '6px',
                              background: '#d1fae5',
                              color: '#065f46',
                              border: '1px solid #a7f3d0'
                            }}>
                              Therapeutische Hefboom
                            </span>
                          )}
                          {/* Schema Badges (Groen, conform radar) */}
                          {dyn.schemaAbbrs.map(sch => (
                            <span key={sch} style={{
                              fontSize: '0.72rem',
                              fontWeight: 700,
                              padding: '2px 7px',
                              borderRadius: '6px',
                              background: '#ecfdf5',
                              color: '#047857',
                              border: '1px solid #a7f3d0'
                            }}>
                              Schema: {sch}
                            </span>
                          ))}
                          {/* Mode Badges (Blauw, conform radar) */}
                          {dyn.modeAbbrs.map(md => (
                            <span key={md} style={{
                              fontSize: '0.72rem',
                              fontWeight: 700,
                              padding: '2px 7px',
                              borderRadius: '6px',
                              background: dyn.isTherapeutic ? '#ecfdf5' : '#eff6ff',
                              color: dyn.isTherapeutic ? '#047857' : '#1d4ed8',
                              border: dyn.isTherapeutic ? '1px solid #a7f3d0' : '1px solid #bfdbfe'
                            }}>
                              Modus: {md}
                            </span>
                          ))}
                        </div>
                      </div>

                      <p style={{ margin: 0, fontSize: '0.82rem', color: '#334155', lineHeight: 1.5 }}>
                        {dyn.summary}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Action button to proceed into Modus Web Casusconceptualisatie */}
      {showAction && (
        <div className="no-print" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '1.5rem', gap: '0.5rem' }}>
          <button
            onClick={handleOpenModusWeb}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
              color: 'white',
              border: 'none',
              padding: '10px 22px',
              borderRadius: '8px',
              fontSize: '0.95rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(37, 99, 235, 0.28)',
              transition: 'all 0.2s ease'
            }}
          >
            <Share2 size={18} /> Open in Modus Web (Casusconceptualisatie / Netwerkmodel) →
          </button>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center' }}>
            Draag deze scores over naar het netwerkmodel om interactief verbanden en moduscycli te tekenen.
          </span>
        </div>
      )}

      {/* Easter Egg: Oplichtende Huisstijl-sterren voor het Blije Kind */}
      {sparkles.length > 0 && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 999999,
          overflow: 'hidden'
        }}>
          {sparkles.map(s => (
            <div
              key={s.id}
              style={{
                position: 'absolute',
                top: `${s.top}vh`,
                left: `${s.left}vw`,
                color: s.color,
                opacity: 0,
                transform: 'scale(0)',
                transformOrigin: 'center center',
                animation: `sparkleTwinkle ${s.duration}s cubic-bezier(0.25, 1, 0.5, 1) ${s.delay}s both`,
                filter: `drop-shadow(0 0 10px ${s.color})`
              }}
            >
              <SuiteSparkle size={s.size} color={s.color} />
            </div>
          ))}

          {/* Toast Notification */}
          {showEasterEggToast && (
            <div style={{
              position: 'fixed',
              top: '24px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.94) 0%, rgba(30, 41, 59, 0.96) 100%)',
              backdropFilter: 'blur(12px)',
              color: '#ffffff',
              padding: '12px 28px',
              borderRadius: '30px',
              boxShadow: '0 12px 35px rgba(0, 0, 0, 0.45), 0 0 25px rgba(52, 211, 153, 0.45)',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              fontWeight: 700,
              fontSize: '0.92rem',
              letterSpacing: '0.3px',
              animation: 'easterEggToastPop 3.8s ease-in-out forwards',
              zIndex: 1000000
            }}>
              <SuiteSparkle size={22} color="#34d399" />
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', textAlign: 'center' }}>
                <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '0.5px' }}>
                  Blije Kind Ontwaakt!
                </span>
                <span style={{ fontSize: '0.78rem', fontWeight: 500, color: '#cbd5e1' }}>
                  Huisstijl-sterren lichten op: tijd voor speelsheid, verwondering en verbinding.
                </span>
              </div>
              <SuiteSparkle size={22} color="#facc15" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
