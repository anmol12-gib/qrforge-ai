import { motion } from 'framer-motion';
import { Tabs } from '../ui/Tabs';
import { QRFormFields } from './QRFormFields';
import { QRPreview } from './QRPreview';
import { QRCustomization } from './QRCustomization';
import { LogoUpload } from './LogoUpload';
import { QRShare } from './QRShare';
import { QR_TYPE_TABS } from './qrTypes';
import { useQRStore } from '../../store/useQRStore';

export function QRGenerator() {
  const qrType = useQRStore((s) => s.qrType);
  const setQrType = useQRStore((s) => s.setQrType);

  return (
    <motion.section
      id="generator"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      className="relative"
      aria-label="QR code generator"
    >
      <div className="absolute -inset-px bg-gradient-to-r from-blue-500/20 via-violet-500/20 to-cyan-500/20 rounded-3xl blur-sm" />
      <div className="relative bg-app-surface-elevated backdrop-blur-xl border border-app rounded-3xl overflow-hidden">
        <div className="p-6 sm:p-8 border-b border-app">
          <Tabs
            tabs={QR_TYPE_TABS}
            active={qrType}
            onChange={setQrType}
            aria-label="QR code type"
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-0">
          <div className="p-6 sm:p-8 space-y-8 border-b lg:border-b-0 lg:border-r border-app">
            <QRFormFields />
            <div className="h-px bg-app-border" style={{ backgroundColor: 'var(--app-border)' }} />
            <QRCustomization />
            <LogoUpload />
          </div>

          <div className="p-6 sm:p-8 flex flex-col gap-8 bg-app-surface-preview">
            <QRPreview />
            <QRShare />
          </div>
        </div>
      </div>
    </motion.section>
  );
}
