import styled, { keyframes } from "styled-components";

/*
  Header styles — Direction 2 redesign.
  Every color references a design token (styles/theme.scss), so the header
  automatically adapts to dark/light mode. Export names are unchanged so
  Header.jsx keeps working without logic edits.
*/

const slideDown = keyframes`
  from { transform: translateY(-100%); opacity: 0; }
  to   { transform: translateY(0);     opacity: 1; }
`;

export const HeaderSection = styled.div`
  width: 100%;
  padding: 0 1em;
  top: 0;
  z-index: 15;
  position: sticky;
  background: color-mix(in srgb, var(--bg) 82%, transparent);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--border);
  transition: box-shadow var(--dur-base) var(--ease-out), background var(--dur-base) ease;
  box-shadow: ${(props) => (props.scrolled ? "0 8px 24px rgba(0,0,0,0.18)" : "none")};
  background: ${(props) =>
    props.scrolled
      ? "color-mix(in srgb, var(--bg) 94%, transparent)"
      : "color-mix(in srgb, var(--bg) 82%, transparent)"};

  .header-container-inner {
    transition: padding var(--dur-base) var(--ease-out);
  }
`;

export const HeaderContainer = styled.div`
  width: 100%;
  max-width: var(--container-max);
  margin: auto;
  height: 100%;
  display: flex;
  flex-direction: row;
  position: relative;
  padding: ${(props) => (props.scrolled ? "0.45rem 0" : "0.75rem 0")};
  transition: padding var(--dur-base) var(--ease-out);
  justify-content: space-between;
  align-items: center;
  color: var(--text);
  @media screen and (max-width: 768px) {
    .side-space {
      width: 0;
      display: none;
    }
  }
`;

export const LogoContainer = styled.div`
  width: 157px;
  height: 62px;
  cursor: pointer;
  position: relative;
  transition: transform var(--dur-fast) var(--ease-out);
  &:hover {
    transform: scale(1.03);
  }
  @media screen and (max-width: 1400px) {
    margin: 0 auto;
  }
  @media screen and (max-width: 640px) {
    margin: 0 auto;
    height: 52px;
    width: 130px;
  }
`;

export const IconsContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  justify-self: flex-end;
  text-align: center;
  gap: 0.5rem;
  height: 3.875rem;
  .divider {
    background-color: var(--border);
    width: 1px;
    min-height: 100%;
    margin: 0 1em;
  }
  span {
    cursor: pointer;
  }
`;

export const IconWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: var(--radius-md);
  padding: 4px 6px;
  transition: background var(--dur-fast) ease;
  &:hover {
    background: ${(props) => (props.noHover ? "transparent" : "var(--surface-hover)")};
  }
  p {
    color: var(--text);
  }
  .rightSection {
    font-size: 15px;
    font-weight: 400;
    text-align: left;
    color: var(--text-2);
    margin-right: 6px;
    text-transform: ${(props) => (props.capitalize ? "capitalize" : "none")};
  }
`;

export const IconBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: ${(props) => (props.bg ? "var(--surface)" : "transparent")};
  border: 1px solid ${(props) => (props.bg ? "var(--border)" : "transparent")};
  transition: transform var(--dur-fast) var(--ease-out),
    border-color var(--dur-fast) ease, background var(--dur-fast) ease;
  &:hover {
    transform: translateY(-1px);
    border-color: var(--accent);
    background: var(--accent-soft);
  }
  svg {
    color: var(--accent) !important;
  }
`;

export const IconBoxes = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const Icon = styled.div`
  display: grid;
  place-items: center;
  color: var(--text-2);
  svg {
    font-size: 22px;
  }
`;

export const HeaderNav = styled.div`
  flex: 1;
  max-width: 654px;
  margin: 0 2rem;
`;

export const HeaderMobNav = styled.div`
  width: 100%;
  padding-bottom: 0.75rem;
`;

export const HeaderLink = styled.a`
  color: var(--text-2);
  font-size: 14px;
  transition: color var(--dur-fast) ease;
  &:hover {
    color: var(--accent);
  }
`;

export const SmIcons = styled.div`
  display: none;
  cursor: pointer;
  svg {
    font-size: 26px;
    color: var(--text);
  }
  @media screen and (max-width: 1400px) {
    display: grid;
    place-items: center;
  }
`;

export const CartDrawerStyled = styled.div`
  background: var(--surface);
  color: var(--text);
`;
