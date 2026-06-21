import QRCode from 'qrcode';
import type { ErrorCorrectionLevel } from '../types';

export interface RenderQROptions {
  value: string;
  size: number;
  margin: number;
  fgColor: string;
  bgColor: string;
  level: ErrorCorrectionLevel;
  rounded: boolean;
  logoUrl?: string | null;
  logoScale?: number;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

export async function renderQRToCanvas(options: RenderQROptions): Promise<HTMLCanvasElement> {
  const {
    value,
    size,
    margin,
    fgColor,
    bgColor,
    level,
    rounded,
    logoUrl,
    logoScale = 0.2,
  } = options;

  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas not supported');

  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, size, size);

  if (!value.trim()) return canvas;

  const qr = QRCode.create(value, { errorCorrectionLevel: level });
  const moduleCount = qr.modules.size;
  const marginModules = margin;
  const totalModules = moduleCount + marginModules * 2;
  const cellSize = size / totalModules;

  for (let row = 0; row < moduleCount; row++) {
    for (let col = 0; col < moduleCount; col++) {
      if (!qr.modules.get(row, col)) continue;
      const x = (col + marginModules) * cellSize;
      const y = (row + marginModules) * cellSize;
      ctx.fillStyle = fgColor;
      if (rounded) {
        const radius = cellSize * 0.35;
        const w = cellSize * 0.9;
        const h = cellSize * 0.9;
        const ox = x + (cellSize - w) / 2;
        const oy = y + (cellSize - h) / 2;
        ctx.beginPath();
        ctx.roundRect(ox, oy, w, h, radius);
        ctx.fill();
      } else {
        ctx.fillRect(x, y, cellSize, cellSize);
      }
    }
  }

  if (logoUrl) {
    try {
      const img = await loadImage(logoUrl);
      const logoSize = size * logoScale;
      const x = (size - logoSize) / 2;
      const y = (size - logoSize) / 2;
      const pad = logoSize * 0.12;
      ctx.fillStyle = bgColor;
      ctx.beginPath();
      ctx.roundRect(x - pad, y - pad, logoSize + pad * 2, logoSize + pad * 2, logoSize * 0.15);
      ctx.fill();
      ctx.drawImage(img, x, y, logoSize, logoSize);
    } catch {
      // Logo failed to load — QR still valid without it
    }
  }

  return canvas;
}

export async function canvasToPngBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error('Failed to create PNG'));
    }, 'image/png');
  });
}

export async function canvasToSvgString(
  options: RenderQROptions,
): Promise<string> {
  const { value, size, margin, fgColor, bgColor, level } = options;
  if (!value.trim()) {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><rect width="100%" height="100%" fill="${bgColor}"/></svg>`;
  }
  return QRCode.toString(value, {
    type: 'svg',
    width: size,
    margin,
    color: { dark: fgColor, light: bgColor },
    errorCorrectionLevel: level,
  });
}
