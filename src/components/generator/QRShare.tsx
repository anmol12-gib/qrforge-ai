import { useState } from 'react';
import { Check, Copy, Download, Image, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getRenderOptions, useQRStore } from '../../store/useQRStore';
import {
  copyQRImageToClipboard,
  downloadQRAsPng,
  downloadQRAsSvg,
} from '../../lib/download';
import { canvasToPngBlob, renderQRToCanvas } from '../../lib/qrRenderer';
import { Button } from '../ui/Button';

export function QRShare() {
  const store = useQRStore();
  const { encodedValue, addToHistory } = store;
  const [copied, setCopied] = useState<'link' | 'image' | null>(null);
  const [downloading, setDownloading] = useState(false);

  const options = getRenderOptions(store);

  const showSuccess = (type: 'link' | 'image') => {
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleCopyLink = async () => {
    const params = new URLSearchParams({ data: encodedValue, type: store.qrType });
    const url = `${window.location.origin}${window.location.pathname}?${params}`;
    await navigator.clipboard.writeText(url);
    showSuccess('link');
  };

  const handleCopyImage = async () => {
    if (!encodedValue) return;
    const ok = await copyQRImageToClipboard(options);
    if (ok) showSuccess('image');
  };

  const handleShare = async () => {
    if (!encodedValue || !navigator.share) return;
    try {
      const canvas = await renderQRToCanvas(options);
      const blob = await canvasToPngBlob(canvas);
      const file = new File([blob], 'qrforge-qr.png', { type: 'image/png' });
      await navigator.share({
        title: 'QRForge AI',
        text: 'Check out this QR code',
        files: [file],
      });
      addToHistory();
    } catch {
      // User cancelled or share unsupported
    }
  };

  const handleDownload = async (format: 'png' | 'svg') => {
    if (!encodedValue) return;
    setDownloading(true);
    try {
      if (format === 'png') await downloadQRAsPng(options);
      else await downloadQRAsSvg(options);
      addToHistory();
    } finally {
      setDownloading(false);
    }
  };

  const disabled = !encodedValue;

  return (
    <div className="space-y-3" aria-label="Share and download options">
      <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Export</h3>

      <div className="grid grid-cols-2 gap-2">
        <Button
          variant="secondary"
          size="sm"
          disabled={disabled}
          onClick={handleCopyLink}
          icon={
            <AnimatePresence mode="wait">
              {copied === 'link' ? (
                <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }}>
                  <Check className="w-4 h-4 text-green-400" />
                </motion.span>
              ) : (
                <Copy className="w-4 h-4" key="copy" />
              )}
            </AnimatePresence>
          }
          aria-label="Copy link"
        >
          Copy Link
        </Button>

        <Button
          variant="secondary"
          size="sm"
          disabled={disabled || !navigator.share}
          onClick={handleShare}
          icon={<Share2 className="w-4 h-4" />}
          aria-label="Share QR code"
        >
          Share QR
        </Button>

        <Button
          variant="secondary"
          size="sm"
          disabled={disabled}
          onClick={handleCopyImage}
          icon={
            copied === 'image' ? (
              <Check className="w-4 h-4 text-green-400" />
            ) : (
              <Image className="w-4 h-4" />
            )
          }
          aria-label="Copy QR image to clipboard"
        >
          Copy Image
        </Button>

        <Button
          variant="secondary"
          size="sm"
          disabled={disabled || downloading}
          loading={downloading}
          onClick={() => handleDownload('png')}
          icon={<Download className="w-4 h-4" />}
          aria-label="Download QR code"
        >
          Download
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-2 pt-1">
        <Button
          variant="primary"
          size="md"
          disabled={disabled || downloading}
          onClick={() => handleDownload('png')}
          aria-label="Download as PNG"
        >
          Download PNG
        </Button>
        <Button
          variant="outline"
          size="md"
          disabled={disabled || downloading}
          onClick={() => handleDownload('svg')}
          aria-label="Download as SVG"
        >
          Download SVG
        </Button>
      </div>
    </div>
  );
}
