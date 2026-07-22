import React from "react";
import styled from "styled-components";
import { FiMapPin, FiPhone, FiMail, FiClock } from "react-icons/fi";

/*
  FindStoreAndContact — two homepage sections built from a real address.
  The map uses Google's no-API-key "maps/embed" URL — it just needs a
  place query, so it always resolves to the live location and never goes
  stale the way a hand-plotted pin would.
*/

const ADDRESS = "4935 W 38th St, Indianapolis, IN 46254";
const MAPS_EMBED_SRC = `https://www.google.com/maps?q=${encodeURIComponent(ADDRESS)}&output=embed`;
const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`;

export function FindStore() {
  return (
    <Root id="find-store">
      <div className="panel">
        <span className="eyebrow">Visit Us</span>
        <h2>Find Our Warehouse</h2>
        <p className="addr">
          <FiMapPin /> {ADDRESS}
        </p>
        <p className="hours">
          <FiClock /> Mon–Fri, 8:00 AM – 6:00 PM EST
        </p>
        <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer" className="cta">
          Get Directions
        </a>
      </div>
      <div className="map-embed">
        <iframe
          title="MB Wholesale location on Google Maps"
          src={MAPS_EMBED_SRC}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </Root>
  );
}

export function ContactSection() {
  return (
    <ContactRoot>
      <h2>Have Questions?</h2>
      <p>Our sales team responds within 24 hours — reach out however's easiest.</p>
      <div className="cards">
        <div className="card">
          <FiPhone />
          <span className="label">Call Us</span>
          <span className="value">(317) 803-9060</span>
        </div>
        <div className="card">
          <FiMail />
          <span className="label">Email Us</span>
          <span className="value">sales@mbwholesalellc.com</span>
        </div>
        <a href="/contact-us" className="card link">
          <FiMapPin />
          <span className="label">Contact Sales</span>
          <span className="value">Fill out our form →</span>
        </a>
      </div>
    </ContactRoot>
  );
}

const Root = styled.section`
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 4.5rem 1.5rem;
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 3rem;
  align-items: center;

  @media screen and (max-width: 900px) {
    grid-template-columns: 1fr;
  }

  .panel {
    .eyebrow {
      font-size: 0.75rem;
      letter-spacing: 0.12em;
      color: var(--text-3);
    }
    h2 {
      font-family: var(--font-display);
      font-size: clamp(1.8rem, 3.2vw, 2.4rem);
      color: var(--text);
      margin: 0.5rem 0 1.25rem;
    }
    .addr,
    .hours {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      color: var(--text-2);
      margin: 0 0 0.75rem;
    }
    .cta {
      display: inline-block;
      margin-top: 1rem;
      background: var(--accent);
      color: var(--accent-contrast);
      border-radius: 999px;
      padding: 0.75rem 1.6rem;
      font-size: 0.9rem;
      font-weight: 500;
      transition: transform var(--dur-fast) var(--ease-out);
      &:hover {
        transform: translateY(-2px);
      }
    }
  }

  .map-embed {
    border-radius: var(--radius-lg);
    overflow: hidden;
    border: 1px solid var(--border);
    box-shadow: var(--shadow-card);
    iframe {
      width: 100%;
      height: 340px;
      border: 0;
      display: block;
      filter: grayscale(0.15);
    }
  }
`;

const ContactRoot = styled.section`
  background: var(--bg-elevated);
  border-top: 1px solid var(--border);
  padding: 4.5rem 1.5rem;
  text-align: center;

  h2 {
    font-family: var(--font-display);
    font-size: clamp(1.8rem, 3.2vw, 2.4rem);
    color: var(--text);
    margin: 0 0 0.6rem;
  }
  p {
    color: var(--text-2);
    max-width: 480px;
    margin: 0 auto 2.5rem;
  }

  .cards {
    max-width: var(--container-max);
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;

    @media screen and (max-width: 700px) {
      grid-template-columns: 1fr;
    }
  }

  .card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    padding: 1.75rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    color: var(--text);
    transition: transform var(--dur-fast) var(--ease-out), border-color var(--dur-fast) ease;

    svg {
      font-size: 1.5rem;
      color: var(--accent);
    }
    .label {
      font-size: 0.8rem;
      color: var(--text-3);
    }
    .value {
      font-weight: 600;
    }

    &.link:hover {
      transform: translateY(-4px);
      border-color: var(--accent);
    }
  }
`;
