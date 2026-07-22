import React, { useState } from "react";
import Head from "next/head";
import styled from "styled-components";
import { FiMapPin, FiPhone, FiMail } from "react-icons/fi";
import Reveal from "../src/components/motion/Reveal";

/*
  /contact-us — dedicated Contact Sales page.
  NOTE for Ammar: there is no SalesAgent (or other) endpoint in this codebase
  to receive form submissions yet, so this form composes a pre-filled email
  via `mailto:` when submitted — it genuinely opens the visitor's email
  client with everything filled in, rather than silently doing nothing.
  Swapping to a real backend later just means replacing handleSubmit.
*/

const SALES_EMAIL = "sales@mbwholesalellc.com";

export default function ContactUs() {
  const [form, setForm] = useState({ name: "", business: "", email: "", phone: "", message: "" });

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Wholesale inquiry from ${form.business || form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nBusiness: ${form.business}\nEmail: ${form.email}\nPhone: ${form.phone}\n\n${form.message}`
    );
    window.location.href = `mailto:${SALES_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <>
      <Head>
        <title>Contact Sales | MB Wholesale</title>
      </Head>
      <Root>
        <Reveal>
          <div className="head">
            <h1>Contact Our Sales Team</h1>
            <p>Ready to become a partner? Tell us about your business and we&apos;ll get back to you within 24 hours.</p>
          </div>
        </Reveal>

        <Reveal>
          <form onSubmit={handleSubmit} className="form">
            <div className="grid">
              <label>
                Full Name *
                <input required value={form.name} onChange={update("name")} placeholder="John Doe" />
              </label>
              <label>
                Business Name *
                <input required value={form.business} onChange={update("business")} placeholder="Your Store Name" />
              </label>
              <label>
                Email Address *
                <input required type="email" value={form.email} onChange={update("email")} placeholder="john@yourstore.com" />
              </label>
              <label>
                Phone Number *
                <input required type="tel" value={form.phone} onChange={update("phone")} placeholder="(317) 555-0123" />
              </label>
            </div>
            <label className="full">
              Message
              <textarea
                value={form.message}
                onChange={update("message")}
                rows={5}
                placeholder="Tell us about your business and what you're looking for..."
              />
            </label>
            <button type="submit">Submit Inquiry</button>
          </form>
        </Reveal>

        <Reveal>
          <div className="info">
            <div className="item">
              <FiMapPin />
              <div>
                <strong>Visit Our Warehouse</strong>
                <span>4935 W 38th St, Indianapolis, IN 46254</span>
              </div>
            </div>
            <div className="item">
              <FiPhone />
              <div>
                <strong>Call Us</strong>
                <span>(317) 803-9060</span>
              </div>
            </div>
            <div className="item">
              <FiMail />
              <div>
                <strong>Email Us</strong>
                <span>{SALES_EMAIL}</span>
              </div>
            </div>
          </div>
        </Reveal>
      </Root>
    </>
  );
}

const Root = styled.main`
  max-width: 900px;
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

  .form {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 2.5rem;
    box-shadow: var(--shadow-card);

    .grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.25rem;
      margin-bottom: 1.25rem;
      @media screen and (max-width: 600px) {
        grid-template-columns: 1fr;
      }
    }

    label {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
      font-size: 0.8rem;
      font-weight: 600;
      color: var(--text);
      margin-bottom: 1.25rem;

      &.full {
        display: flex;
      }
    }

    input,
    textarea {
      font-family: inherit;
      font-size: 0.95rem;
      padding: 0.8rem 1rem;
      border-radius: var(--radius-sm);
      border: 1px solid var(--border);
      background: var(--bg);
      color: var(--text);
      transition: border-color var(--dur-fast) ease;

      &:focus {
        outline: none;
        border-color: var(--accent);
      }
    }

    textarea {
      resize: vertical;
      min-height: 120px;
    }

    button {
      width: 100%;
      padding: 0.9rem;
      border: none;
      border-radius: 999px;
      background: var(--accent);
      color: var(--accent-contrast);
      font-size: 0.95rem;
      font-weight: 600;
      cursor: pointer;
      transition: transform var(--dur-fast) var(--ease-out);
      &:hover {
        transform: translateY(-2px);
      }
    }
  }

  .info {
    margin-top: 3rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;
    @media screen and (max-width: 700px) {
      grid-template-columns: 1fr;
    }

    .item {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      background: var(--bg-elevated);
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      padding: 1.25rem;

      svg {
        font-size: 1.25rem;
        color: var(--accent);
        margin-top: 0.15rem;
      }

      strong {
        display: block;
        color: var(--text);
        font-size: 0.9rem;
        margin-bottom: 0.2rem;
      }
      span {
        color: var(--text-2);
        font-size: 0.85rem;
      }
    }
  }
`;
