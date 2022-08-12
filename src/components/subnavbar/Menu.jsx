import React from "react";
import MenMenu from "./MenMenu";
import Style from "./menu.module.css";
import WomenMenu from "./WomenMenu";
import KidsMenu from "./KidsMenu";
import Electronic from "./Electronic";
import Beauty from "./Beauty";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <div className={Style.menuBlock}>
      <nav>
        <ul>
          <li>
            <Link to="/men">Men</Link>
            <motion.div
              className={Style.dropDown}
              inital={{ y: "50%", opacity: 0, scale: 0.5 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <MenMenu />
            </motion.div>
          </li>

          <li>
            <Link to="/women">Women</Link>
            <div className={Style.dropDown}>
              <WomenMenu />
            </div>
          </li>

          <li>
            <Link to="/kids">Kids</Link>
            <div className={Style.dropDown}>
              <KidsMenu />
            </div>
          </li>
          <li>
            <Link to="/electronics">Electronic</Link>
            <div className={Style.dropDown}>
              <Electronic />
            </div>
          </li>

          <li>
            <Link to="beauty_products">Beauty</Link>
            <div className={Style.dropDown}>
              <Beauty />
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Menu;
