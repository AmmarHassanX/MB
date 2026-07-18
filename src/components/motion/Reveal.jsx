import React from "react";
import { motion } from "framer-motion";

/*
  Reveal — wrap any section in <Reveal> and it fades + slides up the first
  time it scrolls into view. `viewport={{ once: true }}` means the animation
  plays once and doesn't re-trigger on scroll-up (less distracting).
  `amount: 0.15` = trigger when 15% of the section is visible.
*/

export default function Reveal({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
