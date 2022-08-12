import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from "./cart.module.css";

const CheckoutCarousel = () => {
  return (
    <div className={styles.checkoutCarousel}>
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
            src="https://images-eu.ssl-images-amazon.com/images/G/31/img22/laptop/intelevo/commingsoon/P66176019_IN_PC_Laptops-intel_evodays_GW_BAU__19-21_june_1242x450._CB634956587_.jpg"
            alt="watch"
          />
        </div>
        <div>
          <img
            src="https://images-eu.ssl-images-amazon.com/images/G/31/img22/Gateway/CEPC/Hero/Pendrives/D47074703_IN_PC-BAU-GW-HeroMSO-Storage-devices-Creatives_3000x1200._CB636151077_.jpg"
            alt="watch"
          />
        </div>
        <div>
          <img
            src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/Wireless/WLA/unrec/D39822856_WLA_BAU_GW-Unrec-heroes_DesktopTallHero_3000x1200_p._CB623159886_.jpg"
            alt="watch"
          />
        </div>
        <div>
          <img
            src="https://images-eu.ssl-images-amazon.com/images/G/31/img22/Fashion/Event/Gw/Jun-WRS/PEA/Deals-Unrec-3000._CB634992796_.jpg"
            alt="headphones"
          />
        </div>
        <div>
          <img
            src="https://images-eu.ssl-images-amazon.com/images/G/31/img22/Beauty/WRS_June/GW/Heros/PEA/Skincare/WRS-GW-PC-Bunk-Prime._CB634992607_.jpg"
            alt="watch"
          />
        </div>
        <div>
          <img
            src="https://images-eu.ssl-images-amazon.com/images/G/31/IMG20/Home/2022/BAU/ATFGW/3000x1200_best_find_coupon._CB636934541_.jpg"
            alt="watch"
          />
        </div>
      </Carousel>
    </div>
  );
};

export default CheckoutCarousel;
