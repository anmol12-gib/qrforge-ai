import type { RenderQROptions } from './qrRenderer';
import { canvasToPngBlob, canvasToSvgString, renderQRToCanvas } from './qrRenderer';

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export async function downloadQRAsPng(options: RenderQROptions, filename = 'qrforge-qr.png') {
  const canvas = await renderQRToCanvas(options);
  const blob = await canvasToPngBlob(canvas);
  triggerDownload(blob, filename);
}

export async function downloadQRAsSvg(options: RenderQROptions, filename = 'qrforge-qr.svg') {
  const svg = await canvasToSvgString(options);
  const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
  triggerDownload(blob, filename);
}

export async function copyQRImageToClipboard(options: RenderQROptions): Promise<boolean> {
  try {
    const canvas = await renderQRToCanvas(options);
    const blob = await canvasToPngBlob(canvas);
    await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
    return true;
  } catch {
    return false;
  }
}

export function downloadBlob(blob: Blob, filename: string) {
  triggerDownload(blob, filename);
}
