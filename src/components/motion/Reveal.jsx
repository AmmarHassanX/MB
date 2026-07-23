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
      initial={{ opacity: 0, y: 56, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/*
  RevealStagger — wrap a grid/list; each direct RevealItem child fades up
  in sequence as the group scrolls into view, instead of all at once.
  Usage: <RevealStagger><RevealItem>...</RevealItem>...</RevealStagger>
*/
const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const staggerItem = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export function RevealStagger({ children, className }) {
  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className }) {
  return (
    <motion.div className={className} variants={staggerItem}>
      {children}
    </motion.div>
  );
}
