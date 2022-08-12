import React from "react";
import styles from "./error.module.css";

const Error = () => {
  return (
    <section className={styles.errBlock}>
      <article>
        <h1>Sorry No Data Found</h1>
        <img
          src="https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-1932.jpg?w=2000"
          alt=""
        />
      </article>
    </section>
  );
};

export default Error;
