import React, { useEffect, useState } from "react";
import Menu from "./Menu";
import styles from "./menu.module.css";
import {useLocation} from "react-router-dom"

const SubNavbar = () => {
  let { pathname } = useLocation()
  
    return (
      <>
        {pathname != "/signup" && pathname != "/my-profile" && (
          <div className={styles.catMenu}>
            <Menu />
          </div>
        )}
      </>
    );
};

export default SubNavbar;
