import { motion } from 'framer-motion';
import { SectionTitle } from '../utils/animations';
import { config } from '../config';

export default function Timeline() {
  return (
    <section className="relative py-16 sm:py-28 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0d1b3e 0%, #111830 50%, #0d1b3e 100%)' }}>

      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <SectionTitle sub="What to Expect">Program Timeline</SectionTitle>

        <div className="relative pl-10">
          {/* Vertical gold line */}
          <div className="absolute left-0 top-2 bottom-2 w-px"
            style={{ background: 'linear-gradient(180deg, transparent, rgba(245,200,66,0.4) 10%, rgba(245,200,66,0.4) 90%, transparent)' }} />

          {config.timeline.map((item, i) => (
            <motion.div
              key={item.time}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="relative pb-8 last:pb-0 group"
            >
              {/* Timeline dot */}
              <motion.div
                className="absolute -left-10 top-1 w-4 h-4 rounded-full"
                style={{ background: 'rgba(245,200,66,0.7)', border: '2px solid rgba(245,200,66,0.8)', boxShadow: '0 0 0 4px rgba(245,200,66,0.1)' }}
                whileInView={{ scale: [0.5, 1.3, 1] }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 + 0.2 }}
              >
                {/* Pulse ring */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ border: '1px solid rgba(245,200,66,0.4)' }}
                  animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
                />
              </motion.div>

              <div className="card-peach px-4 sm:px-6 py-4 group-hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center justify-between mb-1 flex-wrap gap-2">
                  <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 18, color: '#e8d8b0', fontWeight: 500 }}>{item.title}</h3>
                  <span style={{ fontFamily: 'Great Vibes, cursive', fontSize: 22, color: '#f5c842' }}>{item.time}</span>
                </div>
                <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 11, color: 'rgba(200,180,140,0.6)', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
