import styles from "./About.module.css";

const SKILLS = [
  "JavaScript / React",
  "Node.js / Express",
  "p5.js",
  "Three.js",
  "GSAP",
  "Figma",
  "Design Systems",
  "PostgreSQL",
];

export default function About() {
  return (
    <section id="sobre" className={styles.section} aria-label="Sobre mí">
      <div className="container">
        <div className={styles.grid}>
          <div>
            <span className={styles.eyebrow}>Sobre mí</span>
            <h2 className="section-heading">
              Software engineer <em>→</em> creative technologist
            </h2>
            <p className={styles.lead}>
              Ingeniera en Sistemas Computacionales con experiencia en desarrollo de
              aplicaciones web de alcance nacional y liderazgo técnico de equipos. Mi
              perfil combina ingeniería de software y trabajo creativo: construyo
              productos digitales escalables y mantenibles, cuido el detalle visual y
              la experiencia de usuario, y traduzco necesidades de negocio en
              decisiones técnicas y de diseño.
            </p>

            <div className={styles.statRow}>
              <div>
                <p className={styles.statNumber}>5+</p>
                <span className={styles.statLabel}>años de experiencia</span>
              </div>
              <div>
                <p className={styles.statNumber}>7+</p>
                <span className={styles.statLabel}>proyectos institucionales</span>
              </div>
              <div>
                <p className={styles.statNumber}>3</p>
                <span className={styles.statLabel}>publicaciones</span>
              </div>
            </div>
          </div>

          <div>
            <span className={styles.eyebrow}>Educación</span>
            <div className={styles.eduList}>
              <div className={styles.eduItem}>
                <p className={styles.eduSchool}>Universidad Internacional de La Rioja (UNIR)</p>
                <p className={styles.eduDegree}>Grado en Historia del Arte</p>
                <p className={styles.eduMeta}>España · En curso</p>
              </div>
              <div className={styles.eduItem}>
                <p className={styles.eduSchool}>Universidad de Ciencias y Administración (UCAD)</p>
                <p className={styles.eduDegree}>Ingeniería en Sistemas Computacionales</p>
                <p className={styles.eduMeta}>Ciudad de México · 2021 – 2024</p>
              </div>
            </div>

            <span className={styles.eyebrow} style={{ marginTop: 28, display: "block" }}>
              Herramientas
            </span>
            <div className={styles.skills}>
              {SKILLS.map((skill) => (
                <span key={skill} className={styles.skill}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
