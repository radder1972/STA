import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { Share2, Rotate3d, Eye, Play, Pause, RotateCcw, ZoomIn, ZoomOut, Coins } from 'lucide-react';
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

export default function SmiRadarGraph({ scores, ysqScores, rawAnswers, onOpenModusWeb, showAction = true, initialDimension = '3d', initialSide = 'modi' }) {
  const [activeSide, setActiveSide] = useState(initialSide); // 'modi' or 'schemas'
  const [viewDimension, setViewDimension] = useState(initialDimension); // '2d' or '3d'
  const [hoveredNode, setHoveredNode] = useState(null);
  const [popupFlipped, setPopupFlipped] = useState(false);

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

    // 2. Calculate directly from rawAnswers if provided
    if (rawAnswers && (initialSide === 'schemas' || containsSchemaData(scores))) {
      const fromAnswers = calculateYsqFromAnswers(rawAnswers);
      if (fromAnswers && Object.keys(fromAnswers).length > 0) return fromAnswers;
    }

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

    // 2. Calculate directly from rawAnswers if provided
    if (rawAnswers && (initialSide === 'modi' || containsModeData(scores))) {
      const fromAnswers = calculateSmiFromAnswers(rawAnswers);
      if (fromAnswers && Object.keys(fromAnswers).length > 0) return fromAnswers;
    }

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
  }, []);

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

  // 1. Calculate 3D points for Schemas (Inner ring in dual mode, or full ring in single mode)
  const schemaItems3D = useMemo(() => {
    const n = SCHEMAS_INFO.length; // 18
    const isDual = activeSide === 'both';
    const rMax = isDual ? 110 : 180;
    const rBall = isDual ? 160 : 252;
    const elevFactor = isDual ? 18 : 25;
    const baseRadius = isDual ? 13.5 : 18;

    return SCHEMAS_INFO.map((item, idx) => {
      const angle = -Math.PI / 2 + idx * ((2 * Math.PI) / n);
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);

      const scoreVal = getScoreForItem(normalizedSchemaScores, item);
      const ratio = Math.min(Math.max(scoreVal / 6, 0.08), 1);

      const elevation = scoreVal * elevFactor;
      const peakX = rMax * ratio * cosA;
      const peakZ = rMax * ratio * sinA;
      const peakY = -elevation;

      const groundX = rMax * ratio * cosA;
      const groundZ = rMax * ratio * sinA;

      const ballX = rBall * cosA;
      const ballZ = rBall * sinA;
      const ballY = -(scoreVal * (isDual ? 7 : 10));

      const projPeak = project3D(peakX, peakY, peakZ, pitchRad, yawRad, zoom, cx, cy);
      const projGround = project3D(groundX, 0, groundZ, pitchRad, yawRad, zoom, cx, cy);
      const projBall = project3D(ballX, ballY, ballZ, pitchRad, yawRad, zoom, cx, cy);

      const scale = scoreVal === 0 ? 0.7 : 0.6 + scoreVal * 0.25;
      const ballRadius = Math.max(isDual ? 11 : 13, baseRadius * scale * (viewDimension === '3d' ? projBall.scale : 1));

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
        ballX,
        ballZ,
        projPeak,
        projGround,
        projBall,
        ballRadius,
        bg,
        textColor,
        elevation
      };
    });
  }, [normalizedSchemaScores, activeSide, pitchRad, yawRad, zoom, cx, cy, viewDimension]);

  // 2. Calculate 3D points for Modi (Outer ring in dual mode, or full ring in single mode)
  const modiItems3D = useMemo(() => {
    const n = MODES_INFO.length; // 14
    const isDual = activeSide === 'both';
    const rBase = 192;
    const rSpan = 56; // 192 to 248
    const rMaxSingle = 180;
    const rBall = isDual ? 282 : 252;
    const elevFactor = isDual ? 26 : 25;
    const baseRadius = isDual ? 19.5 : 21;

    return MODES_INFO.map((item, idx) => {
      const angle = -Math.PI / 2 + idx * ((2 * Math.PI) / n);
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);

      const scoreVal = getScoreForItem(normalizedModiScores, item);
      const ratio = Math.min(Math.max(scoreVal / 6, 0.08), 1);

      const elevation = scoreVal * elevFactor;
      const peakRadius = isDual ? (rBase + ratio * rSpan) : (rMaxSingle * ratio);
      const peakX = peakRadius * cosA;
      const peakZ = peakRadius * sinA;
      const peakY = -elevation;

      const groundX = peakRadius * cosA;
      const groundZ = peakRadius * sinA;

      const baseFloorX = (isDual ? rBase : 0) * cosA;
      const baseFloorZ = (isDual ? rBase : 0) * sinA;

      const ballX = rBall * cosA;
      const ballZ = rBall * sinA;
      const ballY = -(scoreVal * 10);

      const projPeak = project3D(peakX, peakY, peakZ, pitchRad, yawRad, zoom, cx, cy);
      const projGround = project3D(groundX, 0, groundZ, pitchRad, yawRad, zoom, cx, cy);
      const projBaseFloor = project3D(baseFloorX, 0, baseFloorZ, pitchRad, yawRad, zoom, cx, cy);
      const projBall = project3D(ballX, ballY, ballZ, pitchRad, yawRad, zoom, cx, cy);

      const scale = scoreVal === 0 ? 0.7 : 0.6 + scoreVal * 0.25;
      const ballRadius = Math.max(13, baseRadius * scale * (viewDimension === '3d' ? projBall.scale : 1));

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
  }, [normalizedModiScores, activeSide, pitchRad, yawRad, zoom, cx, cy, viewDimension]);

  // Combined 3D items for active side
  const items3D = useMemo(() => {
    if (activeSide === 'both') {
      return [...schemaItems3D, ...modiItems3D];
    }
    return activeSide === 'modi' ? modiItems3D : schemaItems3D;
  }, [activeSide, schemaItems3D, modiItems3D]);

  // 3. Facets calculation (Combined crystal canopies)
  const { facets, projApexSchema, projApexModi } = useMemo(() => {
    const lightDir = normalize([0.4, -0.9, 0.45]);
    const facetList = [];

    // Inner Schemas Canopy (Emerald)
    if (activeSide === 'both' || activeSide === 'schemas') {
      const nSchema = schemaItems3D.length;
      const avgElevSchema = schemaItems3D.reduce((sum, m) => sum + m.elevation, 0) / nSchema;
      const apexHeightSchema = -(avgElevSchema * 1.15 + 14);
      const pApexSchema = project3D(0, apexHeightSchema, 0, pitchRad, yawRad, zoom, cx, cy);
      const schemaColor = '16, 185, 129'; // emerald

      for (let i = 0; i < nSchema; i++) {
        const nextIdx = (i + 1) % nSchema;
        const m1 = schemaItems3D[i];
        const m2 = schemaItems3D[nextIdx];

        const v1 = [m1.peakX, m1.peakY - apexHeightSchema, m1.peakZ];
        const v2 = [m2.peakX, m2.peakY - apexHeightSchema, m2.peakZ];
        const norm = normalize(crossProduct(v1, v2));

        const lightDot = Math.abs(dot(norm, lightDir));
        const intensity = Math.max(0.18, Math.min(0.85, lightDot * 0.6 + 0.25));
        const avgDepth = (pApexSchema.depth + m1.projPeak.depth + m2.projPeak.depth) / 3;

        facetList.push({
          pts: `${pApexSchema.screenX.toFixed(1)},${pApexSchema.screenY.toFixed(1)} ${m1.projPeak.screenX.toFixed(1)},${m1.projPeak.screenY.toFixed(1)} ${m2.projPeak.screenX.toFixed(1)},${m2.projPeak.screenY.toFixed(1)}`,
          intensity,
          avgDepth,
          idx: `schema-${i}`,
          color: schemaColor
        });
      }

      if (activeSide === 'schemas') {
        facetList.sort((a, b) => b.avgDepth - a.avgDepth);
        return { facets: facetList, projApexSchema: pApexSchema, projApexModi: null };
      }
    }

    // Outer Modi Canopy / Ridge (Sapphire Blue)
    if (activeSide === 'both' || activeSide === 'modi') {
      const nModi = modiItems3D.length;
      const modiColor = '59, 130, 246'; // sapphire blue

      if (activeSide === 'both') {
        // In dual mode, outer modi form a crystalline caldera / mountain ridge surrounding the schema center
        for (let i = 0; i < nModi; i++) {
          const nextIdx = (i + 1) % nModi;
          const m1 = modiItems3D[i];
          const m2 = modiItems3D[nextIdx];

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
            idx: `modi-a-${i}`,
            color: modiColor
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
            idx: `modi-b-${i}`,
            color: modiColor
          });
        }
      } else {
        // In single modi mode, classic single peak canopy
        const avgElevModi = modiItems3D.reduce((sum, m) => sum + m.elevation, 0) / nModi;
        const apexHeightModi = -(avgElevModi * 1.15 + 15);
        const pApexModi = project3D(0, apexHeightModi, 0, pitchRad, yawRad, zoom, cx, cy);

        for (let i = 0; i < nModi; i++) {
          const nextIdx = (i + 1) % nModi;
          const m1 = modiItems3D[i];
          const m2 = modiItems3D[nextIdx];

          const v1 = [m1.peakX, m1.peakY - apexHeightModi, m1.peakZ];
          const v2 = [m2.peakX, m2.peakY - apexHeightModi, m2.peakZ];
          const norm = normalize(crossProduct(v1, v2));

          const lightDot = Math.abs(dot(norm, lightDir));
          const intensity = Math.max(0.18, Math.min(0.85, lightDot * 0.6 + 0.25));
          const avgDepth = (pApexModi.depth + m1.projPeak.depth + m2.projPeak.depth) / 3;

          facetList.push({
            pts: `${pApexModi.screenX.toFixed(1)},${pApexModi.screenY.toFixed(1)} ${m1.projPeak.screenX.toFixed(1)},${m1.projPeak.screenY.toFixed(1)} ${m2.projPeak.screenX.toFixed(1)},${m2.projPeak.screenY.toFixed(1)}`,
            intensity,
            avgDepth,
            idx: `modi-${i}`,
            color: modiColor
          });
        }
        facetList.sort((a, b) => b.avgDepth - a.avgDepth);
        return { facets: facetList, projApexSchema: null, projApexModi: pApexModi };
      }
    }

    facetList.sort((a, b) => b.avgDepth - a.avgDepth);
    const avgElevSchema = schemaItems3D.reduce((sum, m) => sum + m.elevation, 0) / schemaItems3D.length;
    const pApexSchema = project3D(0, -(avgElevSchema * 1.15 + 14), 0, pitchRad, yawRad, zoom, cx, cy);
    return { facets: facetList, projApexSchema: pApexSchema, projApexModi: null };
  }, [activeSide, schemaItems3D, modiItems3D, pitchRad, yawRad, zoom, cx, cy]);

  // 4. Concentric 3D Floor Grid Polygons
  const floorGridRings = useMemo(() => {
    if (activeSide === 'both') {
      // Inner Schemas Grid (levels 2, 4, 6)
      const innerRings = [2, 4, 6].map(lvl => {
        const r = 110 * (lvl / 6);
        const pts = [];
        const n = schemaItems3D.length;
        for (let i = 0; i < n; i++) {
          const angle = -Math.PI / 2 + i * ((2 * Math.PI) / n);
          const p = project3D(r * Math.cos(angle), 0, r * Math.sin(angle), pitchRad, yawRad, zoom, cx, cy);
          pts.push(`${p.screenX.toFixed(1)},${p.screenY.toFixed(1)}`);
        }
        return { key: `inner-${lvl}`, lvl, pts: pts.join(' '), color: '#cbd5e1' };
      });

      // Outer Modi Grid (levels 2, 4, 6)
      const outerRings = [2, 4, 6].map(lvl => {
        const r = 192 + (lvl / 6) * 56;
        const pts = [];
        const n = modiItems3D.length;
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
  }, [activeSide, schemaItems3D, modiItems3D, pitchRad, yawRad, zoom, cx, cy]);

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
      const targets = SCHEMA_TO_MODI_MAP[schema.id] || [];
      targets.forEach(targetId => {
        const mode = modiItems3D.find(m => m.id === targetId || SMI_KEY_TO_ID[m.id] === targetId || (m.id === 'boos_k' && targetId === 'wk') || (m.id === 'wk' && targetId === 'boos_k'));
        if (mode) {
          const isSchemaHovered = hoveredNode && (hoveredNode.id === schema.id || hoveredNode.abbr === schema.abbr);
          const isModeHovered = hoveredNode && (hoveredNode.id === mode.id || hoveredNode.abbr === mode.abbr || SMI_KEY_TO_ID[hoveredNode.id] === mode.id);
          const isHighlighted = isSchemaHovered || isModeHovered;

          links.push({
            key: `${schema.id}-${mode.id}`,
            schema,
            mode,
            isHighlighted,
            isDimmed: hoveredNode && !isHighlighted,
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
  }, [activeSide, schemaItems3D, modiItems3D, hoveredNode]);

  // 6. Depth-Sorted Balls (Painter's algorithm for complete 3D scene)
  const depthSortedBalls = useMemo(() => {
    return [...items3D].sort((a, b) => b.projBall.depth - a.projBall.depth);
  }, [items3D]);

  // 7. 2D Classic Static Data (Dual Concentric & Single)
  const schemaItems2D = useMemo(() => {
    const n = SCHEMAS_INFO.length;
    const isDual = activeSide === 'both';
    const rMax = isDual ? 110 : 180;
    const rBall = isDual ? 160 : 252;
    const baseRadius = isDual ? 13.5 : 18;

    return SCHEMAS_INFO.map((item, idx) => {
      const angle = -Math.PI / 2 + idx * ((2 * Math.PI) / n);
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);
      const ballX = cx + rBall * cosA;
      const ballY = cy + rBall * sinA;

      const scoreVal = getScoreForItem(normalizedSchemaScores, item);
      const ratio = Math.min(Math.max(scoreVal / 6, 0), 1);
      const ptX = cx + (rMax * ratio) * cosA;
      const ptY = cy + (rMax * ratio) * sinA;

      const scale = scoreVal === 0 ? 0.7 : 0.6 + scoreVal * 0.25;
      const ballRadius = Math.max(isDual ? 11 : 13, baseRadius * scale);

      const categoryKey = item.domain;
      const bg = scoreVal < 3.0 ? LIGHT_CATEGORY_COLORS[categoryKey] : CATEGORY_COLORS[categoryKey];
      const textColor = (scoreVal < 3.0 || isCopingOrDomain(item)) ? '#451a03' : '#ffffff';

      return { ...item, itemType: 'schema', scoreVal, ballX, ballY, ptX, ptY, ballRadius, bg, textColor, cosA, sinA };
    });
  }, [normalizedSchemaScores, activeSide, cx, cy]);

  const modiItems2D = useMemo(() => {
    const n = MODES_INFO.length;
    const isDual = activeSide === 'both';
    const rBase = 192;
    const rSpan = 56;
    const rMaxSingle = 180;
    const rBall = isDual ? 282 : 252;
    const baseRadius = isDual ? 19.5 : 21;

    return MODES_INFO.map((item, idx) => {
      const angle = -Math.PI / 2 + idx * ((2 * Math.PI) / n);
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);
      const ballX = cx + rBall * cosA;
      const ballY = cy + rBall * sinA;

      const scoreVal = getScoreForItem(normalizedModiScores, item);
      const ratio = Math.min(Math.max(scoreVal / 6, 0), 1);
      const ptRadius = isDual ? (rBase + ratio * rSpan) : (rMaxSingle * ratio);
      const ptX = cx + ptRadius * cosA;
      const ptY = cy + ptRadius * sinA;

      const scale = scoreVal === 0 ? 0.7 : 0.6 + scoreVal * 0.25;
      const ballRadius = Math.max(13, baseRadius * scale);

      const categoryKey = item.category;
      const bg = scoreVal < 3.0 ? LIGHT_CATEGORY_COLORS[categoryKey] : CATEGORY_COLORS[categoryKey];
      const textColor = (scoreVal < 3.0 || isCopingOrDomain(item)) ? '#451a03' : '#ffffff';

      return { ...item, itemType: 'mode', scoreVal, ballX, ballY, ptX, ptY, ballRadius, bg, textColor, cosA, sinA };
    });
  }, [normalizedModiScores, activeSide, cx, cy]);

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
      const targets = SCHEMA_TO_MODI_MAP[schema.id] || [];
      targets.forEach(targetId => {
        const mode = modiItems2D.find(m => m.id === targetId || SMI_KEY_TO_ID[m.id] === targetId || (m.id === 'boos_k' && targetId === 'wk') || (m.id === 'wk' && targetId === 'boos_k'));
        if (mode) {
          const isSchemaHovered = hoveredNode && (hoveredNode.id === schema.id || hoveredNode.abbr === schema.abbr);
          const isModeHovered = hoveredNode && (hoveredNode.id === mode.id || hoveredNode.abbr === mode.abbr || SMI_KEY_TO_ID[hoveredNode.id] === mode.id);
          const isHighlighted = isSchemaHovered || isModeHovered;

          links.push({
            key: `2d-${schema.id}-${mode.id}`,
            schema,
            mode,
            isHighlighted,
            isDimmed: hoveredNode && !isHighlighted,
            x1: schema.ballX,
            y1: schema.ballY,
            x2: mode.ballX,
            y2: mode.ballY
          });
        }
      });
    });

    return links.sort((a, b) => (a.isHighlighted ? 1 : 0) - (b.isHighlighted ? 1 : 0));
  }, [activeSide, schemaItems2D, modiItems2D, hoveredNode]);

  const schemaPolygonPoints2D = useMemo(() => schemaItems2D.map(m => `${m.ptX.toFixed(1)},${m.ptY.toFixed(1)}`).join(' '), [schemaItems2D]);
  const modiPolygonPoints2D = useMemo(() => modiItems2D.map(m => `${m.ptX.toFixed(1)},${m.ptY.toFixed(1)}`).join(' '), [modiItems2D]);

  const gridLevels2D = useMemo(() => {
    if (activeSide === 'both') {
      const inner = [2, 4, 6].map(lvl => {
        const ratio = lvl / 6;
        const pts = schemaItems2D.map(m => `${(cx + 110 * ratio * m.cosA).toFixed(1)},${(cy + 110 * ratio * m.sinA).toFixed(1)}`).join(' ');
        return { key: `2d-inner-${lvl}`, lvl, pts, color: '#cbd5e1' };
      });
      const outer = [2, 4, 6].map(lvl => {
        const ratio = lvl / 6;
        const r = 192 + ratio * 56;
        const pts = modiItems2D.map(m => `${(cx + r * m.cosA).toFixed(1)},${(cy + r * m.sinA).toFixed(1)}`).join(' ');
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
  }, [activeSide, schemaItems2D, modiItems2D, cx, cy]);

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
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
            <span style={{
              fontSize: '0.84rem', fontWeight: 'bold', color: '#0f172a', background: '#f8fafc',
              padding: '4px 14px', borderRadius: '20px', border: '1px solid #cbd5e1',
              display: 'inline-flex', alignItems: 'center', gap: '8px'
            }}>
              <span style={{ display: 'inline-block', width: '9px', height: '9px', borderRadius: '50%', background: '#10b981' }}></span>
              Binnenring: 18 Schema's (Diepe wortels)
              <span style={{ color: '#94a3b8' }}>•</span>
              <span style={{ display: 'inline-block', width: '9px', height: '9px', borderRadius: '50%', background: '#3b82f6' }}></span>
              Buitenring: 14 Modi (Actuele expressie)
            </span>
            <span style={{ fontSize: '0.76rem', color: '#64748b' }}>
              Beweeg over een bol om de theoretische koppeling tussen schema en modus in goud op te lichten
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
              {items3D.map(m => (
                <line
                  key={`axis-${m.itemType}-${m.id}`}
                  x1={m.itemType === 'mode' && activeSide === 'both' ? m.projBaseFloor.screenX : projCenter.screenX}
                  y1={m.itemType === 'mode' && activeSide === 'both' ? m.projBaseFloor.screenY : projCenter.screenY}
                  x2={m.projBall.screenX}
                  y2={m.projBall.screenY}
                  stroke="#f1f5f9"
                  strokeWidth="1.6"
                />
              ))}

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

              {/* 3D Correlation Links between Schemas and Modi */}
              {activeSide === 'both' && correlationLinks3D.map(link => (
                <line
                  key={`link-3d-${link.key}`}
                  x1={link.x1}
                  y1={link.y1}
                  x2={link.x2}
                  y2={link.y2}
                  stroke={link.isHighlighted ? "#f59e0b" : "#94a3b8"}
                  strokeWidth={link.isHighlighted ? 3 : 1.1}
                  strokeDasharray={link.isHighlighted ? "none" : "3 3"}
                  opacity={link.isHighlighted ? 0.95 : (link.isDimmed ? 0.04 : 0.16)}
                  strokeLinecap="round"
                  style={{
                    transition: 'stroke 0.2s, stroke-width 0.2s, opacity 0.2s',
                    filter: link.isHighlighted ? 'drop-shadow(0 0 6px rgba(245, 158, 11, 0.8))' : 'none'
                  }}
                />
              ))}

              {/* Depth-Sorted Outer 3D Mode/Schema Balls (NO WHITE BORDER) */}
              {depthSortedBalls.map(m => {
                const isLinked = isLinkedPartner(m, hoveredNode);
                const isHovered = hoveredNode && (hoveredNode.id === m.id || hoveredNode.abbr === m.abbr);

                return (
                  <g
                    key={`ball-3d-${m.itemType}-${m.id}`}
                    transform={`translate(${m.projBall.screenX}, ${m.projBall.screenY})`}
                    style={{ cursor: 'pointer' }}
                    onMouseEnter={() => handleNodeHover(m)}
                    onMouseLeave={handleNodeLeave}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (flipTimeoutRef.current) clearTimeout(flipTimeoutRef.current);
                      setPopupFlipped(prev => !prev);
                    }}
                  >
                    {/* Linked Partner Golden Pulse Ring */}
                    {isLinked && (
                      <circle
                        r={m.ballRadius + 4.5}
                        fill="none"
                        stroke="#f59e0b"
                        strokeWidth="2.2"
                        strokeDasharray="4 2"
                        opacity="0.95"
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
              {items2D.map(m => (
                <line
                  key={`axis-2d-${m.itemType}-${m.id}`}
                  x1={m.itemType === 'mode' && activeSide === 'both' ? (cx + 192 * m.cosA) : cx}
                  y1={m.itemType === 'mode' && activeSide === 'both' ? (cy + 192 * m.sinA) : cy}
                  x2={m.ballX}
                  y2={m.ballY}
                  stroke="#f1f5f9"
                  strokeWidth="2"
                />
              ))}

              {/* 2D Correlation Links */}
              {activeSide === 'both' && correlationLinks2D.map(link => (
                <line
                  key={`link-2d-${link.key}`}
                  x1={link.x1}
                  y1={link.y1}
                  x2={link.x2}
                  y2={link.y2}
                  stroke={link.isHighlighted ? "#f59e0b" : "#94a3b8"}
                  strokeWidth={link.isHighlighted ? 3 : 1.1}
                  strokeDasharray={link.isHighlighted ? "none" : "3 3"}
                  opacity={link.isHighlighted ? 0.95 : (link.isDimmed ? 0.04 : 0.16)}
                  strokeLinecap="round"
                  style={{
                    transition: 'stroke 0.2s, stroke-width 0.2s, opacity 0.2s',
                    filter: link.isHighlighted ? 'drop-shadow(0 0 6px rgba(245, 158, 11, 0.8))' : 'none'
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

                return (
                  <g
                    key={`ball-2d-${m.itemType}-${m.id}`}
                    transform={`translate(${m.ballX}, ${m.ballY})`}
                    style={{ cursor: 'pointer' }}
                    onMouseEnter={() => handleNodeHover(m)}
                    onMouseLeave={handleNodeLeave}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (flipTimeoutRef.current) clearTimeout(flipTimeoutRef.current);
                      setPopupFlipped(prev => !prev);
                    }}
                  >
                    {/* Linked Partner Golden Pulse Ring */}
                    {isLinked && (
                      <circle
                        r={m.ballRadius + 4.5}
                        fill="none"
                        stroke="#f59e0b"
                        strokeWidth="2.2"
                        strokeDasharray="4 2"
                        opacity="0.95"
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
        </svg>
      </div>

      {/* Hover Card Preview with Full Front & Back Content */}
      {activeCardDetails && (
        <div
          onMouseEnter={handleCardMouseEnter}
          onMouseLeave={handleCardMouseLeave}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.45))',
            pointerEvents: 'auto'
          }}
        >
          {/* Flip Toggle Pills & Score Indicator */}
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
          </div>

          {/* Interactive 3D Card */}
          <div
            onClick={(e) => {
              e.stopPropagation();
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
    </div>
  );
}
