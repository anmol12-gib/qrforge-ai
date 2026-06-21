interface ToggleProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  description?: string;
}

export function Toggle({ label, checked, onChange, description }: ToggleProps) {
  const id = `toggle-${label.toLowerCase().replace(/\s/g, '-')}`;

  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <label htmlFor={id} className="text-sm font-medium text-app-label cursor-pointer">
          {label}
        </label>
        {description && <p className="text-xs text-app-subtle mt-0.5">{description}</p>}
      </div>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={`
          relative w-11 h-6 rounded-full transition-colors duration-200 shrink-0
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 ring-offset-app
          ${checked ? 'bg-gradient-to-r from-blue-600 to-violet-600' : 'bg-app-surface'}
        `}
      >
        <span
          className={`
            absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-md
            transition-transform duration-200
            ${checked ? 'translate-x-5' : 'translate-x-0'}
          `}
        />
      </button>
    </div>
  );
}
