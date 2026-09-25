import styles from "./Header.module.css";

export default function Header() {
  return (
    <nav className={styles.nav} aria-label="Navegación principal">
      <a href="#obra">obra</a>
      <span className={styles.navDivider}>·</span>
      <a href="#sobre">sobre</a>
      <span className={styles.navDivider}>·</span>
      <a href="#contacto">contacto</a>
    </nav>
  );
}
