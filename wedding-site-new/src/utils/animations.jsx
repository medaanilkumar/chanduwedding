import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export function useReveal(threshold = 0.15) {
  const [ref, inView] = useInView({ threshold, triggerOnce: true });
  return { ref, inView };
}

export const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i = 0) => ({
    opacity: 1,
    transition: { duration: 0.6, delay: i * 0.1 },
  }),
};

export const scaleUp = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

export const slideLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

export const slideRight = {
  hidden: { opacity: 0, x: 60 },
  visible: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function RevealSection({ children, className = '', variants = fadeUp, threshold = 0.12 }) {
  const { ref, inView } = useReveal(threshold);
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SectionTitle({ children, sub }) {
  const { ref, inView } = useReveal();
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className="text-center mb-14"
    >
      {sub && (
        <motion.p
          variants={fadeUp}
          custom={0}
          className="section-label"
          style={{ marginBottom: 10 }}
        >
          {sub}
        </motion.p>
      )}
      <motion.h2
        variants={fadeUp}
        custom={1}
        className="section-title"
        style={{ display: 'block', paddingTop: '0.2em', overflow: 'visible' }}
      >
        {children}
      </motion.h2>
      <motion.div variants={fadeUp} custom={2} className="ornament mt-4" style={{ gap: 8 }}>
        <span style={{ color: 'rgba(196,103,58,0.5)', fontSize: 11 }}>◆</span>
      </motion.div>
    </motion.div>
  );
}
