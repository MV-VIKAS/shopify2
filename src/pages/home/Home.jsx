// import React from "react";

import CarouselComp from "../../components/Carousel/CarouselComp";
import FeaturedProducts from "../../components/featured products/FeaturedProducts";
import Maincategory from "../../components/categories/Maincategory";
import ChatBot from "../../components/chatBot/ChatBot";
import SubNavbar from "../../components/subnavbar/SubNavbar";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Home = () => {
  return (
    <section className="homeBlock">
      <SubNavbar />
      <article>
        <ChatBot />
        <CarouselComp />
        <Maincategory />
        <FeaturedProducts />
      </article>
    </section>
  );
};

export default Home;
