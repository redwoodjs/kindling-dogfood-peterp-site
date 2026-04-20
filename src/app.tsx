export function App() {
  return (
    <main style={styles.shell}>
      <section style={styles.card}>
        <p style={styles.kicker}>RedwoodSDK migration scaffold</p>
        <h1 style={styles.title}>App shell is ready.</h1>
        <p style={styles.body}>
          This workspace now has a modern runtime entrypoint and package manager setup for
          the RedwoodSDK migration. The existing static content remains untouched for now.
        </p>
      </section>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  shell: {
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
    margin: 0,
    background: "linear-gradient(135deg, #0f172a 0%, #111827 55%, #1f2937 100%)",
    color: "#f9fafb",
    fontFamily: "Inter, system-ui, sans-serif",
    padding: "2rem",
  },
  card: {
    width: "min(720px, 100%)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "24px",
    padding: "clamp(2rem, 6vw, 4rem)",
    background: "rgba(15, 23, 42, 0.72)",
    boxShadow: "0 24px 80px rgba(15, 23, 42, 0.45)",
    backdropFilter: "blur(18px)",
  },
  kicker: {
    margin: 0,
    textTransform: "uppercase",
    letterSpacing: "0.18em",
    fontSize: "0.75rem",
    color: "#93c5fd",
  },
  title: {
    margin: "0.75rem 0 0",
    fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
    lineHeight: 1,
  },
  body: {
    margin: "1.25rem 0 0",
    maxWidth: "60ch",
    fontSize: "1.05rem",
    lineHeight: 1.7,
    color: "#d1d5db",
  },
};
