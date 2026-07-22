import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";
import { FiSearch, FiPhone, FiMail } from "react-icons/fi";
import Reveal from "../src/components/motion/Reveal";

/*
  /track-order — dedicated order tracking page.
  NOTE for Ammar: SalesAgent doesn't currently expose an order-status
  endpoint in this codebase, so this page can't look up real shipments yet.
  Rather than fake a result, it takes the tracking number and gives the
  visitor a clear, honest next step (call/email) — and the lookup box is
  already wired to swap in a real API call the moment one exists.
*/

export default function TrackOrder() {
  const [orderNumber, setOrderNumber] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (orderNumber.trim()) setSubmitted(true);
  };

  return (
    <>
      <Head>
        <title>Track Order | MB Wholesale</title>
      </Head>
      <Root>
        <Reveal>
          <div className="head">
            <h1>Track Your Order</h1>
            <p>Enter your order number and we&apos;ll help you locate its status.</p>
          </div>
        </Reveal>

        <Reveal>
          <form onSubmit={handleSubmit} className="lookup">
            <FiSearch />
            <input
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              placeholder="Enter order number (e.g. MB-2026-001234)"
            />
            <button type="submit">Track Order</button>
          </form>
        </Reveal>

        {submitted && (
          <Reveal>
            <div className="result">
              <p>
                Thanks — we&apos;ve noted order <strong>{orderNumber}</strong>. Live tracking isn&apos;t connected on
                the website yet, so for the fastest status update, reach our team directly:
              </p>
              <div className="contacts">
                <a href="tel:+13178039060">
                  <FiPhone /> (317) 803-9060
                </a>
                <a href="mailto:sales@mbwholesalellc.com">
                  <FiMail /> sales@mbwholesalellc.com
                </a>
              </div>
              <p className="or">
                Or reach out through our <Link href="/contact-us"><a>Contact Sales</a></Link> page.
              </p>
            </div>
          </Reveal>
        )}
      </Root>
    </>
  );
}

const Root = styled.main`
  max-width: 700px;
  margin: 0 auto;
  padding: 5rem 1.5rem 6rem;

  .head {
    text-align: center;
    margin-bottom: 2.5rem;
    h1 {
      font-family: var(--font-display);
      font-size: clamp(2rem, 4vw, 2.8rem);
      color: var(--text);
      margin: 0 0 0.75rem;
    }
    p {
      color: var(--text-2);
    }
  }

  .lookup {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 999px;
    padding: 0.5rem 0.5rem 0.5rem 1.25rem;
    box-shadow: var(--shadow-card);

    svg {
      color: var(--text-3);
      flex-shrink: 0;
    }

    input {
      flex: 1;
      border: none;
      outline: none;
      background: transparent;
      font-family: inherit;
      font-size: 0.95rem;
      color: var(--text);
      &::placeholder {
        color: var(--text-3);
      }
    }

    button {
      border: none;
      border-radius: 999px;
      background: var(--accent);
      color: var(--accent-contrast);
      padding: 0.75rem 1.5rem;
      font-size: 0.9rem;
      font-weight: 600;
      cursor: pointer;
      transition: transform var(--dur-fast) var(--ease-out);
      &:hover {
        transform: translateY(-2px);
      }
    }

    @media screen and (max-width: 500px) {
      flex-wrap: wrap;
      border-radius: var(--radius-lg);
      button {
        width: 100%;
      }
    }
  }

  .result {
    margin-top: 2rem;
    background: var(--bg-elevated);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 2rem;

    p {
      color: var(--text-2);
      margin: 0 0 1.25rem;
      strong {
        color: var(--text);
      }
    }

    .contacts {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
      margin-bottom: 1.25rem;

      a {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        background: var(--surface);
        border: 1px solid var(--border);
        border-radius: var(--radius-md);
        padding: 0.75rem 1.25rem;
        color: var(--text);
        font-weight: 600;
        transition: border-color var(--dur-fast) ease;
        &:hover {
          border-color: var(--accent);
        }
        svg {
          color: var(--accent);
        }
      }
    }

    .or {
      margin: 0;
      a {
        color: var(--accent);
        font-weight: 600;
      }
    }
  }
`;
