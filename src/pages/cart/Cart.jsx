import React from "react";

import CheckoutCarousel from "./CheckoutCarousel";
import styles from "./cart.module.css";
import CheckoutProducts from "./CheckoutProducts";
import SubTotal from "./SubTotal";

const Cart = () => {
  return (
    <section className={styles.cartBlock}>
      <article>
        <CheckoutCarousel />
        <h1>Shopping cart</h1>
        <div className={styles.cartContainer}>
          <CheckoutProducts />
          <SubTotal />
        </div>
      </article>
    </section>
  
  );
};

export default Cart;
