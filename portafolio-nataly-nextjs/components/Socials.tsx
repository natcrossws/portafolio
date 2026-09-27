import styles from "./Socials.module.css";

const LINKS = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="12" cy="12" r="4.1" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M7.2 9.2H4.6V19h2.6V9.2zm.2-3.1a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM19.4 12.6c0-2.5-1.3-4.1-3.4-4.1-1.1 0-1.9.5-2.3 1.2V9.2h-2.6c0 .4 0 9.8 0 9.8h2.6v-5.5c0-.3 0-.6.1-.8.3-.6.9-1.2 1.9-1.2 1.3 0 1.9 1 1.9 2.5V19h2.6v-6.4z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    name: "GitHub",
    href: "https://github.com/",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M12 3.2c-4.9 0-8.8 4-8.8 8.8 0 3.9 2.5 7.2 6 8.3.4.1.6-.2.6-.4v-1.5c-2.4.5-2.9-1-2.9-1-.4-1-1-1.3-1-1.3-.8-.6.1-.6.1-.6.9.1 1.4.9 1.4.9.8 1.4 2.1 1 2.6.8.1-.6.3-1 .6-1.2-2-.2-4.1-1-4.1-4.5 0-1 .4-1.8 1-2.5-.1-.2-.4-1.2.1-2.5 0 0 .8-.3 2.6 1a9 9 0 0 1 4.7 0c1.8-1.3 2.6-1 2.6-1 .5 1.3.2 2.3.1 2.5.6.7 1 1.5 1 2.5 0 3.5-2.1 4.3-4.1 4.5.3.3.6.8.6 1.6v2.4c0 .2.2.5.6.4 3.5-1.1 6-4.4 6-8.3 0-4.8-3.9-8.8-8.8-8.8z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    name: "Email",
    href: "mailto:nataliemelo98@gmail.com",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3.5" y="5.5" width="17" height="13" rx="2.2" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <path d="M4.2 7.2 12 12.4l7.8-5.2" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function Socials() {
  const year = new Date().getFullYear();

  return (
    <footer id="contacto" className={styles.section} aria-label="Redes">
      <nav className={styles.row} aria-label="Redes sociales">
        {LINKS.map((link) => (
          <a
            key={link.name}
            className={styles.icon}
            href={link.href}
            target={link.href.startsWith("mailto:") ? undefined : "_blank"}
            rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
            aria-label={link.name}
          >
            <span className={styles.orb}>{link.icon}</span>
            <span className={styles.label}>{link.name}</span>
          </a>
        ))}
      </nav>
      <p className={styles.copy}>© {year} Nataly Melo. Todos los derechos reservados.</p>
    </footer>
  );
}
