import React from "react";
import { Link } from "react-router-dom";
import styles from "./navbar.module.css";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

const Logo = () => {
  return (
    <div className={styles.logoBlock}>
      <Link to="/Home">
        <h1>ShoppingKart</h1>
        <LocalOfferIcon />
      </Link>
    </div>
  );
};

export default Logo;
