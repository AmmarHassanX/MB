import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { FiHome, FiTruck, FiMapPin, FiMail } from "react-icons/fi";

/*
  NavigationBar — replaced the old ERP-category dropdown bar entirely
  per request: just four fixed destinations. "Find Store" scrolls to the
  #find-store section on the homepage; from any other page it navigates
  home first, then scrolls once the page mounts.
*/

const LINKS = [
  { href: "/", label: "Home", icon: <FiHome /> },
  { href: "/track-order", label: "Track Order", icon: <FiTruck /> },
  { href: "/#find-store", label: "Find Store", icon: <FiMapPin />, scrollTarget: "find-store" },
  { href: "/contact-us", label: "Contact Us", icon: <FiMail /> },
];

const NavigationBar = () => {
  const router = useRouter();

  const handleFindStore = (e) => {
    e.preventDefault();
    if (router.pathname === "/") {
      document.getElementById("find-store")?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      router.push("/#find-store");
    }
  };

  return (
    <Bar>
      <div className="inner">
        {LINKS.map((l) => (
          <Link href={l.href} key={l.label}>
            <a className="link" onClick={l.scrollTarget ? handleFindStore : undefined}>
              {l.icon}
              {l.label}
            </a>
          </Link>
        ))}
      </div>
    </Bar>
  );
};

export default NavigationBar;

const Bar = styled.nav`
  width: 100%;
  background: var(--bg-elevated);
  border-bottom: 1px solid var(--border);

  .inner {
    max-width: 640px;
    margin: 0 auto;
    padding: 0.6rem 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
  }

  .link {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.5rem 0.9rem;
    border-radius: var(--radius-sm);
    font-size: 0.85rem;
    font-weight: 500;
    color: var(--text-2);
    transition: color var(--dur-fast) ease, background var(--dur-fast) ease;

    svg {
      font-size: 0.9rem;
      opacity: 0.75;
    }

    &:hover {
      color: var(--accent);
      background: var(--accent-soft);
    }
  }
`;
