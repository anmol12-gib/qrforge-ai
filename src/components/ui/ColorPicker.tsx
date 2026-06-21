import { HexColorPicker } from 'react-colorful';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ColorPickerProps {
  label: string;
  color: string;
  onChange: (color: string) => void;
}

export function ColorPicker({ label, color, onChange }: ColorPickerProps) {
  const [open, setOpen] = useState(false);
  const id = `color-${label.toLowerCase().replace(/\s/g, '-')}`;

  return (
    <div className="space-y-2">
      <span className="text-sm font-medium text-app-label">{label}</span>
      <div className="relative">
        <button
          id={id}
          type="button"
          aria-label={`${label}: ${color}`}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="flex items-center gap-3 w-full bg-app-input border border-app rounded-xl px-3 py-2.5
            hover:border-app-hover transition-colors focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-blue-500/40 ring-offset-app"
        >
          <span
            className="w-8 h-8 rounded-lg border border-app shadow-inner shrink-0"
            style={{ backgroundColor: color }}
          />
          <span className="text-sm text-app-muted font-mono uppercase">{color}</span>
        </button>
        <AnimatePresence>
          {open && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} aria-hidden />
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                className="absolute z-50 mt-2 p-3 bg-app-popover border border-app rounded-2xl shadow-2xl light:shadow-gray-300/50"
              >
                <HexColorPicker color={color} onChange={onChange} />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
