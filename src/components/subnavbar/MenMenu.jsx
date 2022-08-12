import React from "react";
import { Link } from "react-router-dom";

const MenMegaMenu = () => {
  return (
    <aside className="men">
      <div>
        <ul>
          <li>
            <a href="">Topwear</a>
          </li>
          <li>
            <Link to="/sub-category/mens-tshirt">T-shirts</Link>
          </li>
          <li>
            <a href="">Casual Shirts</a>
          </li>
          <li>
            <a href="">Formal Shirts</a>
          </li>
          <li>
            <a href="">Sweatshirt</a>
          </li>
          <li>
            <a href="">Sweaters</a>
          </li>
          <li>
            <a href="">Jackets</a>
          </li>
          <li>
            <a href="">Blazers&Coats</a>
          </li>
          <li>
            <a href="">Suits</a>
          </li>
          <li>
            <a href="">Rain Jackets</a>
          </li>
        </ul>

        <ul>
          <li>
            <a href="">Indian & Festive Wear</a>
          </li>
          <li>
            <a href="">Kurtas & kurta Sets</a>
          </li>
          <li>
            <a href="">Sherwanis</a>
          </li>
          <li>
            <a href="">Nehru Jakets</a>
          </li>
          <li>
            <a href="">Dhotis</a>
          </li>
        </ul>
      </div>
      <div>
        <ul>
          <li>
            <a href="">BottomWear</a>
          </li>
          <li>
            <Link to="/sub-category/mens-jeans">Jeans</Link>
          </li>
          <li>
            <a href="">Casual Trousers</a>
          </li>
          <li>
            <a href="">Formal Trousers</a>
          </li>
          <li>
            <a href="">Shorts</a>
          </li>
          <li>
            <a href="">Tracks Pants & Joggers</a>
          </li>
        </ul>
        <ul>
          <li>
            <a href="">Innerwear & Sleepwear</a>
          </li>
          <li>
            <a href="">Briefs & Trunks</a>
          </li>
          <li>
            <a href="">Boxers</a>
          </li>
          <li>
            <a href="">Vests</a>
          </li>
          <li>
            <a href="">Sleepwear</a>
          </li>
          <li>
            <a href="">Thermals</a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default MenMegaMenu;
