import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  {
    q: 'Is QRForge AI free to use?',
    a: 'Yes. QRForge AI is completely free and runs entirely in your browser. No account or subscription required.',
  },
  {
    q: 'Is my data stored on a server?',
    a: 'No. All QR generation happens client-side. Only your last 10 QR codes are saved locally in your browser via localStorage.',
  },
  {
    q: 'What QR types are supported?',
    a: 'URL, plain text, email, phone, SMS, WiFi, vCard contact cards, calendar events, and Google Maps locations.',
  },
  {
    q: 'Can I add my logo to a QR code?',
    a: 'Yes. Upload a PNG, JPG, or SVG logo. It will be centered and auto-scaled. Use higher error correction (Q or H) for best results.',
  },
  {
    q: 'What download formats are available?',
    a: 'You can download your QR code as PNG (raster) or SVG (vector). You can also copy the image directly to your clipboard.',
  },
  {
    q: 'Will my QR codes work on all scanners?',
    a: 'Yes. We use industry-standard QR encoding. WiFi and vCard formats follow widely supported specifications.',
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 px-4 sm:px-6" aria-labelledby="faq-heading">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 id="faq-heading" className="text-3xl sm:text-4xl font-bold mb-4">
            Frequently asked questions
          </h2>
          <p className="text-gray-400">Everything you need to know about QRForge AI.</p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div
              key={faq.q}
              className="border border-white/10 rounded-2xl overflow-hidden bg-white/[0.02]"
            >
              <button
                type="button"
                id={`faq-btn-${i}`}
                aria-expanded={open === i}
                aria-controls={`faq-panel-${i}`}
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left
                  hover:bg-white/[0.03] transition-colors focus-visible:outline-none
                  focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500/40"
              >
                <span className="font-medium">{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 shrink-0 transition-transform ${open === i ? 'rotate-180' : ''}`}
                  aria-hidden
                />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    id={`faq-panel-${i}`}
                    role="region"
                    aria-labelledby={`faq-btn-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
