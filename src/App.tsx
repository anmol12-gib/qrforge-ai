import { lazy, Suspense, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Hero } from './components/layout/Hero';
import { QRGenerator } from './components/generator/QRGenerator';
import { Footer } from './components/layout/Footer';
import { useQRStore } from './store/useQRStore';
import { Skeleton } from './components/ui/Skeleton';

const FeatureShowcase = lazy(() =>
  import('./components/layout/FeatureShowcase').then((m) => ({ default: m.FeatureShowcase })),
);
const UseCases = lazy(() =>
  import('./components/layout/UseCases').then((m) => ({ default: m.UseCases })),
);
const FAQ = lazy(() => import('./components/layout/FAQ').then((m) => ({ default: m.FAQ })));
const QRHistory = lazy(() =>
  import('./components/generator/QRHistory').then((m) => ({ default: m.QRHistory })),
);

function SectionFallback() {
  return (
    <div className="py-24 px-6 max-w-7xl mx-auto space-y-4">
      <Skeleton className="h-10 w-64 mx-auto" />
      <Skeleton className="h-4 w-96 mx-auto" />
      <div className="grid grid-cols-3 gap-4 mt-8">
        <Skeleton className="h-40" />
        <Skeleton className="h-40" />
        <Skeleton className="h-40" />
      </div>
    </div>
  );
}

function App() {
  const theme = useQRStore((s) => s.theme);

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light');
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  return (
    <div className="min-h-screen bg-app text-app selection:bg-blue-500/30 transition-colors duration-250">
      <a
        href="#generator"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100]
          focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg"
      >
        Skip to generator
      </a>
      <Header />
      <main>
        <Hero />
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <QRGenerator />
          <Suspense fallback={<SectionFallback />}>
            <QRHistory />
          </Suspense>
        </div>
        <Suspense fallback={<SectionFallback />}>
          <FeatureShowcase />
          <UseCases />
          <FAQ />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;
