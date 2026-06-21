import { useRef } from 'react';
import { ImagePlus, X } from 'lucide-react';
import { useQRStore } from '../../store/useQRStore';
import { Slider } from '../ui/Slider';

const ACCEPTED = 'image/png,image/jpeg,image/jpg,image/svg+xml';

export function LogoUpload() {
  const settings = useQRStore((s) => s.settings);
  const setLogo = useQRStore((s) => s.setLogo);
  const setSettings = useQRStore((s) => s.setSettings);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') setLogo(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4" aria-label="Logo upload">
      <h3 className="text-sm font-semibold text-app-label uppercase tracking-wider">Logo</h3>

      {settings.logoUrl ? (
        <div className="flex items-center gap-4 p-4 bg-app-surface border border-app rounded-2xl">
          <img
            src={settings.logoUrl}
            alt="Uploaded logo preview"
            className="w-14 h-14 object-contain rounded-lg bg-app-surface p-1"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm text-app-label truncate">Logo attached</p>
            <p className="text-xs text-app-subtle">Centered with auto-scale</p>
          </div>
          <button
            type="button"
            onClick={() => setLogo(null)}
            aria-label="Remove logo"
            className="p-2 rounded-lg hover-app text-app-muted hover:text-app transition-colors
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="w-full flex flex-col items-center gap-2 p-6 border-2 border-dashed border-app
            rounded-2xl hover:border-blue-500/40 hover:bg-blue-500/5 transition-all
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40"
          aria-label="Upload logo image"
        >
          <ImagePlus className="w-8 h-8 text-app-subtle" />
          <span className="text-sm text-app-muted">Upload PNG, JPG, or SVG</span>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED}
        className="sr-only"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = '';
        }}
      />

      {settings.logoUrl && (
        <Slider
          label="Logo Size"
          value={Math.round(settings.logoSize * 100)}
          min={10}
          max={35}
          step={1}
          unit="%"
          onChange={(v) => setSettings({ logoSize: v / 100 })}
        />
      )}
    </div>
  );
}
