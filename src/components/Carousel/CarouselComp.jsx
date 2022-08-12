import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from "./carousel.module.css";

const CarouselComp = () => {
  return (
    <div className={styles.carouselContainer}>
      <Carousel
        showThumbs={false}
        autoPlay={true}
        infiniteLoop={true}
        showStatus={false}
        showArrows={false}
        useKeyboardArrows={true}
      >
        <div>
          <img
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1099&q=80"
            alt="watch"
          />
        </div>
        <div>
          <img
            src="https://images.unsplash.com/photo-1526947425960-945c6e72858f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt="watch"
          />
        </div>
        <div>
          <img
            src="https://images.unsplash.com/photo-1627384113972-f4c0392fe5aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt="watch"
          />
        </div>
        <div>
          <img
            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt="headphones"
          />
        </div>
        <div>
          <img
            src="https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt="watch"
          />
        </div>
        <div>
          <img
            src="https://images.unsplash.com/photo-1641390323814-b6720f65dee9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
            alt="watch"
          />
        </div>
        <div>
          <img
            src="https://images.unsplash.com/photo-1520256862855-398228c41684?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80"
            alt="watch"
          />
        </div>
      </Carousel>
    </div>
  );
};

export default CarouselComp;
