import styled from "styled-components";
export const SearchContainer = styled.div`
  width: 100%;
  max-width: 100%;
  display: grid;
  place-items: center;
  position: relative;
  height: 54px;
  // margin: 0 1rem;
  padding: 0 0.5rem;
  @media screen and (max-width: 1200px) {
    // padding: 2em 0;
  }
`;
export const SearchBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.65rem;
  width: 100%;
  height: 48px;
  padding: 0 1.25rem;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--surface);
  transition: border-color var(--dur-fast) ease, box-shadow var(--dur-fast) ease;

  &:focus-within {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px var(--accent-soft);
  }

  input {
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    font-family: inherit;
    font-size: 0.9rem;
    color: var(--text);

    &::placeholder {
      color: var(--text-3);
    }
  }
`;
