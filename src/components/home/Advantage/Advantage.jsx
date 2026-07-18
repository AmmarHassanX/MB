import React from "react";
import styled from "styled-components";
import { RiMoneyDollarCircleLine, RiFlashlightLine, RiShieldCheckLine } from "react-icons/ri";

/*
  Advantage — recreated from the prototype video ("The MB Wholesale
  Advantage"): serif heading, supporting line, three cards with icon
  chips; the middle card is elevated with a green top border, exactly
  as in the reference. Fully tokenized for dark/light mode.
*/

const CARDS = [
  {
    icon: <RiMoneyDollarCircleLine />,
    title: "Competitive Pricing",
    body: "Direct relationships with manufacturers mean better margins for your business. Volume discounts on every order.",
  },
  {
    icon: <RiFlashlightLine />,
    title: "Fast Fulfillment",
    body: "Orders processed and shipped within 24 hours. We understand that empty shelves cost you money every minute.",
    featured: true,
  },
  {
    icon: <RiShieldCheckLine />,
    title: "Quality Guaranteed",
    body: "Every product is sourced from authorized distributors. No counterfeits, no compromises — ever.",
  },
];

export default function Advantage() {
  return (
    <Root>
      <div className="inner">
        <h2>The MB Wholesale Advantage</h2>
        <p className="lede">We&apos;re not just a supplier — we&apos;re your growth partner.</p>
        <div className="cards">
          {CARDS.map((c) => (
            <article className={`card${c.featured ? " featured" : ""}`} key={c.title}>
              <span className="chip">{c.icon}</span>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
            </article>
          ))}
        </div>
      </div>
    </Root>
  );
}

const Root = styled.section`
  background: var(--bg-elevated);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);

  .inner {
    max-width: var(--container-max);
    margin: 0 auto;
    padding: 4rem 1.5rem;
    text-align: center;
  }

  h2 {
    font-family: var(--font-display);
    font-size: clamp(1.9rem, 3.4vw, 2.6rem);
    font-weight: 600;
    color: var(--text);
    margin: 0;
  }

  .lede {
    color: var(--text-2);
    margin: 0.8rem 0 2.5rem;
  }

  .cards {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.25rem;
    text-align: left;

    @media screen and (max-width: 900px) {
      grid-template-columns: 1fr;
    }
  }

  .card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 1.75rem 1.5rem;
    transition: transform var(--dur-base) var(--ease-out),
      box-shadow var(--dur-base) ease, border-color var(--dur-fast) ease;

    &:hover {
      transform: translateY(-6px);
      box-shadow: var(--shadow-card);
      border-color: var(--accent);
    }

    &.featured {
      border-top: 3px solid var(--accent);
      box-shadow: var(--shadow-card);
    }

    .chip {
      display: inline-grid;
      place-items: center;
      width: 52px;
      height: 52px;
      border-radius: var(--radius-md);
      background: var(--accent-soft);
      color: var(--accent);
      font-size: 26px;
      margin-bottom: 1.1rem;
    }

    &.featured .chip {
      background: var(--accent);
      color: var(--accent-contrast);
    }

    h3 {
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--text);
      margin: 0 0 0.5rem;
    }

    p {
      color: var(--text-2);
      font-size: 0.95rem;
      line-height: 1.65;
      margin: 0;
    }
  }
`;
