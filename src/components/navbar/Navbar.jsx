import React from "react";
import Auth from "./Auth";
import Logo from "./Logo";
import Menu from "./Menu";
import styles from "./navbar.module.css";

const Navbar = () => {

  return (
    <section className={styles.navbar}>
      <article>
        <Logo />
        <Menu />
        <Auth />
      </article>
    </section>
  );
};

export default Navbar;
