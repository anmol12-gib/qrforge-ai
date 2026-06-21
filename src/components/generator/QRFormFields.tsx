import { useQRStore } from '../../store/useQRStore';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import type { FormDataMap } from '../../types';

export function QRFormFields() {
  const { qrType, formData, updateFormField } = useQRStore();

  const update = (field: string, value: string | boolean) => {
    updateFormField(qrType, field, value);
  };

  const data = formData[qrType];

  return (
    <div
      role="tabpanel"
      id={`panel-${qrType}`}
      aria-labelledby={`tab-${qrType}`}
      className="space-y-4"
    >
      {qrType === 'url' && (
        <Input
          label="Website URL"
          placeholder="https://example.com"
          value={(data as FormDataMap['url']).url}
          onChange={(e) => update('url', e.target.value)}
          aria-label="Website URL"
        />
      )}

      {qrType === 'text' && (
        <Textarea
          label="Text Content"
          placeholder="Enter any text..."
          value={(data as FormDataMap['text']).text}
          onChange={(e) => update('text', e.target.value)}
          rows={4}
          aria-label="Text content"
        />
      )}

      {qrType === 'email' && (
        <>
          <Input
            label="Email Address"
            type="email"
            placeholder="hello@example.com"
            value={(data as FormDataMap['email']).email}
            onChange={(e) => update('email', e.target.value)}
          />
          <Input
            label="Subject"
            placeholder="Optional subject"
            value={(data as FormDataMap['email']).subject}
            onChange={(e) => update('subject', e.target.value)}
          />
          <Textarea
            label="Message Body"
            placeholder="Optional message"
            value={(data as FormDataMap['email']).body}
            onChange={(e) => update('body', e.target.value)}
            rows={3}
          />
        </>
      )}

      {qrType === 'phone' && (
        <Input
          label="Phone Number"
          type="tel"
          placeholder="+1 555 000 0000"
          value={(data as FormDataMap['phone']).phone}
          onChange={(e) => update('phone', e.target.value)}
          hint="Include country code for best results"
        />
      )}

      {qrType === 'sms' && (
        <>
          <Input
            label="Phone Number"
            type="tel"
            placeholder="+1 555 000 0000"
            value={(data as FormDataMap['sms']).phone}
            onChange={(e) => update('phone', e.target.value)}
          />
          <Textarea
            label="Message"
            placeholder="Pre-filled SMS message"
            value={(data as FormDataMap['sms']).message}
            onChange={(e) => update('message', e.target.value)}
            rows={3}
          />
        </>
      )}

      {qrType === 'wifi' && (
        <>
          <Input
            label="Network Name (SSID)"
            placeholder="My WiFi Network"
            value={(data as FormDataMap['wifi']).ssid}
            onChange={(e) => update('ssid', e.target.value)}
          />
          <Input
            label="Password"
            type="password"
            placeholder="WiFi password"
            value={(data as FormDataMap['wifi']).password}
            onChange={(e) => update('password', e.target.value)}
          />
          <div className="space-y-1.5">
            <label htmlFor="wifi-security" className="block text-sm font-medium text-gray-300">
              Security Type
            </label>
            <select
              id="wifi-security"
              value={(data as FormDataMap['wifi']).security}
              onChange={(e) => update('security', e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white
                focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
            >
              <option value="WPA">WPA/WPA2</option>
              <option value="WEP">WEP</option>
              <option value="nopass">No Password</option>
            </select>
          </div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={(data as FormDataMap['wifi']).hidden}
              onChange={(e) => update('hidden', e.target.checked)}
              className="w-4 h-4 rounded accent-blue-500"
            />
            <span className="text-sm text-gray-300">Hidden network</span>
          </label>
        </>
      )}

      {qrType === 'contact' && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="First Name"
              value={(data as FormDataMap['contact']).firstName}
              onChange={(e) => update('firstName', e.target.value)}
            />
            <Input
              label="Last Name"
              value={(data as FormDataMap['contact']).lastName}
              onChange={(e) => update('lastName', e.target.value)}
            />
          </div>
          <Input
            label="Phone"
            type="tel"
            value={(data as FormDataMap['contact']).phone}
            onChange={(e) => update('phone', e.target.value)}
          />
          <Input
            label="Email"
            type="email"
            value={(data as FormDataMap['contact']).email}
            onChange={(e) => update('email', e.target.value)}
          />
          <Input
            label="Website"
            placeholder="https://example.com"
            value={(data as FormDataMap['contact']).website}
            onChange={(e) => update('website', e.target.value)}
          />
          <Input
            label="Organization"
            value={(data as FormDataMap['contact']).organization}
            onChange={(e) => update('organization', e.target.value)}
          />
        </>
      )}

      {qrType === 'event' && (
        <>
          <Input
            label="Event Title"
            placeholder="Team Meeting"
            value={(data as FormDataMap['event']).title}
            onChange={(e) => update('title', e.target.value)}
          />
          <Input
            label="Location"
            placeholder="Conference Room A"
            value={(data as FormDataMap['event']).location}
            onChange={(e) => update('location', e.target.value)}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Start Date"
              type="date"
              value={(data as FormDataMap['event']).startDate}
              onChange={(e) => update('startDate', e.target.value)}
            />
            <Input
              label="Start Time"
              type="time"
              value={(data as FormDataMap['event']).startTime}
              onChange={(e) => update('startTime', e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="End Date"
              type="date"
              value={(data as FormDataMap['event']).endDate}
              onChange={(e) => update('endDate', e.target.value)}
            />
            <Input
              label="End Time"
              type="time"
              value={(data as FormDataMap['event']).endTime}
              onChange={(e) => update('endTime', e.target.value)}
            />
          </div>
          <Textarea
            label="Description"
            value={(data as FormDataMap['event']).description}
            onChange={(e) => update('description', e.target.value)}
            rows={3}
          />
        </>
      )}

      {qrType === 'location' && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Latitude"
              placeholder="37.7749"
              value={(data as FormDataMap['location']).latitude}
              onChange={(e) => update('latitude', e.target.value)}
            />
            <Input
              label="Longitude"
              placeholder="-122.4194"
              value={(data as FormDataMap['location']).longitude}
              onChange={(e) => update('longitude', e.target.value)}
            />
          </div>
          <Input
            label="Label"
            placeholder="San Francisco, CA"
            value={(data as FormDataMap['location']).label}
            onChange={(e) => update('label', e.target.value)}
            hint="Opens in Google Maps when scanned"
          />
        </>
      )}
    </div>
  );
}
