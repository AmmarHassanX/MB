import React from "react";
import styled from "styled-components";

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

const STATS = [
  { emoji: "🏪", num: "450+", label: "Active Retail Partners" },
  { emoji: "📦", num: "50K+", label: "Orders Delivered" },
  { emoji: "⭐", num: "4.9/5", label: "Customer Rating" },
  { emoji: "🚚", num: "98%", label: "On-Time Delivery" },
];

export default function CoverageMap() {
  return (
    <>
      <MapRoot>
        <div className="visual">
          <div className="map">
            <span className="pin" style={{ top: "30%", left: "40%" }} />
            <span className="pin" style={{ top: "50%", left: "60%" }} />
            <span className="pin" style={{ top: "70%", left: "35%" }} />
            <svg viewBox="0 0 400 400" aria-hidden="true">
              <path
                d="M 150 50 Q 200 30 250 50 T 300 100 T 280 200 T 250 300 T 200 350 T 150 320 T 100 250 T 80 150 T 120 80 Z"
                fill="none"
                stroke="#fff"
                strokeWidth="2"
                opacity="0.3"
              />
            </svg>
          </div>
        </div>
        <div className="info">
          <h3>Delivering Across All 92 Indiana Counties</h3>
          <p>From our central Indiana warehouse, we provide fast, reliable delivery to every corner of the state.</p>
          <ul>
            {PERKS.map((p) => (
              <li key={p}>
                <span className="check">✓</span>
                {p}
              </li>
            ))}
          </ul>
        </div>
      </MapRoot>

      <StatsRoot>
        <div className="head">
          <h2>Trusted by Indiana Retailers</h2>
          <p>Join hundreds of convenience stores, smoke shops, and gas stations across Indiana who trust MB Wholesale.</p>
        </div>
        <div className="grid">
          {STATS.map((s) => (
            <div className="stat" key={s.label}>
              <span className="emoji">{s.emoji}</span>
              <span className="num">{s.num}</span>
              <span className="label">{s.label}</span>
            </div>
          ))}
        </div>
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
    height: 340px;
    border-radius: var(--radius-md);
    position: relative;
    overflow: hidden;
    background: linear-gradient(135deg, var(--accent-hover), var(--accent));

    svg {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
    }
  }

  .pin {
    position: absolute;
    width: 18px;
    height: 18px;
    background: #f59e0b;
    border-radius: 50%;
    border: 3px solid #fff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    animation: mapPulse 2s infinite;
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
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
    }
    li {
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
