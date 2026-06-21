import { forwardRef, type ButtonHTMLAttributes, type ReactNode, useRef, useState } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  icon?: ReactNode;
  ripple?: boolean;
}

const variants: Record<Variant, string> = {
  primary:
    'bg-gradient-to-r from-blue-600 via-violet-600 to-cyan-500 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:brightness-110 active:scale-[0.97]',
  secondary:
    'bg-white/10 text-white border border-white/10 hover:bg-white/15 hover:border-white/20 active:scale-[0.97]',
  ghost: 'text-gray-300 hover:text-white hover:bg-white/5 active:scale-[0.97]',
  outline:
    'border border-white/15 text-white hover:bg-white/5 hover:border-white/25 active:scale-[0.97]',
};

const sizes: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm rounded-lg',
  md: 'px-5 py-2.5 text-sm rounded-xl',
  lg: 'px-8 py-3.5 text-base rounded-2xl',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      icon,
      ripple = true,
      className = '',
      children,
      disabled,
      onClick,
      type = 'button',
      ...props
    },
    ref,
  ) => {
    const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
    const internalRef = useRef<HTMLButtonElement>(null);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      const el = (ref as React.RefObject<HTMLButtonElement>)?.current ?? internalRef.current;
      if (ripple && el) {
        const rect = el.getBoundingClientRect();
        const id = Date.now();
        setRipples((prev) => [
          ...prev,
          { x: e.clientX - rect.left, y: e.clientY - rect.top, id },
        ]);
        setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 600);
      }
      onClick?.(e);
    };

    return (
      <button
        ref={ref ?? internalRef}
        type={type}
        className={`
          relative overflow-hidden inline-flex items-center justify-center gap-2 font-semibold
          transition-all duration-200 focus-visible:outline-none focus-visible:ring-2
          focus-visible:ring-blue-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]
          disabled:opacity-50 disabled:cursor-not-allowed
          ${variants[variant]} ${sizes[size]} ${className}
        `}
        disabled={disabled || loading}
        onClick={handleClick}
        {...props}
      >
        {ripples.map((r) => (
          <span
            key={r.id}
            className="absolute rounded-full bg-white/30 animate-ripple pointer-events-none"
            style={{ left: r.x, top: r.y, width: 8, height: 8, marginLeft: -4, marginTop: -4 }}
          />
        ))}
        {loading ? (
          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : icon ? (
          <span className="shrink-0">{icon}</span>
        ) : null}
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
