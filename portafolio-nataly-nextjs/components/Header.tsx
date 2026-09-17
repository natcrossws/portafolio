import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.status}>
          <span className={styles.dot} />
          <span className={styles.statusText}>DISPONIBLE 2026</span>
        </div>
        <nav className={styles.nav} aria-label="Navegación principal">
          <a href="#obra">obra</a>
          <span className={styles.navDivider}>·</span>
          <a href="#sobre">sobre</a>
          <span className={styles.navDivider}>·</span>
          <a href="#contacto">contacto</a>
        </nav>
      </div>
    </header>
  );
}
