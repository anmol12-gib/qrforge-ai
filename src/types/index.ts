export type QRType =
  | 'url'
  | 'text'
  | 'email'
  | 'phone'
  | 'sms'
  | 'wifi'
  | 'contact'
  | 'event'
  | 'location';

export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

export type WifiSecurity = 'WPA' | 'WEP' | 'nopass';

export interface UrlFormData {
  url: string;
}

export interface TextFormData {
  text: string;
}

export interface EmailFormData {
  email: string;
  subject: string;
  body: string;
}

export interface PhoneFormData {
  phone: string;
}

export interface SmsFormData {
  phone: string;
  message: string;
}

export interface WifiFormData {
  ssid: string;
  password: string;
  security: WifiSecurity;
  hidden: boolean;
}

export interface ContactFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  website: string;
  organization: string;
}

export interface EventFormData {
  title: string;
  location: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  description: string;
}

export interface LocationFormData {
  latitude: string;
  longitude: string;
  label: string;
}

export type FormDataMap = {
  url: UrlFormData;
  text: TextFormData;
  email: EmailFormData;
  phone: PhoneFormData;
  sms: SmsFormData;
  wifi: WifiFormData;
  contact: ContactFormData;
  event: EventFormData;
  location: LocationFormData;
};

export interface QRSettings {
  fgColor: string;
  bgColor: string;
  size: number;
  margin: number;
  level: ErrorCorrectionLevel;
  rounded: boolean;
  logoUrl: string | null;
  logoSize: number;
}

export interface HistoryItem {
  id: string;
  type: QRType;
  encodedValue: string;
  label: string;
  createdAt: number;
  settings: QRSettings;
  formData: FormDataMap[QRType];
}

export interface QRTypeConfig {
  id: QRType;
  label: string;
  description: string;
  icon: string;
}
