import React from "react";
import style from "./cat.module.css";
import { Link } from "react-router-dom";
import "aos/dist/aos.css";
import AOS from "aos";

const Maincategory = () => {
  return (
    <div>
      <h1 className={style.h1Maincart}>TOP CATEGORIES TO CHOOSE FROM</h1>
      <div className={style.maincart}>
        <div data-aos="zoom-in" data-aos-offset="200">
          <Link to="/kids">
            <img
              src="https://images.unsplash.com/photo-1607453998774-d533f65dac99?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
              alt=""
            />
          </Link>
          <h4>KIDS</h4>
        </div>
        <div data-aos="zoom-in" data-aos-offset="200">
          <Link to="/men">
            <img
              src="https://images.unsplash.com/photo-1536766820879-059fec98ec0a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8bWVufGVufDB8fDB8YmxhY2t8&auto=format&fit=crop&w=500&q=60"
              alt=""
            />
          </Link>
          <h4>MEN</h4>
        </div>
        <div data-aos="zoom-in" data-aos-offset="200">
          <Link to="/women">
            <img
              src="https://images.unsplash.com/photo-1625795191138-8ffb8b9fd89e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8d29tZW4lMjBmYXNoaW9ufGVufDB8fDB8YmxhY2t8&auto=format&fit=crop&w=500&q=60"
              alt=""
            />
          </Link>

          <h4>WOMEN</h4>
        </div>
        <div data-aos="zoom-in" data-aos-offset="200">
          <Link to="/electronics">
            <img
              src="https://images.unsplash.com/photo-1542393545-10f5cde2c810?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Y29tcHV0ZXJ8ZW58MHx8MHxibGFja3w%3D&auto=format&fit=crop&w=500&q=60"
              alt=""
            />
          </Link>
          <h4>ELECTRONICS</h4>
        </div>
        <div data-aos="zoom-in" data-aos-offset="200">
          <Link to="/beauty_products">
            <img
              src="https://images.unsplash.com/photo-1501728636520-11c972bd5e2e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjh8fGNvc21ldGljc3xlbnwwfHwwfGJsYWNrfA%3D%3D&auto=format&fit=crop&w=500&q=60"
              alt=""
            />
          </Link>
          <h4>BEAUTY PRODUCTS</h4>
        </div>
      </div>
    </div>
  );
};

export default Maincategory;
