import { motion } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';
import { AnimatedBackground } from './AnimatedBackground';

export function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 sm:px-6 pt-24 pb-16 overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full
            bg-app-surface border border-app text-sm text-app-muted"
        >
          <Sparkles className="w-4 h-4 text-violet-400" aria-hidden />
          Premium QR Toolkit — 100% Client-Side
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
        >
          Generate Beautiful{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-400">
            QR Codes Instantly
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-app-muted max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Create, customize, and download professional QR codes for websites, WiFi, contact cards,
          events, and more.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button size="lg" onClick={() => scrollTo('generator')}>
            Generate QR
          </Button>
          <Button variant="outline" size="lg" onClick={() => scrollTo('features')}>
            View Features
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-20"
        >
          <button
            type="button"
            onClick={() => scrollTo('generator')}
            aria-label="Scroll to generator"
            className="text-app-subtle hover:text-app-muted transition-colors animate-bounce"
          >
            <ArrowDown className="w-6 h-6 mx-auto" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
