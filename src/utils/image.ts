/**
 * Shrink an image file to a small square-ish JPEG data URL so it can be stored
 * with the character (browser storage is limited to a few MB in total).
 */
export async function resizeImageToDataUrl(
  file: File,
  maxSize = 384,
  quality = 0.85
): Promise<string> {
  if (!file.type.startsWith('image/')) {
    throw new Error('Please choose an image file.');
  }

  // Load the image, respecting EXIF rotation where the browser supports it.
  let source: CanvasImageSource;
  let width: number;
  let height: number;
  if (typeof createImageBitmap === 'function') {
    const bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' });
    source = bitmap;
    width = bitmap.width;
    height = bitmap.height;
  } else {
    const url = URL.createObjectURL(file);
    try {
      const img = await new Promise<HTMLImageElement>((resolve, reject) => {
        const el = new Image();
        el.onload = () => resolve(el);
        el.onerror = () => reject(new Error('Could not read that image.'));
        el.src = url;
      });
      source = img;
      width = img.naturalWidth;
      height = img.naturalHeight;
    } finally {
      URL.revokeObjectURL(url);
    }
  }

  // Centre-crop to a square so portraits are consistent.
  const side = Math.min(width, height);
  const sx = (width - side) / 2;
  const sy = (height - side) / 2;
  const out = Math.min(maxSize, side);

  const canvas = document.createElement('canvas');
  canvas.width = out;
  canvas.height = out;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not process that image.');
  // White background so transparent PNGs don't turn black as JPEG.
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, out, out);
  ctx.drawImage(source, sx, sy, side, side, 0, 0, out, out);

  return canvas.toDataURL('image/jpeg', quality);
}

/** Which part of an image becomes the portrait: a square centred on (cx, cy), shrunk by `zoom`. */
export interface PortraitCrop {
  /** 1 = the largest square that fits; higher values zoom in */
  zoom: number;
  /** Crop centre in image pixels */
  cx: number;
  cy: number;
}

/** Decode an image file, respecting EXIF rotation where the browser supports it. */
export async function loadImageBitmap(file: File): Promise<ImageBitmap> {
  if (!file.type.startsWith('image/')) {
    throw new Error('Please choose an image file.');
  }
  return createImageBitmap(file, { imageOrientation: 'from-image' });
}

/** Side length (image pixels) of the square crop at a given zoom. */
export function cropSide(width: number, height: number, zoom: number): number {
  return Math.min(width, height) / zoom;
}

/** Keep the crop centre so the square stays inside the image. */
export function clampCrop(width: number, height: number, crop: PortraitCrop): PortraitCrop {
  const half = cropSide(width, height, crop.zoom) / 2;
  return {
    zoom: crop.zoom,
    cx: Math.min(width - half, Math.max(half, crop.cx)),
    cy: Math.min(height - half, Math.max(half, crop.cy)),
  };
}

/** Render the chosen crop as a small JPEG data URL for storing with the character. */
export function renderPortraitCrop(
  source: ImageBitmap,
  crop: PortraitCrop,
  maxSize = 384,
  quality = 0.85
): string {
  const c = clampCrop(source.width, source.height, crop);
  const side = cropSide(source.width, source.height, c.zoom);
  const out = Math.round(Math.min(maxSize, side));
  const canvas = document.createElement('canvas');
  canvas.width = out;
  canvas.height = out;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not process that image.');
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, out, out);
  ctx.drawImage(source, c.cx - side / 2, c.cy - side / 2, side, side, 0, 0, out, out);
  return canvas.toDataURL('image/jpeg', quality);
}
