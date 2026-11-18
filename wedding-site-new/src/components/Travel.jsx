import { motion } from 'framer-motion';
import { SectionTitle } from '../utils/animations';
import { config } from '../config';

export default function Travel() {
  return (
    <section id="travel" className="relative py-16 sm:py-28 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0d1b3e 0%, #111830 50%, #0d1b3e 100%)' }}>

      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <SectionTitle sub="Plan Your Visit">Travel & Stay</SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              icon: '🏨',
              title: 'Accommodation',
              body: config.accommodation,
              cta: null,
            },
            {
              icon: '✈️',
              title: 'Getting Here',
              body: 'Hyderabad Rajiv Gandhi International Airport is 45 min away. Cab & auto services available. Dedicated shuttle from Banjara Hills Metro Station every 30 minutes from 4 PM.',
              cta: null,
            },
            {
              icon: '🎁',
              title: 'Gifts',
              body: "Your presence and blessings are the greatest gift. If you'd like to give more, a contribution toward our new home would be warmly cherished.",
              cta: null,
            },
            {
              icon: '📱',
              title: 'Contact',
              body: "For any queries, reach out to us on WhatsApp. We'll be happy to help with anything — travel, accommodation, or just to chat!",
              cta: { label: 'WhatsApp Us', href: `https://wa.me/${config.whatsapp}` },
            },
          ].map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="card-peach p-5 sm:p-7 flex flex-col gap-3 group"
            >
              <div className="text-3xl">{card.icon}</div>
              <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 20, color: '#e8d8b0', fontWeight: 500 }}>{card.title}</h3>
              <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 12, color: 'rgba(200,180,140,0.65)', lineHeight: 1.7, flex: 1 }}>{card.body}</p>
              {card.cta && (
                <a href={card.cta.href} target="_blank" rel="noopener" className="btn-outline text-xs mt-2 justify-center text-center">
                  {card.cta.label}
                </a>
              )}
              {/* Bottom glow on hover */}
              <div className="h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 -mx-7 -mb-7 mt-auto"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(245,200,66,0.3), transparent)' }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
