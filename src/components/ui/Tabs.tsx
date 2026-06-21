import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface TabsProps<T extends string> {
  tabs: { id: T; label: string; icon?: ReactNode }[];
  active: T;
  onChange: (id: T) => void;
  'aria-label': string;
}

export function Tabs<T extends string>({ tabs, active, onChange, 'aria-label': ariaLabel }: TabsProps<T>) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className="flex flex-wrap gap-2 p-1.5 bg-app-surface border border-app rounded-2xl"
    >
      {tabs.map((tab) => {
        const isActive = tab.id === active;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            aria-controls={`panel-${tab.id}`}
            id={`tab-${tab.id}`}
            onClick={() => onChange(tab.id)}
            className={`
              relative flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium
              transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40
              ${isActive ? 'text-app' : 'text-app-muted hover:text-app'}
            `}
          >
            {isActive && (
              <motion.div
                layoutId="active-tab"
                className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-violet-600/30 border border-app rounded-xl"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
              />
            )}
            <span className="relative flex items-center gap-1.5">
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
