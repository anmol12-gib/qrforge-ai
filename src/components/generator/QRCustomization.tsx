import type { ErrorCorrectionLevel } from '../../types';
import { useQRStore } from '../../store/useQRStore';
import { ColorPicker } from '../ui/ColorPicker';
import { Slider } from '../ui/Slider';
import { Toggle } from '../ui/Toggle';

const LEVELS: ErrorCorrectionLevel[] = ['L', 'M', 'Q', 'H'];

export function QRCustomization() {
  const settings = useQRStore((s) => s.settings);
  const setSettings = useQRStore((s) => s.setSettings);
  const theme = useQRStore((s) => s.theme);
  const toggleTheme = useQRStore((s) => s.toggleTheme);

  return (
    <div className="space-y-6" aria-label="QR customization options">
      <h3 className="text-sm font-semibold text-app-label uppercase tracking-wider">Customize</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ColorPicker
          label="QR Color"
          color={settings.fgColor}
          onChange={(fgColor) => setSettings({ fgColor })}
        />
        <ColorPicker
          label="Background"
          color={settings.bgColor}
          onChange={(bgColor) => setSettings({ bgColor })}
        />
      </div>

      <Slider
        label="Size"
        value={settings.size}
        min={128}
        max={1024}
        step={8}
        unit="px"
        onChange={(size) => setSettings({ size })}
      />

      <Slider
        label="Margin"
        value={settings.margin}
        min={0}
        max={8}
        step={1}
        onChange={(margin) => setSettings({ margin })}
      />

      <div className="space-y-2">
        <span className="text-sm font-medium text-app-label">Error Correction</span>
        <div className="flex gap-2" role="radiogroup" aria-label="Error correction level">
          {LEVELS.map((level) => (
            <button
              key={level}
              type="button"
              role="radio"
              aria-checked={settings.level === level}
              onClick={() => setSettings({ level })}
              className={`
                flex-1 py-2 rounded-xl text-sm font-semibold transition-all
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40
                ${settings.level === level
                  ? 'bg-gradient-to-r from-blue-600/40 to-violet-600/40 text-app border border-app'
                  : 'bg-app-surface text-app-muted border border-transparent hover-app'}
              `}
            >
              {level}
            </button>
          ))}
        </div>
        <p className="text-xs text-app-subtle">Higher levels improve scan reliability with logos</p>
      </div>

      <Toggle
        label="Rounded Style"
        description="Smooth rounded QR modules"
        checked={settings.rounded}
        onChange={(rounded) => setSettings({ rounded })}
      />

      <Toggle
        label="Light Mode"
        description="Switch between dark and light theme"
        checked={theme === 'light'}
        onChange={(light) => {
          if (light !== (theme === 'light')) toggleTheme();
        }}
      />
    </div>
  );
}
