import React from "react";
import { Link } from "react-router-dom";

const Electronic = () => {
  return (
    <aside>
      <div>
        <ul>
          <li>
            <a href="">Electronics GST Store</a>
          </li>
          <li>
            <a href="">Cameras & Accessories</a>
          </li>
          <li>
            <a href="">USB Cables & Drive</a>
          </li>
          <li>
            <a href="">Health & Personal Care</a>
          </li>
          <li>
            <a href="">Computer Peripherals</a>
          </li>
          <li>
            <a href="">Gaming</a>
          </li>
          <li>
            <Link to="/sub-category/laptop">Laptops </Link>
          </li>
          <li>
            <Link to="/sub-category/mobile">Mobiles</Link>
          </li>
          <li>
            <a href="">Power bank</a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Electronic;
