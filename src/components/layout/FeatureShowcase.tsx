import { motion } from 'framer-motion';
import {
  Download,
  History,
  Image,
  Palette,
  Share2,
  Shield,
  Smartphone,
  Wifi,
  Zap,
} from 'lucide-react';

const FEATURES = [
  {
    icon: Zap,
    title: 'Instant Generation',
    description: 'Real-time QR preview as you type. No reloads, no waiting.',
  },
  {
    icon: Palette,
    title: 'Full Customization',
    description: 'Colors, size, margins, error correction, and rounded modules.',
  },
  {
    icon: Image,
    title: 'Logo Embedding',
    description: 'Upload your brand logo with auto-scale and center placement.',
  },
  {
    icon: Wifi,
    title: 'WiFi & vCard',
    description: 'WiFi auto-connect, business cards, calendar events, and locations.',
  },
  {
    icon: Download,
    title: 'Export Options',
    description: 'Download as PNG or SVG with one click.',
  },
  {
    icon: Share2,
    title: 'Share Anywhere',
    description: 'Copy link, copy image, or use native share on mobile.',
  },
  {
    icon: History,
    title: 'QR History',
    description: 'Last 10 codes saved locally with one-click regenerate.',
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'Everything runs in your browser. Your data never leaves your device.',
  },
  {
    icon: Smartphone,
    title: 'Fully Responsive',
    description: 'Beautiful on desktop, tablet, and mobile with touch-friendly controls.',
  },
];

export function FeatureShowcase() {
  return (
    <section id="features" className="py-24 px-4 sm:px-6" aria-labelledby="features-heading">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 id="features-heading" className="text-3xl sm:text-4xl font-bold mb-4">
            Everything you need to create{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">
              stunning QR codes
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A complete toolkit designed for marketers, developers, and businesses who demand quality.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, i) => (
            <motion.article
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.05 }}
              className="group p-6 bg-white/[0.03] border border-white/10 rounded-2xl
                hover:border-white/20 hover:bg-white/[0.05] hover:shadow-xl hover:shadow-blue-500/5
                transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-violet-500/20
                flex items-center justify-center mb-4 group-hover:from-blue-500/30 group-hover:to-violet-500/30
                transition-colors">
                <feature.icon className="w-6 h-6 text-blue-400" aria-hidden />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
