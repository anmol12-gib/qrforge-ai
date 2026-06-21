import type {
  ContactFormData,
  EmailFormData,
  EventFormData,
  FormDataMap,
  LocationFormData,
  QRType,
  SmsFormData,
  UrlFormData,
  WifiFormData,
} from '../types';

function escapeVCard(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
}

function formatIcsDate(date: string, time: string): string {
  if (!date) return '';
  const t = time || '00:00';
  const [year, month, day] = date.split('-');
  const [hours, minutes] = t.split(':');
  return `${year}${month}${day}T${hours}${minutes}00`;
}

export function encodeQRValue<T extends QRType>(type: T, data: FormDataMap[T]): string {
  switch (type) {
    case 'url': {
      const { url } = data as UrlFormData;
      if (!url.trim()) return '';
      return url.startsWith('http') ? url : `https://${url}`;
    }
    case 'text': {
      return (data as FormDataMap['text']).text;
    }
    case 'email': {
      const { email, subject, body } = data as EmailFormData;
      if (!email.trim()) return '';
      const params = new URLSearchParams();
      if (subject) params.set('subject', subject);
      if (body) params.set('body', body);
      const query = params.toString();
      return query ? `mailto:${email}?${query}` : `mailto:${email}`;
    }
    case 'phone': {
      const phone = (data as FormDataMap['phone']).phone.replace(/\s/g, '');
      return phone ? `tel:${phone}` : '';
    }
    case 'sms': {
      const { phone, message } = data as SmsFormData;
      const cleaned = phone.replace(/\s/g, '');
      if (!cleaned) return '';
      return message ? `sms:${cleaned}?body=${encodeURIComponent(message)}` : `sms:${cleaned}`;
    }
    case 'wifi': {
      const { ssid, password, security, hidden } = data as WifiFormData;
      if (!ssid.trim()) return '';
      const escape = (s: string) => s.replace(/([\\;,:"])/g, '\\$1');
      return `WIFI:T:${security};S:${escape(ssid)};P:${escape(password)};H:${hidden ? 'true' : 'false'};;`;
    }
    case 'contact': {
      const { firstName, lastName, phone, email, website, organization } = data as ContactFormData;
      if (!firstName && !lastName && !phone && !email) return '';
      const lines = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `N:${escapeVCard(lastName)};${escapeVCard(firstName)};;;`,
        `FN:${escapeVCard(`${firstName} ${lastName}`.trim())}`,
      ];
      if (organization) lines.push(`ORG:${escapeVCard(organization)}`);
      if (phone) lines.push(`TEL;TYPE=CELL:${phone}`);
      if (email) lines.push(`EMAIL:${email}`);
      if (website) lines.push(`URL:${website.startsWith('http') ? website : `https://${website}`}`);
      lines.push('END:VCARD');
      return lines.join('\n');
    }
    case 'event': {
      const { title, location, startDate, startTime, endDate, endTime, description } = data as EventFormData;
      if (!title.trim()) return '';
      const dtStart = formatIcsDate(startDate, startTime);
      const dtEnd = formatIcsDate(endDate || startDate, endTime || startTime);
      const lines = [
        'BEGIN:VEVENT',
        `SUMMARY:${title}`,
        dtStart ? `DTSTART:${dtStart}` : '',
        dtEnd ? `DTEND:${dtEnd}` : '',
        location ? `LOCATION:${location}` : '',
        description ? `DESCRIPTION:${description}` : '',
        'END:VEVENT',
      ].filter(Boolean);
      return lines.join('\n');
    }
    case 'location': {
      const { latitude, longitude, label } = data as LocationFormData;
      if (!latitude.trim() || !longitude.trim()) return '';
      const coords = `${latitude},${longitude}`;
      return label
        ? `geo:${coords}?q=${encodeURIComponent(`${coords}(${label})`)}`
        : `geo:${coords}`;
    }
    default:
      return '';
  }
}

export function getHistoryLabel<T extends QRType>(type: T, data: FormDataMap[T]): string {
  switch (type) {
    case 'url':
      return (data as UrlFormData).url || 'URL';
    case 'text':
      return ((data as FormDataMap['text']).text || 'Text').slice(0, 40);
    case 'email':
      return (data as EmailFormData).email || 'Email';
    case 'phone':
      return (data as FormDataMap['phone']).phone || 'Phone';
    case 'sms':
      return (data as SmsFormData).phone || 'SMS';
    case 'wifi':
      return (data as WifiFormData).ssid || 'WiFi';
    case 'contact': {
      const c = data as ContactFormData;
      return `${c.firstName} ${c.lastName}`.trim() || 'Contact';
    }
    case 'event':
      return (data as EventFormData).title || 'Event';
    case 'location':
      return (data as LocationFormData).label || 'Location';
    default:
      return 'QR Code';
  }
}

export const DEFAULT_FORM_DATA: FormDataMap = {
  url: { url: 'https://digitalheroesco.com' },
  text: { text: 'Hello from QRForge AI!' },
  email: { email: '', subject: '', body: '' },
  phone: { phone: '' },
  sms: { phone: '', message: '' },
  wifi: { ssid: '', password: '', security: 'WPA', hidden: false },
  contact: { firstName: '', lastName: '', phone: '', email: '', website: '', organization: '' },
  event: { title: '', location: '', startDate: '', startTime: '', endDate: '', endTime: '', description: '' },
  location: { latitude: '', longitude: '', label: '' },
};
