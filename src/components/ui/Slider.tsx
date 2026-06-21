interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (value: number) => void;
  'aria-label'?: string;
}

export function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  onChange,
  'aria-label': ariaLabel,
}: SliderProps) {
  const id = label.toLowerCase().replace(/\s/g, '-');

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-sm font-medium text-gray-300">
          {label}
        </label>
        <span className="text-sm text-gray-400 tabular-nums">
          {value}
          {unit}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={ariaLabel || label}
        className="w-full h-2 rounded-full appearance-none cursor-pointer
          bg-white/10 accent-blue-500
          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
          [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-br
          [&::-webkit-slider-thumb]:from-blue-400 [&::-webkit-slider-thumb]:to-violet-500
          [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-blue-500/30
          focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40"
      />
    </div>
  );
}
