import { motion } from 'framer-motion';
import { SectionTitle } from '../utils/animations';
import weddingVideo from '../images/wedding-video.mp4';
import posterImg from '../images/RAJ04825.JPG.jpeg';

const notify = (name) => window.dispatchEvent(new Event(name));

export default function VideoSection() {
  return (
    <section
      id="video"
      className="relative py-16 sm:py-28 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0d1b3e 0%, #111830 50%, #0d1b3e 100%)',
      }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <SectionTitle sub="A Glimpse of Our Joy">Our Moments</SectionTitle>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-sm rounded-2xl overflow-hidden border border-gold/40 shadow-2xl"
        >
          <video
            src={weddingVideo}
            poster={posterImg}
            onPlay={() => notify('wedding:video-play')}
            onPause={() => notify('wedding:video-stop')}
            onEnded={() => notify('wedding:video-stop')}
            controls
            playsInline
            preload="metadata"
            className="w-full h-auto block bg-black"
          />
        </motion.div>
      </div>
    </section>
  );
}
