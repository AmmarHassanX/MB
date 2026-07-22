import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import styled from "styled-components";

/*
  ScrollProgress — a thin bar pinned under the header that fills left-to-right
  as the visitor scrolls the page. Unlike Reveal (which triggers once when a
  section enters view), this is driven continuously by scroll position itself
  — the "cursor's progress down the page" effect.
  useSpring smooths the raw scroll value so it glides instead of jittering.
*/

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 300, damping: 40, mass: 0.2 });

  return (
    <Bar style={{ scaleX }} aria-hidden="true">
      <motion.div className="fill" />
    </Bar>
  );
}

const Bar = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 2.5px;
  background: var(--accent);
  transform-origin: 0% 50%;
  z-index: 2000;
`;
