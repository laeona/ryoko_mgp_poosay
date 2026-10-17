import type { RegionId } from '../../data/setting';

/* All artwork here is drawn in code: simple, stylised scenes and emblems. */

/* ---------- Map of Mato ---------- */

interface MapProps {
  selected: RegionId;
  onSelect: (id: RegionId) => void;
}

const MAP_REGIONS: Array<{
  id: RegionId;
  label: string;
  kanji: string;
  fill: string;
  text: string;
  d: string;
  tx: number;
  ty: number;
}> = [
  { id: 'north', label: 'Hakame', kanji: '玄武', fill: '#22304d', text: '#dbe7ff', d: 'M80 20 H320 Q336 20 332 36 L292 120 H108 L68 36 Q64 20 80 20 Z', tx: 200, ty: 70 },
  { id: 'west', label: 'Kurenai-Gaoka', kanji: '白虎', fill: '#ece6d6', text: '#7a1020', d: 'M20 80 Q20 64 36 68 L120 108 V292 L36 332 Q20 336 20 320 Z', tx: 68, ty: 205 },
  { id: 'east', label: 'Tento', kanji: '青龍', fill: '#2a8fa8', text: '#ffffff', d: 'M380 80 Q380 64 364 68 L280 108 V292 L364 332 Q380 336 380 320 Z', tx: 332, ty: 205 },
  { id: 'south', label: 'Nankin', kanji: '朱雀', fill: '#c8321f', text: '#fff1e8', d: 'M108 280 H292 L332 364 Q336 380 320 380 H80 Q64 380 68 364 Z', tx: 200, ty: 340 },
];

export function MatoMap({ selected, onSelect }: MapProps) {
  const pick = (id: RegionId) => () => onSelect(id);
  const key = (id: RegionId) => (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(id);
    }
  };
  return (
    <svg viewBox="0 0 400 400" className="w-full h-auto max-w-md mx-auto" role="img" aria-label="Map of Mato's five districts">
      <defs>
        <radialGradient id="mapCentre" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#ffe9a0" />
          <stop offset="1" stopColor="#c9981f" />
        </radialGradient>
        <pattern id="craterHatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
          <line x1="0" y1="0" x2="0" y2="6" stroke="#7d1608" strokeWidth="1.4" opacity="0.45" />
        </pattern>
      </defs>
      {MAP_REGIONS.map((r) => (
        <g
          key={r.id}
          role="button"
          tabIndex={0}
          aria-label={`${r.label}, ${r.kanji}`}
          aria-pressed={selected === r.id}
          onClick={pick(r.id)}
          onKeyDown={key(r.id)}
          style={{ cursor: 'pointer', outline: 'none' }}
        >
          <path
            d={r.d}
            fill={r.fill}
            stroke={selected === r.id ? '#d1a53c' : 'rgba(27,27,47,0.35)'}
            strokeWidth={selected === r.id ? 4 : 1.5}
            strokeLinejoin="round"
          />
          {r.id === 'south' && (
            <>
              <path d={r.d} fill="url(#craterHatch)" />
              <ellipse cx="200" cy="320" rx="52" ry="20" fill="#3a0d07" opacity="0.75" />
              <ellipse cx="200" cy="318" rx="34" ry="11" fill="#1c0604" opacity="0.8" />
            </>
          )}
          <text x={r.tx} y={r.ty} textAnchor="middle" fontSize="26" fontWeight="800" fill={r.text} fontFamily="'Shippori Mincho', serif">
            {r.kanji}
          </text>
          <text x={r.tx} y={r.ty + 18} textAnchor="middle" fontSize="11" fill={r.text} opacity="0.9">
            {r.label}
          </text>
        </g>
      ))}
      <g
        role="button"
        tabIndex={0}
        aria-label="Shinbashira, 黄龍"
        aria-pressed={selected === 'centre'}
        onClick={pick('centre')}
        onKeyDown={key('centre')}
        style={{ cursor: 'pointer', outline: 'none' }}
      >
        <circle cx="200" cy="200" r="70" fill="url(#mapCentre)" stroke={selected === 'centre' ? '#bf3a1d' : '#8a6a14'} strokeWidth={selected === 'centre' ? 4 : 2} />
        <circle cx="200" cy="200" r="58" fill="none" stroke="#8a6a14" strokeWidth="1" opacity="0.6" />
        <text x="200" y="204" textAnchor="middle" fontSize="30" fontWeight="800" fill="#3b2a05" fontFamily="'Shippori Mincho', serif">
          黄龍
        </text>
        <text x="200" y="224" textAnchor="middle" fontSize="11" fill="#3b2a05">
          Shinbashira
        </text>
      </g>
    </svg>
  );
}

/* ---------- Region scenes ---------- */

const MAPLE =
  'M0 -8 L2 -3 L7 -5 L5 0 L9 2 L4 3 L5 8 L0 5 L-5 8 L-4 3 L-9 2 L-5 0 L-7 -5 L-2 -3 Z';

export function RegionScene({ id }: { id: RegionId }) {
  return (
    <svg viewBox="0 0 320 160" className="w-full h-auto block" role="img" aria-label={`Illustration of the ${id} district`} preserveAspectRatio="xMidYMid slice">
      {id === 'west' && <WestScene />}
      {id === 'north' && <NorthScene />}
      {id === 'south' && <SouthScene />}
      {id === 'east' && <EastScene />}
      {id === 'centre' && <CentreScene />}
    </svg>
  );
}

function WestScene() {
  const lanternsY = [34, 40, 34, 42, 36];
  return (
    <>
      <defs>
        <linearGradient id="westSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1a0a10" />
          <stop offset="1" stopColor="#5a1220" />
        </linearGradient>
      </defs>
      <rect width="320" height="160" fill="url(#westSky)" />
      {/* buildings */}
      <g fill="#0d0508">
        <rect x="0" y="86" width="70" height="74" />
        <rect x="76" y="70" width="60" height="90" />
        <rect x="142" y="92" width="64" height="68" />
        <rect x="212" y="64" width="58" height="96" />
        <rect x="276" y="84" width="44" height="76" />
      </g>
      {/* lit lattice windows */}
      <g fill="#ffb347" opacity="0.8">
        {[[12, 100], [40, 100], [86, 86], [110, 86], [86, 116], [110, 116], [152, 106], [180, 106], [222, 80], [246, 80], [222, 110], [246, 110], [286, 100], [304, 100]].map(([x, y], i) => (
          <rect key={i} x={x} y={y} width="12" height="14" rx="1" />
        ))}
      </g>
      {/* roofs */}
      <g fill="#3a1018">
        <path d="M-4 86 L35 70 L74 86 Z" />
        <path d="M72 70 L106 54 L140 70 Z" />
        <path d="M208 64 L241 48 L274 64 Z" />
      </g>
      {/* lantern string */}
      <path d="M0 22 Q80 44 160 22 T320 22" fill="none" stroke="#d1a53c" strokeWidth="1" opacity="0.8" />
      {lanternsY.map((y, i) => (
        <g key={i} transform={`translate(${30 + i * 65} ${y})`}>
          <ellipse cx="0" cy="8" rx="9" ry="11" fill="#e0182d" />
          <rect x="-4" y="-3" width="8" height="3" fill="#111" />
          <rect x="-4" y="19" width="8" height="3" fill="#111" />
          <ellipse cx="0" cy="8" rx="16" ry="18" fill="#ff4a4a" opacity="0.18" />
        </g>
      ))}
      {/* falling maple leaves */}
      {[[40, 20, 20, 1], [120, 50, -30, 0.8], [200, 30, 40, 1.1], [270, 60, 10, 0.9], [90, 110, 60, 0.8], [230, 120, -20, 1]].map(([x, y, r, s], i) => (
        <path key={i} d={MAPLE} transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} fill={i % 2 ? '#f08a24' : '#d9481f'} />
      ))}
    </>
  );
}

function NorthScene() {
  return (
    <>
      <defs>
        <linearGradient id="northSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8fa6c8" />
          <stop offset="1" stopColor="#dbe6f4" />
        </linearGradient>
        <linearGradient id="northLake" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#35557f" />
          <stop offset="1" stopColor="#1c2f50" />
        </linearGradient>
      </defs>
      <rect width="320" height="160" fill="url(#northSky)" />
      <path d="M0 96 L50 46 L88 80 L130 36 L180 90 L230 52 L280 88 L320 60 V104 H0 Z" fill="#5c6f93" />
      <path d="M130 36 L116 54 L130 50 L142 56 Z M50 46 L38 60 L50 56 L60 62 Z M230 52 L218 66 L230 62 L240 68 Z" fill="#ffffff" opacity="0.9" />
      <rect y="98" width="320" height="62" fill="url(#northLake)" />
      {/* floating ice cubes */}
      <g fill="#eaf4ff" stroke="#bcd3ee" strokeWidth="1">
        {[[24, 112, 18], [70, 128, 24], [118, 108, 16], [160, 130, 22], [210, 112, 20], [256, 126, 26], [292, 108, 14]].map(([x, y, s], i) => (
          <rect key={i} x={x} y={y} width={s} height={s * 0.7} rx="3" transform={`rotate(${(i % 3) * 6 - 6} ${x} ${y})`} />
        ))}
      </g>
      {/* light flurry */}
      <g fill="#ffffff" opacity="0.85">
        {[[20, 20], [60, 40], [100, 18], [150, 30], [190, 14], [240, 34], [290, 22], [270, 70], [130, 76], [40, 80]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i % 3 ? 1.6 : 2.4} />
        ))}
      </g>
    </>
  );
}

function SouthScene() {
  return (
    <>
      <defs>
        <linearGradient id="southSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5a1a10" />
          <stop offset="0.6" stopColor="#d9481f" />
          <stop offset="1" stopColor="#f2a23a" />
        </linearGradient>
      </defs>
      <rect width="320" height="160" fill="url(#southSky)" />
      {/* ghost of the Vermilion Bird */}
      <g opacity="0.28" fill="#ffd9b0" transform="translate(190 20)">
        <path d="M0 30 Q30 -10 70 14 Q40 12 26 34 Q50 30 62 46 Q34 42 14 54 Z" />
        <path d="M0 30 Q-30 40 -40 62 Q-14 46 8 44 Z" />
      </g>
      <path d="M0 106 Q60 96 110 112 L210 112 Q262 96 320 108 V160 H0 Z" fill="#7a2a14" />
      {/* crater */}
      <ellipse cx="160" cy="124" rx="96" ry="22" fill="#2a0c06" />
      <ellipse cx="160" cy="122" rx="70" ry="14" fill="#140503" />
      <path d="M96 118 L74 108 M224 118 L246 106 M160 138 L162 154" stroke="#3a1008" strokeWidth="2" />
      {/* debris */}
      <g fill="#3a1a12">
        <path d="M30 118 l14 -10 l12 10 z" />
        <path d="M262 122 l10 -14 l14 14 z" />
        <rect x="120" y="102" width="8" height="8" transform="rotate(20 124 106)" />
        <rect x="206" y="104" width="6" height="6" transform="rotate(-18 209 107)" />
      </g>
      {/* rebuilding cranes and scaffolds */}
      <g stroke="#f4d9a8" strokeWidth="1.6" fill="none">
        <path d="M44 100 V70 H74 M44 76 L58 70" />
        <path d="M278 100 V74 H252 M278 80 L266 74" />
        <path d="M296 100 V90 M290 94 H302" />
      </g>
    </>
  );
}

function EastScene() {
  return (
    <>
      <defs>
        <linearGradient id="eastSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5db4cc" />
          <stop offset="1" stopColor="#d3f0f2" />
        </linearGradient>
      </defs>
      <rect width="320" height="160" fill="url(#eastSky)" />
      {/* jade pillars */}
      <g fill="#2f9a6e">
        {[48, 110, 172, 234, 290].map((x, i) => (
          <rect key={i} x={x - 7} y={92} width="14" height="70" />
        ))}
      </g>
      <g fill="#6fd3a4" opacity="0.6">
        {[48, 110, 172, 234, 290].map((x, i) => (
          <rect key={i} x={x - 7} y={92} width="4" height="70" />
        ))}
      </g>
      {/* skyscrapers */}
      <g fill="#2b4a62">
        <rect x="26" y="44" width="40" height="48" />
        <rect x="88" y="26" width="44" height="66" />
        <rect x="150" y="52" width="44" height="40" />
        <rect x="212" y="34" width="44" height="58" />
        <rect x="270" y="58" width="40" height="34" />
      </g>
      <g fill="#b9e6f2" opacity="0.85">
        {[[32, 52], [46, 52], [32, 68], [46, 68], [94, 34], [110, 34], [94, 52], [110, 52], [94, 70], [110, 70], [156, 60], [172, 60], [218, 42], [234, 42], [218, 60], [234, 60], [276, 66], [292, 66]].map(([x, y], i) => (
          <rect key={i} x={x} y={y} width="8" height="8" />
        ))}
      </g>
      {/* clouds */}
      <g fill="#ffffff" opacity="0.92">
        <ellipse cx="60" cy="112" rx="40" ry="10" />
        <ellipse cx="150" cy="124" rx="52" ry="12" />
        <ellipse cx="262" cy="116" rx="44" ry="11" />
        <ellipse cx="200" cy="18" rx="30" ry="7" />
        <ellipse cx="40" cy="20" rx="26" ry="6" />
      </g>
      {/* blossom petals */}
      <g fill="#f7b6c9">
        {[[20, 80], [70, 24], [130, 100], [190, 70], [250, 22], [300, 100]].map(([x, y], i) => (
          <ellipse key={i} cx={x} cy={y} rx="3.4" ry="1.8" transform={`rotate(${i * 30} ${x} ${y})`} />
        ))}
      </g>
    </>
  );
}

function CentreScene() {
  return (
    <>
      <defs>
        <radialGradient id="centreSky" cx="50%" cy="38%" r="70%">
          <stop offset="0" stopColor="#fff2b8" />
          <stop offset="1" stopColor="#b8801a" />
        </radialGradient>
      </defs>
      <rect width="320" height="160" fill="url(#centreSky)" />
      <g fill="#fff" opacity="0.75">
        <ellipse cx="60" cy="130" rx="60" ry="12" />
        <ellipse cx="270" cy="136" rx="62" ry="12" />
      </g>
      {/* great pillar */}
      <rect x="146" y="76" width="28" height="84" fill="#8a5a12" />
      <rect x="146" y="76" width="8" height="84" fill="#c9981f" opacity="0.7" />
      {/* temple */}
      <g>
        <rect x="118" y="52" width="84" height="24" fill="#a52a1c" />
        <path d="M100 52 Q160 28 220 52 L206 58 Q160 38 114 58 Z" fill="#3a1a10" />
        <path d="M122 34 Q160 14 198 34 L190 38 Q160 22 130 38 Z" fill="#3a1a10" />
        <rect x="148" y="58" width="24" height="18" fill="#ffd36b" />
        <path d="M160 6 L164 14 H156 Z" fill="#d1a53c" />
      </g>
      {/* gold dragon coil of light */}
      <path d="M20 60 Q70 20 110 56 T200 60 T300 40" fill="none" stroke="#fff2b8" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
    </>
  );
}

/* ---------- Emblems for the peoples ---------- */

interface EmblemProps {
  name: string;
  size?: number;
}

const EMBLEM_COLOURS: Record<string, string> = {
  Oniborne: '#b22234',
  Haniwa: '#a8613a',
  Human: '#4a5a78',
  Ryokido: '#3f7d5a',
  Fuyoren: '#5aa56a',
  Isetsu: '#d9573a',
  Kitsune: '#e0832a',
  Ryujin: '#2a8fa8',
  Nishikin: '#e5743a',
  Tengu: '#8a1f2a',
  Enkoh: '#6b7a8c',
  Hanamori: '#a31f3a',
};

export function PeopleEmblem({ name, size = 72 }: EmblemProps) {
  const bg = EMBLEM_COLOURS[name] ?? '#555';
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" role="img" aria-label={`${name} emblem`}>
      <circle cx="32" cy="32" r="30" fill={bg} stroke="#d1a53c" strokeWidth="2" />
      <circle cx="32" cy="32" r="25" fill="none" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="1" />
      <g fill="#fff8ea" stroke="#fff8ea" strokeLinejoin="round" strokeLinecap="round">
        {name === 'Oniborne' && (
          <>
            <circle cx="32" cy="36" r="13" stroke="none" />
            <path d="M22 26 L18 12 L28 22 Z M42 26 L46 12 L36 22 Z" stroke="none" />
            <circle cx="27" cy="35" r="2" fill={bg} stroke="none" />
            <circle cx="37" cy="35" r="2" fill={bg} stroke="none" />
            <path d="M26 42 L29 40 L32 43 L35 40 L38 42" fill="none" stroke={bg} strokeWidth="1.6" />
          </>
        )}
        {name === 'Haniwa' && (
          <>
            <rect x="21" y="14" width="22" height="36" rx="6" stroke="none" />
            <ellipse cx="27" cy="27" rx="2.6" ry="3.4" fill={bg} stroke="none" />
            <ellipse cx="37" cy="27" rx="2.6" ry="3.4" fill={bg} stroke="none" />
            <ellipse cx="32" cy="37" rx="2.4" ry="3" fill={bg} stroke="none" />
            <rect x="19" y="44" width="26" height="4" rx="2" stroke="none" />
          </>
        )}
        {name === 'Human' && (
          <>
            <circle cx="32" cy="24" r="8" stroke="none" />
            <path d="M16 50 Q16 34 32 34 Q48 34 48 50 Z" stroke="none" />
          </>
        )}
        {name === 'Ryokido' && (
          <>
            <ellipse cx="32" cy="34" rx="17" ry="13" stroke="none" />
            <path d="M24 28 L32 24 L40 28 L40 38 L32 42 L24 38 Z M24 28 L16 34 M40 28 L48 34 M32 24 V16" fill="none" stroke={bg} strokeWidth="1.5" />
            <circle cx="32" cy="14" r="4" stroke="none" />
            <path d="M24 14 Q22 8 26 6 M40 14 Q42 8 38 6" fill="none" strokeWidth="1.6" />
          </>
        )}
        {name === 'Fuyoren' && (
          <>
            <path d="M32 50 V26" fill="none" strokeWidth="2.4" />
            <path d="M32 40 Q16 38 14 22 Q30 22 32 38 Z" stroke="none" />
            <path d="M32 32 Q48 30 50 14 Q34 14 32 30 Z" stroke="none" />
            <circle cx="32" cy="20" r="3" stroke="none" />
          </>
        )}
        {name === 'Isetsu' && (
          <>
            <ellipse cx="32" cy="38" rx="12" ry="9" stroke="none" />
            <path d="M22 34 Q10 28 14 16 Q22 18 24 28 Z M42 34 Q54 28 50 16 Q42 18 40 28 Z" stroke="none" />
            <path d="M24 46 L18 54 M30 47 L28 56 M34 47 L36 56 M40 46 L46 54" fill="none" strokeWidth="2" />
            <circle cx="28" cy="34" r="1.8" fill={bg} stroke="none" />
            <circle cx="36" cy="34" r="1.8" fill={bg} stroke="none" />
          </>
        )}
        {name === 'Kitsune' && (
          <>
            <path d="M32 50 L16 34 L16 14 L26 24 H38 L48 14 V34 Z" stroke="none" />
            <circle cx="26" cy="34" r="2" fill={bg} stroke="none" />
            <circle cx="38" cy="34" r="2" fill={bg} stroke="none" />
            <path d="M30 42 H34 L32 45 Z" fill={bg} stroke="none" />
          </>
        )}
        {name === 'Ryujin' && (
          <>
            <path d="M12 38 Q20 18 30 32 T50 24" fill="none" strokeWidth="5" />
            <circle cx="50" cy="22" r="6" stroke="none" />
            <path d="M52 16 L58 10 M48 16 L48 8" fill="none" strokeWidth="2" />
            <circle cx="52" cy="21" r="1.5" fill={bg} stroke="none" />
            <path d="M12 46 Q22 40 32 46 T52 46" fill="none" strokeWidth="2" />
          </>
        )}
        {name === 'Nishikin' && (
          <>
            <path d="M12 32 Q28 14 46 30 Q28 48 12 32 Z" stroke="none" />
            <path d="M46 30 L56 20 L56 42 Z" stroke="none" />
            <circle cx="20" cy="30" r="2" fill={bg} stroke="none" />
            <path d="M26 24 Q30 32 26 40 M33 22 Q37 32 33 42" fill="none" stroke={bg} strokeWidth="1.3" />
          </>
        )}
        {name === 'Tengu' && (
          <>
            <circle cx="30" cy="30" r="15" stroke="none" />
            <path d="M32 32 L58 36 L32 42 Z" stroke="none" />
            <path d="M18 20 Q30 8 42 20" fill="none" strokeWidth="2.6" />
            <circle cx="25" cy="28" r="2.4" fill={bg} stroke="none" />
            <circle cx="36" cy="28" r="2.4" fill={bg} stroke="none" />
          </>
        )}
        {name === 'Enkoh' && (
          <>
            <circle cx="32" cy="34" r="16" stroke="none" />
            <path d="M16 24 Q32 8 48 24 Q32 20 16 24 Z" stroke="none" />
            <path d="M18 14 L22 8 L26 14 M30 12 L32 6 L34 12 M38 14 L42 8 L46 14" fill="none" strokeWidth="1.6" />
            <circle cx="26" cy="33" r="2.2" fill={bg} stroke="none" />
            <circle cx="38" cy="33" r="2.2" fill={bg} stroke="none" />
            <path d="M26 42 Q32 46 38 42" fill="none" stroke={bg} strokeWidth="1.8" />
          </>
        )}
        {name === 'Hanamori' && (
          <>
            {[0, 72, 144, 216, 288].map((a) => (
              <ellipse key={a} cx="32" cy="20" rx="6" ry="11" transform={`rotate(${a} 32 32)`} stroke="none" />
            ))}
            <circle cx="32" cy="32" r="5" fill={bg} stroke="none" />
          </>
        )}
      </g>
    </svg>
  );
}
