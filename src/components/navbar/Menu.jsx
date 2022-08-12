import React, { useState } from "react";
import styles from "./navbar.module.css";
import { AiOutlineSearch } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const navigate = useNavigate();
  const [searchKey, setSearchKey] = useState("");

  const handleSearch = e => {
    e.preventDefault();
    navigate(`search-products/${searchKey}`);
    setSearchKey("");
  };

  return (
    <div className={styles.searchBlock}>
      <div className={styles.searchContainer}>
        {/* <form onSubmit={handleSearch}> */}
        <input
          type="search"
          name="searchbar"
          id="searchbar"
          value={searchKey}
          onChange={e => setSearchKey(e.target.value)}
          placeholder="Search for products brands and more"
        />
        {/* <button type="submit"> */}
        <AiOutlineSearch onClick={handleSearch} />
        {/* </button> */}
        {/* </form> */}
      </div>
    </div>
  );
};

export default Menu;
