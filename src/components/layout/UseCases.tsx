import { motion } from 'framer-motion';
import { Building2, Calendar, MapPin, ShoppingBag, Utensils, Wifi } from 'lucide-react';

const USE_CASES = [
  {
    icon: ShoppingBag,
    title: 'E-Commerce',
    description: 'Link product pages, promo codes, and checkout flows directly from packaging.',
    gradient: 'from-blue-500/20 to-cyan-500/20',
  },
  {
    icon: Utensils,
    title: 'Restaurants',
    description: 'Digital menus, WiFi access, and reservation links on every table.',
    gradient: 'from-violet-500/20 to-pink-500/20',
  },
  {
    icon: Building2,
    title: 'Business Cards',
    description: 'vCard QR codes that save your contact info with a single scan.',
    gradient: 'from-emerald-500/20 to-teal-500/20',
  },
  {
    icon: Calendar,
    title: 'Events',
    description: 'Calendar event QR codes for conferences, meetups, and webinars.',
    gradient: 'from-orange-500/20 to-amber-500/20',
  },
  {
    icon: MapPin,
    title: 'Locations',
    description: 'Google Maps links for stores, venues, and pop-up locations.',
    gradient: 'from-rose-500/20 to-red-500/20',
  },
  {
    icon: Wifi,
    title: 'Guest WiFi',
    description: 'Let guests connect instantly without typing passwords.',
    gradient: 'from-indigo-500/20 to-blue-500/20',
  },
];

export function UseCases() {
  return (
    <section id="use-cases" className="py-24 px-4 sm:px-6 bg-app-surface" aria-labelledby="use-cases-heading">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 id="use-cases-heading" className="text-3xl sm:text-4xl font-bold mb-4">
            Built for every use case
          </h2>
          <p className="text-app-muted max-w-2xl mx-auto">
            From marketing campaigns to everyday convenience — QRForge AI handles it all.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {USE_CASES.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`relative overflow-hidden p-8 rounded-2xl border border-app
                bg-gradient-to-br ${item.gradient} hover:border-app-hover transition-all`}
            >
              <item.icon className="w-10 h-10 text-app mb-4" aria-hidden />
              <h3 className="text-xl font-semibold mb-2 text-app">{item.title}</h3>
              <p className="text-app-muted text-sm leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
