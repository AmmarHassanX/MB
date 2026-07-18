import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

/*
  ThemeContext — makes the current theme ("dark" | "light") available to
  every component, plus a toggleTheme() function.

  How it works:
  1. An inline script in _document.js sets data-theme on <html> BEFORE first
     paint (prevents the "wrong theme flash"). That script is the source of
     truth on initial load.
  2. This provider reads that attribute once mounted, keeps React state in
     sync, and persists changes to localStorage under "mbw-theme".
  3. toggleTheme() briefly adds a .theme-transition class so the recolor
     animates smoothly (see styles/theme.scss).
*/

const ThemeContext = createContext({ theme: "dark", toggleTheme: () => {} });

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark");

  // On mount, adopt whatever the pre-paint script decided.
  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    if (current === "light" || current === "dark") setTheme(current);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      const root = document.documentElement;

      // Enable smooth color transition just for the swap
      root.classList.add("theme-transition");
      root.setAttribute("data-theme", next);
      window.setTimeout(() => root.classList.remove("theme-transition"), 350);

      try {
        localStorage.setItem("mbw-theme", next);
      } catch (e) {
        /* private browsing may block storage — theme still works for the session */
      }
      return next;
    });
  }, []);

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}
