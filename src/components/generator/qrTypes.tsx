import {
  Calendar,
  Contact,
  Link2,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Text,
  Wifi,
} from 'lucide-react';
import type { ReactNode } from 'react';
import type { QRType } from '../../types';

export const QR_TYPE_TABS: { id: QRType; label: string; icon: ReactNode }[] = [
  { id: 'url', label: 'URL', icon: <Link2 className="w-4 h-4" /> },
  { id: 'text', label: 'Text', icon: <Text className="w-4 h-4" /> },
  { id: 'email', label: 'Email', icon: <Mail className="w-4 h-4" /> },
  { id: 'phone', label: 'Phone', icon: <Phone className="w-4 h-4" /> },
  { id: 'sms', label: 'SMS', icon: <MessageSquare className="w-4 h-4" /> },
  { id: 'wifi', label: 'WiFi', icon: <Wifi className="w-4 h-4" /> },
  { id: 'contact', label: 'Contact', icon: <Contact className="w-4 h-4" /> },
  { id: 'event', label: 'Event', icon: <Calendar className="w-4 h-4" /> },
  { id: 'location', label: 'Location', icon: <MapPin className="w-4 h-4" /> },
];
