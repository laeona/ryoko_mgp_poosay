import { useEffect, useRef, useState } from 'react';
import {
  clampCrop,
  cropSide,
  loadImageBitmap,
  renderPortraitCrop,
} from '../../utils/image';
import type { PortraitCrop } from '../../utils/image';

interface Props {
  file: File;
  onCancel: () => void;
  onSave: (dataUrl: string) => void;
}

const VIEW = 280; // preview size in CSS pixels
const MAX_ZOOM = 5;

/** Pan and zoom an uploaded picture to choose what becomes the round portrait. */
export default function PortraitCropper({ file, onCancel, onSave }: Props) {
  const [bitmap, setBitmap] = useState<ImageBitmap | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [crop, setCrop] = useState<PortraitCrop>({ zoom: 1, cx: 0, cy: 0 });
  const [error, setError] = useState('');
  const frameRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; y: number; cx: number; cy: number } | null>(null);
  const bitmapRef = useRef<ImageBitmap | null>(null);

  useEffect(() => {
    let objectUrl: string | null = null;
    let cancelled = false;
    loadImageBitmap(file)
      .then((bm) => {
        if (cancelled) return;
        bitmapRef.current = bm;
        objectUrl = URL.createObjectURL(file);
        setBitmap(bm);
        setUrl(objectUrl);
        setCrop({ zoom: 1, cx: bm.width / 2, cy: bm.height / 2 });
      })
      .catch((e) => !cancelled && setError(e instanceof Error ? e.message : 'Could not read that image.'));
    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [file]);

  const setZoom = (zoom: number) => {
    const bm = bitmapRef.current;
    if (!bm) return;
    setCrop((c) => clampCrop(bm.width, bm.height, { ...c, zoom: Math.min(MAX_ZOOM, Math.max(1, zoom)) }));
  };

  // Scroll wheel zooms; it needs a non-passive listener so the page doesn't scroll
  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const bm = bitmapRef.current;
      if (!bm) return;
      setCrop((c) =>
        clampCrop(bm.width, bm.height, {
          ...c,
          zoom: Math.min(MAX_ZOOM, Math.max(1, c.zoom * (e.deltaY < 0 ? 1.08 : 1 / 1.08))),
        })
      );
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [bitmap]);

  const onDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { x: e.clientX, y: e.clientY, cx: crop.cx, cy: crop.cy };
  };
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    const bm = bitmapRef.current;
    if (!d || !bm) return;
    // Dragging the picture right moves the crop centre left
    const pxToImage = cropSide(bm.width, bm.height, crop.zoom) / VIEW;
    setCrop((c) =>
      clampCrop(bm.width, bm.height, {
        ...c,
        cx: d.cx - (e.clientX - d.x) * pxToImage,
        cy: d.cy - (e.clientY - d.y) * pxToImage,
      })
    );
  };
  const onUp = () => {
    drag.current = null;
  };

  const save = () => {
    if (!bitmap) return;
    try {
      onSave(renderPortraitCrop(bitmap, crop));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not use that image.');
    }
  };

  // Preview geometry: the image is scaled so the crop square fills the frame
  let imgStyle: React.CSSProperties | undefined;
  if (bitmap) {
    const side = cropSide(bitmap.width, bitmap.height, crop.zoom);
    const scale = VIEW / side;
    imgStyle = {
      position: 'absolute',
      width: bitmap.width * scale,
      height: bitmap.height * scale,
      left: VIEW / 2 - crop.cx * scale,
      top: VIEW / 2 - crop.cy * scale,
      maxWidth: 'none',
      userSelect: 'none',
      pointerEvents: 'none',
    };
  }

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Adjust portrait"
    >
      <div className="bg-white rounded-lg shadow-xl p-5 w-full max-w-sm space-y-4">
        <div>
          <h3 className="font-display text-xl font-bold">Adjust portrait</h3>
          <p className="text-xs text-gray-600">Drag to move the picture and use the slider or scroll to zoom. The circle is what you'll get.</p>
        </div>

        <div
          ref={frameRef}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          className="relative mx-auto bg-gray-800 overflow-hidden cursor-grab active:cursor-grabbing touch-none"
          style={{ width: VIEW, height: VIEW }}
        >
          {url && imgStyle && <img src={url} alt="" draggable={false} style={imgStyle} />}
          {/* Dim everything outside the round portrait */}
          <div
            className="absolute inset-0 pointer-events-none rounded-full"
            style={{ boxShadow: '0 0 0 400px rgba(0,0,0,0.55), inset 0 0 0 2px rgba(255,255,255,0.9)' }}
          />
          {!bitmap && !error && (
            <div className="absolute inset-0 flex items-center justify-center text-sm text-white">Loading…</div>
          )}
        </div>

        <label className="flex items-center gap-3 text-sm">
          <span className="font-semibold">Zoom</span>
          <input
            type="range"
            min={1}
            max={MAX_ZOOM}
            step={0.01}
            value={crop.zoom}
            disabled={!bitmap}
            onChange={(e) => setZoom(parseFloat(e.target.value))}
            className="flex-1"
            aria-label="Zoom"
          />
          <button
            type="button"
            onClick={() => bitmap && setCrop({ zoom: 1, cx: bitmap.width / 2, cy: bitmap.height / 2 })}
            disabled={!bitmap}
            className="text-xs px-2 py-1 bg-gray-100 rounded hover:bg-gray-200"
          >
            Reset
          </button>
        </label>

        {error && <p className="text-sm text-red-700">{error}</p>}

        <div className="flex justify-end gap-2">
          <button type="button" onClick={onCancel} className="px-4 py-2 text-sm rounded bg-gray-100 hover:bg-gray-200">
            Cancel
          </button>
          <button
            type="button"
            onClick={save}
            disabled={!bitmap}
            className="px-4 py-2 text-sm rounded bg-ember text-white hover:bg-red-700 font-semibold disabled:opacity-50"
          >
            Use picture
          </button>
        </div>
      </div>
    </div>
  );
}
