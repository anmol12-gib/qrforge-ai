import { create } from 'zustand';
import { DEFAULT_FORM_DATA, encodeQRValue, getHistoryLabel } from '../lib/qrFormats';
import { loadHistory, loadTheme, saveHistory, saveTheme } from '../lib/storage';
import type {
  FormDataMap,
  HistoryItem,
  QRSettings,
  QRType,
} from '../types';

const defaultSettings: QRSettings = {
  fgColor: '#0f172a',
  bgColor: '#ffffff',
  size: 280,
  margin: 2,
  level: 'M',
  rounded: false,
  logoUrl: null,
  logoSize: 0.2,
};

interface QRStore {
  qrType: QRType;
  formData: FormDataMap;
  settings: QRSettings;
  history: HistoryItem[];
  theme: 'dark' | 'light';
  encodedValue: string;

  setQrType: (type: QRType) => void;
  updateFormField: (type: QRType, field: string, value: string | boolean) => void;
  setSettings: (partial: Partial<QRSettings>) => void;
  setLogo: (url: string | null) => void;
  toggleTheme: () => void;
  addToHistory: () => void;
  loadFromHistory: (item: HistoryItem) => void;
  removeFromHistory: (id: string) => void;
  clearHistory: () => void;
  syncEncodedValue: () => void;
}

function computeEncoded(type: QRType, formData: FormDataMap): string {
  return encodeQRValue(type, formData[type]);
}

export const useQRStore = create<QRStore>((set, get) => ({
  qrType: 'url',
  formData: { ...DEFAULT_FORM_DATA },
  settings: { ...defaultSettings },
  history: loadHistory(),
  theme: loadTheme(),
  encodedValue: computeEncoded('url', DEFAULT_FORM_DATA),

  setQrType: (qrType) => {
    const { formData } = get();
    set({ qrType, encodedValue: computeEncoded(qrType, formData) });
  },

  updateFormField: (type, field, value) => {
    set((state) => {
      const updated = {
        ...state.formData,
        [type]: { ...state.formData[type], [field]: value },
      };
      const encodedValue = state.qrType === type ? computeEncoded(type, updated) : state.encodedValue;
      return { formData: updated, encodedValue };
    });
  },

  setSettings: (partial) => {
    set((state) => ({ settings: { ...state.settings, ...partial } }));
  },

  setLogo: (logoUrl) => {
    set((state) => ({ settings: { ...state.settings, logoUrl } }));
  },

  toggleTheme: () => {
    set((state) => {
      const theme = state.theme === 'dark' ? 'light' : 'dark';
      saveTheme(theme);
      return { theme };
    });
  },

  addToHistory: () => {
    const { qrType, formData, settings, encodedValue, history } = get();
    if (!encodedValue.trim()) return;

    const item: HistoryItem = {
      id: crypto.randomUUID(),
      type: qrType,
      encodedValue,
      label: getHistoryLabel(qrType, formData[qrType]),
      createdAt: Date.now(),
      settings: { ...settings },
      formData: { ...formData[qrType] },
    };

    const newHistory = [item, ...history.filter((h) => h.encodedValue !== encodedValue)].slice(0, 10);
    saveHistory(newHistory);
    set({ history: newHistory });
  },

  loadFromHistory: (item) => {
    set((state) => ({
      qrType: item.type,
      formData: { ...state.formData, [item.type]: item.formData },
      settings: { ...item.settings },
      encodedValue: item.encodedValue,
    }));
  },

  removeFromHistory: (id) => {
    const newHistory = get().history.filter((h) => h.id !== id);
    saveHistory(newHistory);
    set({ history: newHistory });
  },

  clearHistory: () => {
    saveHistory([]);
    set({ history: [] });
  },

  syncEncodedValue: () => {
    const { qrType, formData } = get();
    set({ encodedValue: computeEncoded(qrType, formData) });
  },
}));

export function getRenderOptions(state: Pick<QRStore, 'encodedValue' | 'settings'>) {
  const { encodedValue, settings } = state;
  return {
    value: encodedValue,
    size: settings.size,
    margin: settings.margin,
    fgColor: settings.fgColor,
    bgColor: settings.bgColor,
    level: settings.level,
    rounded: settings.rounded,
    logoUrl: settings.logoUrl,
    logoScale: settings.logoSize,
  };
}
