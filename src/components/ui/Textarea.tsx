import { type InputHTMLAttributes } from 'react';

interface TextareaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  rows?: number;
}

export function Textarea({ label, hint, className = '', id, rows = 3, ...props }: TextareaProps) {
  const inputId = id || label?.toLowerCase().replace(/\s/g, '-');

  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-300">
          {label}
        </label>
      )}
      <textarea
        id={inputId}
        rows={rows}
        className={`
          w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white
          placeholder:text-gray-500 transition-all duration-200 resize-y min-h-[80px]
          hover:border-white/20 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20
          focus:outline-none
          ${className}
        `}
        aria-describedby={hint ? `${inputId}-hint` : undefined}
        {...props}
      />
      {hint && (
        <p id={`${inputId}-hint`} className="text-xs text-gray-500">
          {hint}
        </p>
      )}
    </div>
  );
}
