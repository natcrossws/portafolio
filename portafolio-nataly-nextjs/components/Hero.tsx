import Image from "next/image";
import Header from "@/components/Header";
import styles from "./Hero.module.css";

const TITLES = [
  "Creative Developer",
  "Software Development Lead",
  "Frontend",
  "UX/UI",
  "Design Systems",
  "Art History Student",
  "Computer Systems Engineer",
];

export default function Hero() {
  const ticker = [...TITLES, ...TITLES];

  return (
    <section className={styles.hero} aria-label="Portada">
      <div className={styles.frame}>
        <div className={styles.photoWrap}>
          <Image
            src="/images/nataly-hero-studio.jpg"
            alt="Nataly Melo"
            fill
            priority
            quality={95}
            sizes="(max-width: 720px) 90vw, 50vw"
            className={styles.photo}
          />
        </div>

        <Header />

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

        <div className={styles.marquee} aria-hidden="true">
          <div className={styles.marqueeTrack}>
            {ticker.map((title, i) => (
              <span key={`${title}-${i}`} className={styles.marqueeItem}>
                {title}
                <span className={styles.marqueeSep}>·</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
