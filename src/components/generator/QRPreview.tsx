import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { getRenderOptions, useQRStore } from '../../store/useQRStore';
import { renderQRToCanvas } from '../../lib/qrRenderer';
import { QRSkeleton } from '../ui/Skeleton';

export function QRPreview() {
  const encodedValue = useQRStore((s) => s.encodedValue);
  const settings = useQRStore((s) => s.settings);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(true);

  const displaySize = Math.min(settings.size, 320);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    const render = async () => {
      const options = getRenderOptions(useQRStore.getState());
      try {
        const canvas = await renderQRToCanvas({ ...options, size: displaySize });
        if (cancelled || !canvasRef.current) return;
        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;
        canvasRef.current.width = displaySize;
        canvasRef.current.height = displaySize;
        ctx.clearRect(0, 0, displaySize, displaySize);
        ctx.drawImage(canvas, 0, 0);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    const timer = requestAnimationFrame(() => void render());
    return () => {
      cancelled = true;
      cancelAnimationFrame(timer);
    };
  }, [
    encodedValue,
    settings.fgColor,
    settings.bgColor,
    settings.margin,
    settings.level,
    settings.rounded,
    settings.logoUrl,
    settings.logoSize,
    displaySize,
  ]);

  return (
    <motion.div
      layout
      className="flex flex-col items-center"
      aria-live="polite"
      aria-label="QR code live preview"
    >
      <div
        className={`
          relative p-6 transition-all duration-300 shadow-2xl
          ${settings.rounded ? 'rounded-3xl' : 'rounded-2xl'}
        `}
        style={{ backgroundColor: settings.bgColor }}
      >
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <QRSkeleton />
          </div>
        )}
        <canvas
          ref={canvasRef}
          width={displaySize}
          height={displaySize}
          className={`transition-opacity duration-300 ${loading ? 'opacity-0' : 'opacity-100'}`}
          role="img"
          aria-label={encodedValue ? `QR code for ${encodedValue.slice(0, 50)}` : 'Empty QR code'}
        />
      </div>
      {!encodedValue && (
        <p className="mt-4 text-sm text-gray-500 text-center">Enter content to generate your QR code</p>
      )}
    </motion.div>
  );
}
