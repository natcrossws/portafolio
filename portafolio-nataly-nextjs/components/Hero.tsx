import Image from "next/image";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero} aria-label="Portada">
      <div className={styles.frame}>
        <Image
          src="/images/nataly-hero.jpg"
          alt="Nataly Melo"
          fill
          priority
          sizes="880px"
          className={styles.photo}
        />

        <div className={styles.topBar}>
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

        <div className={styles.nameBlock}>
          <h1 className={styles.name}>
            Nataly
            <br />
            <em>Melo</em>
          </h1>
          <div className={styles.rule} />
          <p className={styles.role}>
            INGENIERA DE SOFTWARE
            <br />
            QUE HACE ARTE CON CÓDIGO
          </p>
        </div>

        <div className={styles.scrollHint}>scroll ↓</div>
      </div>
    </section>
  );
}
