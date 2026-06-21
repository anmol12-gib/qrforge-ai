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
      <span className="text-sm font-medium text-gray-300">{label}</span>
      <div className="relative">
        <button
          id={id}
          type="button"
          aria-label={`${label}: ${color}`}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="flex items-center gap-3 w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5
            hover:border-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-blue-500/40"
        >
          <span
            className="w-8 h-8 rounded-lg border border-white/20 shadow-inner shrink-0"
            style={{ backgroundColor: color }}
          />
          <span className="text-sm text-gray-400 font-mono uppercase">{color}</span>
        </button>
        <AnimatePresence>
          {open && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} aria-hidden />
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                className="absolute z-50 mt-2 p-3 bg-[#1a1a1a] border border-white/10 rounded-2xl shadow-2xl shadow-black/50"
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
