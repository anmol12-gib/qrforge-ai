import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { motion } from 'framer-motion';
import { Clock, RotateCcw, Trash2 } from 'lucide-react';
import { useQRStore } from '../../store/useQRStore';
import { Button } from '../ui/Button';

function HistoryThumbnail({ value, fg, bg }: { value: string; fg: string; bg: string }) {
  const [src, setSrc] = useState('');

  useEffect(() => {
    QRCode.toDataURL(value, { width: 64, margin: 1, color: { dark: fg, light: bg } })
      .then(setSrc)
      .catch(() => setSrc(''));
  }, [value, fg, bg]);

  if (!src) return <div className="w-16 h-16 rounded-lg bg-app-surface animate-pulse" aria-hidden />;
  return <img src={src} alt="" className="w-16 h-16 rounded-lg" />;
}

export function QRHistory() {
  const history = useQRStore((s) => s.history);
  const loadFromHistory = useQRStore((s) => s.loadFromHistory);
  const removeFromHistory = useQRStore((s) => s.removeFromHistory);
  const clearHistory = useQRStore((s) => s.clearHistory);

  if (history.length === 0) {
    return (
      <section id="history" className="py-16" aria-label="QR history">
        <h2 className="text-2xl font-bold mb-2 text-app">Recent QR Codes</h2>
        <p className="text-app-subtle text-sm">Your last 10 generated codes will appear here.</p>
      </section>
    );
  }

  return (
    <section id="history" className="py-16" aria-label="QR history">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-app">Recent QR Codes</h2>
          <p className="text-app-subtle text-sm mt-1">Stored locally in your browser</p>
        </div>
        <Button variant="ghost" size="sm" onClick={clearHistory} icon={<Trash2 className="w-4 h-4" />}>
          Clear All
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {history.map((item, i) => (
          <motion.article
            key={item.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex gap-4 p-4 bg-app-surface border border-app rounded-2xl
              hover:border-app-hover hover-app transition-all"
          >
            <HistoryThumbnail
              value={item.encodedValue}
              fg={item.settings.fgColor}
              bg={item.settings.bgColor}
            />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate text-app">{item.label}</p>
              <p className="text-xs text-app-subtle capitalize mt-0.5">{item.type}</p>
              <p className="flex items-center gap-1 text-xs text-app-muted mt-2">
                <Clock className="w-3 h-3" aria-hidden />
                {new Date(item.createdAt).toLocaleDateString(undefined, {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <button
                type="button"
                onClick={() => loadFromHistory(item)}
                aria-label={`Regenerate ${item.label}`}
                className="p-2 rounded-lg hover:bg-blue-500/20 text-app-muted hover:text-blue-500
                  transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => removeFromHistory(item.id)}
                aria-label={`Remove ${item.label} from history`}
                className="p-2 rounded-lg hover:bg-red-500/20 text-app-muted hover:text-red-500
                  transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/40"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
