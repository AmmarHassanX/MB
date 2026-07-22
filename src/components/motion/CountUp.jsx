import React, { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

/*
  CountUp — renders `prefix + number + suffix` and animates the number
  counting up from 0 the moment it scrolls into view (once). Implemented
  with plain requestAnimationFrame rather than framer-motion's internal
  motion-value event API, since that API differs across framer-motion
  versions and a mismatch there previously crashed this component (and
  broke the whole page render as a result).
*/

export default function CountUp({ value, prefix = "", suffix = "", duration = 1200 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      // easeOutCubic — fast start, gentle settle
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}
