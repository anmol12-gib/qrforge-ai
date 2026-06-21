import { ExternalLink, QrCode } from 'lucide-react';
import { Button } from '../ui/Button';

const EMAIL = 'anmol.virmani@gmail.com';

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/40" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
                <QrCode className="w-4 h-4 text-white" aria-hidden />
              </div>
              <span className="font-bold text-lg">QRForge AI</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Premium QR code generator built with modern web technologies. Fast, private, and beautiful.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-gray-400">Navigate</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              {[
                { label: 'Generator', href: '#generator' },
                { label: 'Features', href: '#features' },
                { label: 'Use Cases', href: '#use-cases' },
                { label: 'FAQ', href: '#faq' },
              ].map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="hover:text-white transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-gray-400">Developer</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <p>
                <span className="text-gray-500">Full Name: </span>
                Anmol Virmani
              </p>
              <p>
                <span className="text-gray-500">Email: </span>
                <a href={`mailto:${EMAIL}`} className="hover:text-white transition-colors">
                  {EMAIL}
                </a>
              </p>
            </div>
            <div className="mt-6">
              <Button
                variant="primary"
                size="md"
                icon={<ExternalLink className="w-4 h-4" />}
                onClick={() => window.open('https://digitalheroesco.com', '_blank', 'noopener,noreferrer')}
                aria-label="Built for Digital Heroes — opens digitalheroesco.com"
              >
                Built for Digital Heroes
              </Button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600">
          <p>&copy; {new Date().getFullYear()} QRForge AI. All rights reserved.</p>
          <p>Built with React, TypeScript, Vite &amp; Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
