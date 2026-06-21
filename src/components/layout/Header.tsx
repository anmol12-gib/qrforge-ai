import { useEffect, useState } from 'react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { useQRStore } from '../../store/useQRStore';
import { Button } from '../ui/Button';

const NAV_LINKS = [
  { href: '#generator', label: 'Generator' },
  { href: '#features', label: 'Features' },
  { href: '#use-cases', label: 'Use Cases' },
  { href: '#faq', label: 'FAQ' },
];

export function Header() {
  const theme = useQRStore((s) => s.theme);
  const toggleTheme = useQRStore((s) => s.toggleTheme);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${scrolled ? 'bg-app-header backdrop-blur-xl border-b border-app shadow-lg light:shadow-gray-200/50' : 'bg-transparent'}
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5 group text-app" aria-label="QRForge AI home">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 via-violet-500 to-cyan-400
            shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-shadow" />
          <span className="text-lg font-bold tracking-tight">QRForge AI</span>
        </a>

        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm text-app-muted hover:text-app rounded-lg hover-app transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="p-2 rounded-lg text-app-muted hover:text-app hover-app transition-colors
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 ring-offset-app"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <Button
            variant="primary"
            size="sm"
            className="hidden sm:inline-flex"
            onClick={() => document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get Started
          </Button>

          <button
            type="button"
            className="md:hidden p-2 rounded-lg text-app-muted hover:text-app"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          className="md:hidden border-t border-app bg-app-header backdrop-blur-xl px-4 py-4 space-y-1"
          aria-label="Mobile navigation"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-3 text-app-muted hover:text-app rounded-xl hover-app"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
