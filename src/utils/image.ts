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
