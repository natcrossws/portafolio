import styles from "./Contact.module.css";

export default function Contact() {
  const year = new Date().getFullYear();
  return (
    <footer id="contacto" className={styles.section} aria-label="Contacto">
      <div className="container">
        <div className={styles.top}>
          <div>
            <span className={styles.eyebrow}>Contacto</span>
            <h2 className={styles.heading}>
              Hablemos de tu <em>próximo proyecto</em>
            </h2>
          </div>
          <div className={styles.links}>
            <a href="mailto:nataliemelo98@gmail.com">nataliemelo98@gmail.com</a>
            <a href="tel:+525569794364">+52 55 6979 4364</a>
            <span>Ciudad de México, México</span>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>© {year} Nataly Melo</span>
          <nav>
            <a href="#obra">obra</a>
            <a href="#sobre">sobre</a>
            <a href="#contacto">contacto</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
