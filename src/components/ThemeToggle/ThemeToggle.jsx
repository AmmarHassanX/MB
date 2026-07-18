import React from "react";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import styled from "styled-components";
import { useTheme } from "../../utilities/theme/ThemeContext";

/*
  ThemeToggle — round button that flips dark/light mode.
  Uses the design tokens, so it restyles itself in both modes automatically.
  The icon swap is animated with a small rotate+fade for the "smooth motion"
  feel requested in the redesign.
*/

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text);
  cursor: pointer;
  transition: transform var(--dur-fast) var(--ease-out),
    border-color var(--dur-fast) ease, background var(--dur-fast) ease;

  &:hover {
    transform: translateY(-1px);
    border-color: var(--border-strong);
    background: var(--surface-hover);
  }

  &:active {
    transform: scale(0.94);
  }

  svg {
    font-size: 19px;
    animation: mbwSpinIn var(--dur-base) var(--ease-out);
  }

  @keyframes mbwSpinIn {
    from {
      opacity: 0;
      transform: rotate(-90deg) scale(0.6);
    }
    to {
      opacity: 1;
      transform: rotate(0deg) scale(1);
    }
  }
`;

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
    >
      {isDark ? <MdOutlineLightMode key="sun" /> : <MdOutlineDarkMode key="moon" />}
    </Button>
  );
}
