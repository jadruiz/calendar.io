import React from "react";
import Link from "next/link";
import styles from "./Header.module.css";
const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <img src="/logo.png" alt="Logo" />
        </Link>
      </div>
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link href="/">Inicio</Link>
          </li>
          <li>
            <Link href="/calendar">Calendarios</Link>
          </li>
          <li>
            <Link href="/salir">Salir</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
