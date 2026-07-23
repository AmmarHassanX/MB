import React from "react";
import styled from "styled-components";
import CountUp from "../../motion/CountUp";
import { RevealStagger, RevealItem } from "../../motion/Reveal";

/*
  CoverageMap — recreated from the reference spec's "Delivering Across All
  92 Indiana Counties": a stylized map panel with 3 pulsing pins, next to
  a checklist of delivery guarantees. Followed by the 4-stat trust strip
  ("450+ Active Retail Partners" etc.) from the same section of the spec.
*/

const PERKS = [
  "Same-day delivery in Indianapolis metro",
  "Next-day delivery statewide",
  "Free delivery on orders over $500",
  "Real-time GPS tracking",
  "Temperature-controlled transport",
];

// Approximate positions within the map's viewBox, for a stylized (not
// survey-accurate) reference — precise location lives in the Find Store
// section's real Google Maps embed.
const CITIES = [
  { name: "South Bend", top: "12%", left: "42%" },
  { name: "Fort Wayne", top: "22%", left: "72%" },
  { name: "Indianapolis", top: "52%", left: "48%" },
  { name: "Evansville", top: "88%", left: "22%" },
  { name: "Gary", top: "10%", left: "18%" },
];

const STATS = [
  { emoji: "🏪", value: 450, suffix: "+", label: "Active Retail Partners" },
  { emoji: "📦", value: 50, suffix: "K+", label: "Orders Delivered" },
  { emoji: "⭐", value: 4.9, decimals: 1, suffix: "/5", label: "Customer Rating" },
  { emoji: "🚚", value: 98, suffix: "%", label: "On-Time Delivery" },
];

export default function CoverageMap() {
  return (
    <>
      <MapRoot>
        <div className="visual">
          <div className="map">
            <svg viewBox="0 0 300 400" className="state-shape" aria-label="Outline of the state of Indiana">
              <defs>
                <linearGradient id="mbwMapGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="var(--accent)" />
                  <stop offset="100%" stopColor="var(--accent-hover)" />
                </linearGradient>
              </defs>
              {/* Hand-plotted simplified Indiana outline: flat E/W borders, the
                  Ohio River's southern curve, and the Lake Michigan notch (NW). */}
              <path
                d="M 70 12
                   L 210 12
                   L 210 90
                   L 245 90
                   L 245 340
                   L 205 340
                   L 190 375
                   L 165 385
                   L 150 365
                   L 130 375
                   L 110 355
                   L 90 360
                   L 75 335
                   L 60 340
                   L 55 300
                   L 65 270
                   L 55 240
                   L 60 200
                   L 50 150
                   L 60 100
                   L 70 70
                   Z"
              />
            </svg>
            {CITIES.map((c) => (
              <span className="pin" style={{ top: c.top, left: c.left }} key={c.name} title={c.name}>
                <span className="pin-label">{c.name}</span>
              </span>
            ))}
          </div>
        </div>
        <div className="info">
          <h3>Delivering Across All 92 Indiana Counties</h3>
          <p>From our central Indiana warehouse, we provide fast, reliable delivery to every corner of the state.</p>
          <RevealStagger className="perks-list">
            {PERKS.map((p) => (
              <RevealItem key={p} className="perk-row">
                <span className="check">✓</span>
                {p}
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </MapRoot>

      <StatsRoot>
        <div className="head">
          <h2>Trusted by Indiana Retailers</h2>
          <p>Join hundreds of convenience stores, smoke shops, and gas stations across Indiana who trust MB Wholesale.</p>
        </div>
        <RevealStagger className="grid">
          {STATS.map((s) => (
            <RevealItem key={s.label}>
              <div className="stat">
                <span className="emoji">{s.emoji}</span>
                <span className="num">
                  <CountUp value={s.value} suffix={s.suffix} decimals={s.decimals || 0} />
                </span>
                <span className="label">{s.label}</span>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>
      </StatsRoot>
    </>
  );
}

const MapRoot = styled.section`
  background: linear-gradient(180deg, var(--bg) 0%, var(--bg-elevated) 100%);
  padding: 4.5rem 1.5rem;

  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;

  @media screen and (max-width: 900px) {
    grid-template-columns: 1fr;
  }

  .visual {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 2rem;
    box-shadow: var(--shadow-card);
  }

  .map {
    width: 100%;
    height: 380px;
    border-radius: var(--radius-md);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--surface-2);

    .state-shape {
      width: 62%;
      height: 92%;
      path {
        fill: url(#mbwMapGrad);
        stroke: var(--accent-hover);
        stroke-width: 2;
      }
    }
  }

  .pin {
    position: absolute;
    width: 16px;
    height: 16px;
    background: #f59e0b;
    border-radius: 50%;
    border: 3px solid #fff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35);
    animation: mapPulse 2s infinite;
    cursor: default;

    .pin-label {
      position: absolute;
      bottom: calc(100% + 6px);
      left: 50%;
      transform: translateX(-50%);
      white-space: nowrap;
      font-size: 0.7rem;
      font-weight: 600;
      color: var(--text);
      background: var(--surface);
      border: 1px solid var(--border);
      padding: 0.2rem 0.5rem;
      border-radius: 999px;
      opacity: 0;
      pointer-events: none;
      transition: opacity var(--dur-fast) ease;
    }

    &:hover .pin-label {
      opacity: 1;
    }
  }

  @keyframes mapPulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.2); opacity: 0.8; }
  }

  .info {
    h3 {
      font-family: var(--font-display);
      font-size: 1.6rem;
      color: var(--text);
      margin: 0 0 1rem;
    }
    p {
      color: var(--text-2);
      margin: 0 0 1.5rem;
    }
    .perks-list {
      margin: 0;
      padding: 0;
    }
    .perk-row {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 0;
      border-bottom: 1px solid var(--border);
      font-size: 0.95rem;
      color: var(--text);
    }
    .check {
      color: var(--accent);
      font-weight: 700;
    }
  }
`;

const StatsRoot = styled.section`
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 4.5rem 1.5rem;

  .head {
    text-align: center;
    margin-bottom: 2.5rem;

    h2 {
      font-family: var(--font-display);
      font-size: clamp(1.9rem, 3.6vw, 2.6rem);
      color: var(--text);
      margin: 0 0 0.75rem;
    }
    p {
      color: var(--text-2);
      max-width: 560px;
      margin: 0 auto;
    }
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.25rem;

    @media screen and (max-width: 700px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .stat {
    text-align: center;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    padding: 2rem;
    transition: transform var(--dur-fast) var(--ease-out);

    &:hover {
      transform: translateY(-4px);
    }

    .emoji {
      display: block;
      font-size: 2.25rem;
      margin-bottom: 0.75rem;
    }
    .num {
      display: block;
      font-size: 1.8rem;
      font-weight: 800;
      color: var(--text);
      margin-bottom: 0.4rem;
    }
    .label {
      color: var(--text-2);
      font-size: 0.85rem;
    }
  }
`;
