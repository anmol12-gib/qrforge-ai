import { QrCode, Zap } from 'lucide-react';

const EMAIL = 'anmol.virmani@gmail.com';

export function Footer() {
  return (
    <footer className="border-t border-app bg-app-footer" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
                <QrCode className="w-4 h-4 text-white" aria-hidden />
              </div>
              <span className="font-bold text-lg text-app">QRForge AI</span>
            </div>
            <p className="text-sm text-app-subtle leading-relaxed">
              Premium QR code generator built with modern web technologies. Fast, private, and beautiful.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-app-muted">Navigate</h3>
            <ul className="space-y-2 text-sm text-app-subtle">
              {[
                { label: 'Generator', href: '#generator' },
                { label: 'Features', href: '#features' },
                { label: 'Use Cases', href: '#use-cases' },
                { label: 'FAQ', href: '#faq' },
              ].map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="hover:text-app transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-app-muted">Developer</h3>
            <div className="space-y-2 text-sm text-app-muted">
              <p>
                <span className="text-app-subtle">Full Name: </span>
                Anmol Virmani
              </p>
              <p>
                <span className="text-app-subtle">Email: </span>
                <a href={`mailto:${EMAIL}`} className="hover:text-app transition-colors">
                  {EMAIL}
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-app flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-app-subtle">
          <p>&copy; {new Date().getFullYear()} QRForge AI. All rights reserved.</p>

          <a
            href="https://digitalheroesco.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-app bg-gradient-to-r from-blue-500/10 to-violet-600/10 text-xs font-medium text-app-muted hover:text-app hover:border-blue-500/40 transition-colors"
          >
            <Zap className="w-3 h-3 text-violet-500" aria-hidden />
            Built for Digital Heroes
          </a>

          <p>Built with React, TypeScript, Vite &amp; Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
