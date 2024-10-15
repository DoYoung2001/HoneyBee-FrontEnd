import React from "react";
import styles from "./Navbar.module.css"; // CSS Modules import

function NavBar() {
  return (
    <nav className={styles.navbarContainer}>
      <div className={styles.navbarLogo}>
        <a href="/">허니핑</a>
      </div>
      <ul className={styles.navbarMenu}>
        <li className={styles.navbarItem}>
          <a href="/">Home</a>
        </li>
        <li className={styles.navbarItem}>
          <a href="/about">About</a>
        </li>
        <li className={styles.navbarItem}>
          <a href="/services">Services</a>
        </li>
        <li className={styles.navbarItem}>
          <a href="/contact">Contact</a>
        </li>
      </ul>
      <div className={styles.buttonContainer}>
        <button className={styles.signButton}>
          <a href="/">sign in</a>
        </button>
        <button className={styles.register}>
          <a href="/">register</a>
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
