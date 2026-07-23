import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { PiCigarette, PiCigaretteBold } from "react-icons/pi";
import { GiGasPump } from "react-icons/gi";
import { RevealStagger, RevealItem } from "../../motion/Reveal";
import CountUp from "../../motion/CountUp";
import { MdOutlineLocalDrink } from "react-icons/md";

/*
  CategoryShowcase — recreated from the reference spec's "Shop by Category":
  4 cards, each with a gradient background, floating icon chip top-left,
  title + count bottom-left, and a circular arrow that rotates -45deg and
  turns green on hover. Colors use tokens so both gradients and the arrow
  swap correctly between themes.
*/

const CATS = [
  { key: "vapes", title: "Vapes & Disposables", count: 640, icon: <PiCigaretteBold />, grad: "linear-gradient(135deg, #1a3d2e 0%, #2d6b4f 100%)" },
  { key: "cigars", title: "Premium Cigars", count: 380, icon: <PiCigarette />, grad: "linear-gradient(135deg, #2a1810 0%, #5c3a24 100%)" },
  { key: "drinks", title: "Beverages & Drinks", count: 920, icon: <MdOutlineLocalDrink />, grad: "linear-gradient(135deg, #0d2b4a 0%, #1e5285 100%)" },
  { key: "gas", title: "Gas Station Supplies", count: 460, icon: <GiGasPump />, grad: "linear-gradient(135deg, #3d2e0d 0%, #7a5c1a 100%)" },
];

export default function CategoryShowcase() {
  return (
    <Root>
      <div className="head">
        <h2>Shop by Category</h2>
        <p>Explore our core product lines — each stocked with top-tier brands and competitive wholesale pricing.</p>
      </div>
      <RevealStagger className="grid">
        {CATS.map((c) => (
          <RevealItem key={c.key}>
            <Link href={`/product-list/${c.key}`}>
              <a className="card" style={{ "--grad": c.grad }}>
                <span className="icon">{c.icon}</span>
                <span className="body">
                  <span className="title">{c.title}</span>
                  <span className="count"><CountUp value={c.count} suffix="+ products" /></span>
                  <span className="arrow">→</span>
                </span>
              </a>
            </Link>
          </RevealItem>
        ))}
      </RevealStagger>
    </Root>
  );
}

const Root = styled.section`
  background: var(--surface);
  padding: 4.5rem 1.5rem;
  max-width: var(--container-max);
  margin: 0 auto;

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

    @media screen and (max-width: 900px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media screen and (max-width: 520px) {
      grid-template-columns: 1fr;
    }
  }

  .card {
    position: relative;
    display: block;
    aspect-ratio: 4 / 5;
    border-radius: var(--radius-lg);
    overflow: hidden;
    background: var(--grad);
    transition: transform var(--dur-base) var(--ease-out);

    &:hover {
      transform: translateY(-6px);
    }

    .icon {
      position: absolute;
      top: 1.25rem;
      left: 1.25rem;
      width: 52px;
      height: 52px;
      display: grid;
      place-items: center;
      border-radius: var(--radius-md);
      background: rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: #fff;
      font-size: 24px;
    }

    .body {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 1.5rem;
      color: #fff;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

    .title {
      font-size: 1.3rem;
      font-weight: 700;
      letter-spacing: -0.01em;
    }

    .count {
      font-size: 0.8rem;
      opacity: 0.8;
      margin: 0.3rem 0 1rem;
    }

    .arrow {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: #fff;
      color: var(--text);
      display: grid;
      place-items: center;
      transition: all var(--dur-fast) var(--ease-out);
    }

    &:hover .arrow {
      background: var(--accent);
      color: var(--accent-contrast);
      transform: rotate(-45deg);
    }
  }
`;
