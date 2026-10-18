import { useEffect, useRef, useState } from 'react';
import type { BattleMap } from '../../store/mapStore';

export type MapTool = 'move' | 'ruler';

interface Props {
  map: BattleMap;
  imageUrl: string | null;
  /** Portrait data URLs by character id */
  portraits: Record<string, string | undefined>;
  selectedId: string | null;
  tool: MapTool;
  onSelect: (id: string | null) => void;
  onMoveToken: (id: string, x: number, y: number) => void;
}

interface View {
  x: number;
  y: number;
  scale: number;
}

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

export default function MapCanvas({ map, imageUrl, portraits, selectedId, tool, onSelect, onMoveToken }: Props) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<View>({ x: 0, y: 0, scale: 1 });
  const viewRef = useRef(view);
  const [drag, setDrag] = useState<{ id: string; x: number; y: number } | null>(null);
  const [ruler, setRuler] = useState<{ x1: number; y1: number; x2: number; y2: number } | null>(null);
  const panRef = useRef<{ sx: number; sy: number; vx: number; vy: number } | null>(null);
  const rulerActive = useRef(false);
  const dragPos = useRef<{ x: number; y: number } | null>(null);
  const tokenDrag = useRef<{ id: string; sx: number; sy: number; ox: number; oy: number; moved: boolean } | null>(null);

  useEffect(() => {
    viewRef.current = view;
  }, [view]);

  const fit = () => {
    const box = boxRef.current;
    if (!box) return;
    const w = box.clientWidth;
    const h = box.clientHeight;
    const scale = Math.min(w / map.width, h / map.height) * 0.97;
    setView({ scale, x: (w - map.width * scale) / 2, y: (h - map.height * scale) / 2 });
  };

  // Fit the map into view when a different map (or its picture) loads
  useEffect(() => {
    fit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map.id, imageUrl]);

  useEffect(() => {
    setRuler(null);
  }, [tool, map.id]);

  const zoomAt = (px: number, py: number, factor: number) => {
    const v = viewRef.current;
    const ns = clamp(v.scale * factor, 0.05, 6);
    const k = ns / v.scale;
    setView({ scale: ns, x: px - (px - v.x) * k, y: py - (py - v.y) * k });
  };

  // Wheel zoom needs a non-passive listener so the page doesn't scroll
  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const r = box.getBoundingClientRect();
      zoomAt(e.clientX - r.left, e.clientY - r.top, e.deltaY < 0 ? 1.1 : 1 / 1.1);
    };
    box.addEventListener('wheel', onWheel, { passive: false });
    return () => box.removeEventListener('wheel', onWheel);
  }, []);

  const toMap = (clientX: number, clientY: number) => {
    const r = boxRef.current?.getBoundingClientRect();
    const v = viewRef.current;
    return {
      x: (clientX - (r?.left ?? 0) - v.x) / v.scale,
      y: (clientY - (r?.top ?? 0) - v.y) / v.scale,
    };
  };

  const onBgDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    if (tool === 'ruler') {
      const p = toMap(e.clientX, e.clientY);
      rulerActive.current = true;
      setRuler({ x1: p.x, y1: p.y, x2: p.x, y2: p.y });
      return;
    }
    onSelect(null);
    panRef.current = { sx: e.clientX, sy: e.clientY, vx: viewRef.current.x, vy: viewRef.current.y };
  };

  const onBgMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (panRef.current) {
      const p = panRef.current;
      setView((v) => ({ ...v, x: p.vx + e.clientX - p.sx, y: p.vy + e.clientY - p.sy }));
    } else if (rulerActive.current) {
      const p = toMap(e.clientX, e.clientY);
      setRuler((r) => (r ? { ...r, x2: p.x, y2: p.y } : r));
    }
  };

  const onBgUp = () => {
    panRef.current = null;
    rulerActive.current = false;
  };

  const snapPos = (x: number, y: number, size: number) => {
    const g = map.gridSize;
    let nx = x;
    let ny = y;
    if (map.snap) {
      nx = Math.round((x - map.gridOffsetX) / g) * g + map.gridOffsetX;
      ny = Math.round((y - map.gridOffsetY) / g) * g + map.gridOffsetY;
    }
    const px = size * g;
    return {
      x: clamp(nx, 0, Math.max(0, map.width - px)),
      y: clamp(ny, 0, Math.max(0, map.height - px)),
    };
  };

  const onTokenDown = (e: React.PointerEvent<HTMLDivElement>, id: string, x: number, y: number) => {
    if (tool === 'ruler') return;
    e.stopPropagation();
    e.currentTarget.setPointerCapture(e.pointerId);
    tokenDrag.current = { id, sx: e.clientX, sy: e.clientY, ox: x, oy: y, moved: false };
    onSelect(id);
  };

  const onTokenMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = tokenDrag.current;
    if (!d) return;
    const dx = (e.clientX - d.sx) / viewRef.current.scale;
    const dy = (e.clientY - d.sy) / viewRef.current.scale;
    if (!d.moved && Math.abs(dx) + Math.abs(dy) < 3 / viewRef.current.scale) return;
    d.moved = true;
    dragPos.current = { x: d.ox + dx, y: d.oy + dy };
    setDrag({ id: d.id, ...dragPos.current });
  };

  const onTokenUp = (size: number) => {
    const d = tokenDrag.current;
    tokenDrag.current = null;
    const pos = dragPos.current;
    dragPos.current = null;
    setDrag(null);
    if (!d || !d.moved || !pos) return;
    const p = snapPos(pos.x, pos.y, size);
    onMoveToken(d.id, p.x, p.y);
  };

  const g = map.gridSize;
  const patternId = `grid-${map.id}`;
  const rulerSquares = ruler ? Math.hypot(ruler.x2 - ruler.x1, ruler.y2 - ruler.y1) / g : 0;

  return (
    <div
      ref={boxRef}
      className={`relative w-full h-full overflow-hidden bg-gray-800 select-none touch-none ${
        tool === 'ruler' ? 'cursor-crosshair' : 'cursor-grab active:cursor-grabbing'
      }`}
      onPointerDown={onBgDown}
      onPointerMove={onBgMove}
      onPointerUp={onBgUp}
      onPointerCancel={onBgUp}
    >
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: map.width,
          height: map.height,
          transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})`,
          transformOrigin: '0 0',
        }}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={map.name}
            width={map.width}
            height={map.height}
            draggable={false}
            style={{ display: 'block', width: map.width, height: map.height, maxWidth: 'none' }}
          />
        ) : (
          <div style={{ width: map.width, height: map.height, background: '#374151' }} />
        )}

        {map.showGrid && (
          <svg width={map.width} height={map.height} style={{ position: 'absolute', left: 0, top: 0, pointerEvents: 'none' }}>
            <defs>
              <pattern
                id={patternId}
                width={g}
                height={g}
                patternUnits="userSpaceOnUse"
                patternTransform={`translate(${map.gridOffsetX} ${map.gridOffsetY})`}
              >
                <path d={`M ${g} 0 L 0 0 0 ${g}`} fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" />
                <path d={`M ${g} 0 L 0 0 0 ${g}`} fill="none" stroke="rgba(0,0,0,0.35)" strokeWidth="0.75" />
              </pattern>
            </defs>
            <rect width={map.width} height={map.height} fill={`url(#${patternId})`} />
          </svg>
        )}

        {map.tokens.map((t) => {
          const x = drag?.id === t.id ? drag.x : t.x;
          const y = drag?.id === t.id ? drag.y : t.y;
          const px = t.size * g;
          const portrait = t.characterId ? portraits[t.characterId] : undefined;
          const selected = selectedId === t.id;
          return (
            <div
              key={t.id}
              onPointerDown={(e) => onTokenDown(e, t.id, t.x, t.y)}
              onPointerMove={onTokenMove}
              onPointerUp={() => onTokenUp(t.size)}
              onPointerCancel={() => onTokenUp(t.size)}
              style={{
                position: 'absolute',
                left: x,
                top: y,
                width: px,
                height: px,
                borderRadius: '50%',
                border: `${Math.max(3, px * 0.06)}px solid ${t.color}`,
                boxSizing: 'border-box',
                background: portrait ? `center / cover no-repeat url("${portrait}")` : t.color,
                boxShadow: selected
                  ? '0 0 0 4px #d1a53c, 0 4px 10px rgba(0,0,0,0.6)'
                  : '0 3px 8px rgba(0,0,0,0.55)',
                cursor: tool === 'ruler' ? 'crosshair' : 'grab',
                zIndex: selected || drag?.id === t.id ? 20 : 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: 800,
                fontSize: px * 0.45,
                textShadow: '0 1px 3px rgba(0,0,0,0.8)',
              }}
              title={t.label}
            >
              {!portrait && (t.label.trim()[0] ?? '?').toUpperCase()}
              <span
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  marginTop: 2,
                  whiteSpace: 'nowrap',
                  fontSize: Math.max(12, g * 0.26),
                  fontWeight: 700,
                  padding: '0 6px',
                  borderRadius: 4,
                  background: 'rgba(22,9,11,0.82)',
                  color: '#fff',
                  textShadow: 'none',
                  pointerEvents: 'none',
                }}
              >
                {t.label}
              </span>
            </div>
          );
        })}

        {ruler && (
          <svg width={map.width} height={map.height} style={{ position: 'absolute', left: 0, top: 0, pointerEvents: 'none', zIndex: 30 }}>
            <line x1={ruler.x1} y1={ruler.y1} x2={ruler.x2} y2={ruler.y2} stroke="#000" strokeWidth={6 / view.scale} strokeLinecap="round" opacity="0.5" />
            <line x1={ruler.x1} y1={ruler.y1} x2={ruler.x2} y2={ruler.y2} stroke="#ffd36b" strokeWidth={3 / view.scale} strokeLinecap="round" />
            <circle cx={ruler.x1} cy={ruler.y1} r={5 / view.scale} fill="#ffd36b" />
            <circle cx={ruler.x2} cy={ruler.y2} r={5 / view.scale} fill="#ffd36b" />
            <text
              x={(ruler.x1 + ruler.x2) / 2}
              y={(ruler.y1 + ruler.y2) / 2 - 10 / view.scale}
              textAnchor="middle"
              fontSize={16 / view.scale}
              fontWeight="800"
              fill="#fff"
              stroke="#000"
              strokeWidth={4 / view.scale}
              paintOrder="stroke"
            >
              {(Math.round(rulerSquares * 2) / 2).toString()} sq · {Math.round(rulerSquares * 5)} ft
            </text>
          </svg>
        )}
      </div>

      <div
        className="absolute top-2 right-2 flex flex-col gap-1 z-40"
        onPointerDown={(e) => e.stopPropagation()}
      >
        {[
          { label: '+', title: 'Zoom in', fn: () => zoomAt((boxRef.current?.clientWidth ?? 0) / 2, (boxRef.current?.clientHeight ?? 0) / 2, 1.25) },
          { label: '−', title: 'Zoom out', fn: () => zoomAt((boxRef.current?.clientWidth ?? 0) / 2, (boxRef.current?.clientHeight ?? 0) / 2, 1 / 1.25) },
          { label: '⤢', title: 'Fit map to window', fn: fit },
        ].map((b) => (
          <button
            key={b.title}
            type="button"
            title={b.title}
            aria-label={b.title}
            onClick={b.fn}
            className="w-8 h-8 rounded bg-black/70 text-white font-bold hover:bg-black"
          >
            {b.label}
          </button>
        ))}
      </div>
    </div>
  );
}
