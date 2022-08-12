import React from "react";
import foot from "./footer.module.css";
import { IoMdBriefcase, IoIosHelpCircle } from "react-icons/io";
import { MdStars } from "react-icons/md";
import { FaGift } from "react-icons/fa";

const Footer = () => {
  return (
    <section className={foot.footer_Section}>
      <div className={foot.footer_Upperhalf}>
        <div className={foot.footer_Links}>
          <div className={foot.footer_about}>
            <div>ABOUT</div>
            <div>About Us</div>
            <div>Contact Us</div>
            <div>Careers</div>
            <div>ShoppingKart Stories</div>
            <div>Press</div>
            <div>ShoppingKart Wholesale</div>
            <div>Corporate Information</div>
          </div>
          <div className={foot.footer_help}>
            <div>HELP</div>
            <div>Payments</div>
            <div>Shipping</div>
            <div>Cancellation & Returns</div>
            <div>FAQ</div>
            <div>Report Infringement</div>
          </div>
          <div className={foot.footer_policy}>
            <div>POLICY</div>
            <div>Return Policy</div>
            <div>Terms Of Use</div>
            <div>Security</div>
            <div>Privacy</div>
            <div>Sitemap</div>
            <div>EPR Compliance</div>
          </div>
          <div className={foot.footer_social}>
            <div>SOCIAL</div>
            <div>Facebook</div>
            <div>Twitter</div>
            <div>YouTube</div>
          </div>
        </div>
        <div className={foot.sideBorder}></div>
        <div className={foot.footer_EmailContact}>
          <div>
            <div>Mail Us:</div>
            <div>
              ShoppingKart Private Limited, #88 3rd floor, Brigade
              Chambers,Gandhi Bazar Main Road, Basavanagudi Bengaluru, 560004,
              Karnataka, India
            </div>
          </div>
          <div>
            <div>Registered Office Address:</div>
            <div>
              ShoppingKart Private Limited, #88 3rd floor, Brigade
              Chambers,Gandhi Bazar Main Road, Basavanagudi Bengaluru, 560004,
              Karnataka, India CIN : U51109KA2012PTC066107 Telephone:{" "}
              <span>080-41204235</span>
            </div>
          </div>
        </div>
      </div>
      <div className={foot.bottomBorder}></div>
      <div className={foot.footer_Lowerhalf}>
        <div className={foot.Seller}>
          <span>
            <IoMdBriefcase />
          </span>
          <span>Become a Seller</span>
        </div>
        <div className={foot.Advertise}>
          <span>
            <MdStars />
          </span>
          <span>Advertise</span>
        </div>
        <div className={foot.gift}>
          <span>
            <FaGift />
          </span>
          <span>Gift Cards</span>
        </div>
        <div className={foot.helpCenter}>
          <span>
            <IoIosHelpCircle />
          </span>
          <span>Help Center</span>
        </div>
        <div className={foot.tradeMark}>© 2007-2022 ShoppingKart.com</div>
        <div className={foot.payments}>
          <img
            src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/payment-method_69e7ec.svg"
            alt="payments"
          />
        </div>
      </div>
    </section>
  );
};

export default Footer;
