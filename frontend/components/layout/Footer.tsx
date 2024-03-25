import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <section className={styles.links}>
          <a href="/acerca">Acerca de</a>
          <a href="/contacto">Contacto</a>
          <a href="/aviso-de-privacidad">Aviso de Privacidad</a>
        </section>
        <section className={styles.socials}>
          <a href="https://twitter.com/calendar-io">Twitter</a>
          <a href="https://facebook.com/calendar-io">Facebook</a>
          <a href="https://instagram.com/calendar-io">Instagram</a>
        </section>
      </div>
      <div className={styles.copyRight}>
        © {year} Compañia fake. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;
