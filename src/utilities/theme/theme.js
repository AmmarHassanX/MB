const theme = {
  palette: {
    colors: {
      black: "var(--text)",
      white: "#ffffff",
      primary: "var(--accent)",
      secondary: "var(--text-2)",
      light: "var(--border)",
      other: "var(--text-2)",
    },
    bg: {
      white: "var(--surface)",
      black: "var(--bg-elevated)",
      primary: "var(--accent)",
      secondary: "var(--surface-2)",
      header: "var(--bg-elevated)",
      footer: "var(--bg-elevated)",
    },
  },
  typography: {
    h1: { fontSize: "2.5rem", fontWeight: "900" },
    h2: { fontSize: "1.9rem", fontWeight: "700" },
    body: { fontSize: "1.375rem", fontWeight: "300" },
  },
  maxWidth: { home: "1400px" },
};

export default theme;
