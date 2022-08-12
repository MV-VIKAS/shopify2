
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import welcomeStyle from "./welcome.module.css";
import { useSelector } from "react-redux";

function Welcome() {
  const currentUser = useSelector(state => state.user.currentUser);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser.email && pathname == "/") {
      navigate("/Home");
    }
    if (!currentUser.email) {
      if (!pathname == "/signup") navigate("/");
    }
  }, [pathname]);

  return (
    <section>
      {/* <Navbar /> */}
      <article className={welcomeStyle.welcomesection}>
        <div className={welcomeStyle.mainHead}>
          <div className={welcomeStyle.headings1}>
            <h5>Shop With Us</h5>
            <h1>NEW ARRIVALS</h1>
          </div>
          <img
            src="https://cdn.pixabay.com/photo/2019/09/22/08/15/woman-4495395_960_720.png"
            alt=""
            width="40%"
          />
        </div>
      </article>
      <div className={welcomeStyle.divbg}>
        <h1>New Collections Here</h1>
      </div>
    </section>
  );
}

export default Welcome;
