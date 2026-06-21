import { forwardRef, type InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, hint, error, className = '', id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s/g, '-');

    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-app-label">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`
            w-full bg-app-input border border-app rounded-xl px-4 py-3 text-app
            placeholder:text-app-subtle transition-all duration-200
            hover:border-app-hover focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20
            focus:outline-none disabled:opacity-50
            ${error ? 'border-red-500/50' : ''} ${className}
          `}
          aria-invalid={!!error}
          aria-describedby={hint ? `${inputId}-hint` : undefined}
          {...props}
        />
        {hint && !error && (
          <p id={`${inputId}-hint`} className="text-xs text-app-subtle">
            {hint}
          </p>
        )}
        {error && <p className="text-xs text-red-400">{error}</p>}
      </div>
    );
  },
);

Input.displayName = 'Input';
