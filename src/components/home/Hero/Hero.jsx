import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import styled from "styled-components";
import { PiStarThin } from "react-icons/pi";

/*
  Hero — the Direction 2 statement section.
  - Big staggered headline animated in with framer-motion
  - Two CTAs (primary scrolls to products, secondary goes to registration)
  - Infinite marquee ticker of deal programs (pure CSS animation — cheap for
    the browser; the list is rendered twice so the loop is seamless)
  All colors come from design tokens, so it adapts to dark/light mode.
*/

const DEALS = [
  "NICK'S DAILY DEAL",
  "WEEKLY SPECIAL",
  "MONTHLY HOT DEAL",
  "LOYALTY MULTIPLIER",
];

// Animation choreography: parent staggers its children by 0.12s
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const lineUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  const scrollToProducts = () => {
    document
      .getElementById("home-products")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <Root>
      <Inner>
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div className="badge" variants={lineUp}>
            <span className="dot" />
            Now Accepting Wholesale Orders
          </motion.div>
          <Headline variants={container}>
            <motion.span variants={lineUp}>Your Trusted</motion.span>
            <motion.span variants={lineUp}>
              <em className="accent">Wholesale</em> Partner
            </motion.span>
          </Headline>
          <motion.p className="sub" variants={lineUp}>
            Premium vapes, cigars, beverages, and gas station essentials — all
            under one roof. Bulk pricing, fast delivery, and unmatched quality
            for retailers nationwide.
          </motion.p>
          <motion.div className="ctas" variants={lineUp}>
            <button type="button" className="primary" onClick={scrollToProducts}>
              Shop deals
            </button>
            <Link href="/account/login">
              <a className="secondary">Browse Products</a>
            </Link>
          </motion.div>
        </motion.div>
      </Inner>

      <Ticker aria-hidden="true">
        <div className="track">
          {[...DEALS, ...DEALS, ...DEALS].map((deal, i) => (
            <span className="item" key={i}>
              <PiStarThin className="star" />
              {deal}
            </span>
          ))}
        </div>
      </Ticker>
    </Root>
  );
}

const Root = styled.section`
  background: var(--bg);
  border-bottom: 1px solid var(--border);
`;

const Inner = styled.div`
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 4.5rem 1.5rem 3.5rem;

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
    font-size: 0.85rem;
    color: var(--text-2);
    border: 1px solid var(--border);
    background: var(--surface);
    border-radius: 999px;
    padding: 0.45rem 1rem;
    margin-bottom: 1.4rem;

    .dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--accent);
    }
  }

  .sub {
    max-width: 480px;
    color: var(--text-2);
    font-size: 1.05rem;
    line-height: 1.65;
    margin: 1.25rem 0 2rem;
  }

  .ctas {
    display: flex;
    gap: 0.9rem;
    flex-wrap: wrap;

    .primary {
      font-size: 0.95rem;
      font-weight: 500;
      font-family: inherit;
      color: var(--accent-contrast);
      background: var(--accent);
      border: none;
      border-radius: var(--radius-sm);
      padding: 0.8rem 1.7rem;
      cursor: pointer;
      transition: transform var(--dur-fast) var(--ease-out),
        background var(--dur-fast) ease;
      &:hover {
        background: var(--accent-hover);
        transform: translateY(-2px);
      }
    }

    .secondary {
      font-size: 0.95rem;
      color: var(--text);
      border: 1px solid var(--border-strong);
      border-radius: var(--radius-sm);
      padding: 0.8rem 1.7rem;
      cursor: pointer;
      transition: border-color var(--dur-fast) ease,
        transform var(--dur-fast) var(--ease-out);
      &:hover {
        border-color: var(--accent);
        transform: translateY(-2px);
      }
    }
  }

  @media screen and (max-width: 640px) {
    padding: 3rem 1.25rem 2.5rem;
  }
`;

const Headline = styled(motion.h1)`
  display: flex;
  flex-direction: column;
  font-family: var(--font-display);
  font-size: clamp(2.7rem, 7vw, 4.8rem);
  font-weight: 600;
  line-height: 1.12;
  color: var(--text);
  letter-spacing: -0.01em;
  margin: 0;

  .accent {
    color: var(--accent);
    font-style: normal;
    position: relative;
    display: inline-block;
    padding-bottom: 0.08em;
    border-bottom: 4px solid var(--accent);
  }
`;

const Ticker = styled.div`
  overflow: hidden;
  border-top: 1px solid var(--border);
  padding: 0.85rem 0;
  white-space: nowrap;

  .track {
    display: inline-flex;
    align-items: center;
    animation: heroTicker 28s linear infinite;
  }

  .item {
    display: inline-flex;
    align-items: center;
    gap: 0.9rem;
    padding-right: 3rem;
    font-size: 0.85rem;
    letter-spacing: 0.14em;
    color: var(--text-2);

    .star {
      color: var(--accent);
      font-size: 1rem;
    }
  }

  &:hover .track {
    animation-play-state: paused;
  }

  @keyframes heroTicker {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-33.333%);
    }
  }
`;
