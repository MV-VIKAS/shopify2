import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Cataxios from "../../apis/Cataxios";
import style from "./cat.module.css";
import { AiOutlineSearch } from "react-icons/ai";
import { BiSort } from "react-icons/bi";
import { FaHeart, FaFilter } from "react-icons/fa";
import { addToCart } from "../../features/cart/cartSlice";
import { useDispatch } from "react-redux";
import { Button, Menu, MenuItem, IconButton, Chip } from "@mui/material";
import Card from "@material-ui/core/Card";
import style2 from "../featured products/featuredProducts.module.css";
import { useNavigate } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import { addToWishlist } from "../../features/wishlist/wishlistSlice";
import FilterDialog from "../FilterPopUp/FilterDialog";
import MapProduct from "./MapProduct";
import { Fragment } from "react";
const CategoriesComp = ({ data, setdata, fetchdata, lable }) => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const [sorting, setSorting] = useState(null);
  const [sortingType, setSortType] = useState("");
  const SortOpen = Boolean(sorting);
  const [openFilter, setFilter] = useState(false);

  function getSorting(props) {
    if (sortingType == "") {
      return;
    }
    let newdata;
    let value = sortingType.split(" ")[1].toLowerCase();
    if (!props) {
      newdata = [...data].sort((a, b) => (a[value] < b[value] ? 1 : -1));
      setdata(newdata);
      return;
    } else {
      newdata = data[props]
        .slice(0, data.length)
        .sort((a, b) => (a[value] < b[value] ? 1 : -1));
    }

    setdata(pre => ({ ...pre, [props]: newdata }));
  }
  const handleClick = event => {
    setSorting(event.currentTarget);
  };
  const handleClose = () => {
    setSorting(null);
  };
  const handleDelete = () => {
    fetchdata();
    setSortType("");
  };
  const handleSort = e => {
    setSortType(e.target.innerText.trim());
    handleClose();
  };
  return (
    <div>
      <div>
        <div>
          <h1 style={{ margin: "20px 60px" }}>{lable}</h1>
          {/* <div className={style.block}>
            <input type="text" name="" id="" placeholder="Search " />
            <div>
              <AiOutlineSearch />
            </div>
            <div>
              <IconButton
                id="demo-positioned-button"
                aria-controls={SortOpen ? "demo-positioned-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={SortOpen ? "true" : undefined}
                color="primary"
                onClick={handleClick}
              >
                <BiSort />
              </IconButton>
              {sortingType !== "" && (
                <Chip
                  variant="filled"
                  onDelete={handleDelete}
                  label={sortingType}
                />
              )}
            </div>
            <Menu
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              anchorEl={sorting}
              open={SortOpen}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <MenuItem onClick={handleSort}>By Price</MenuItem>
              <MenuItem onClick={handleSort}>By rating</MenuItem>
            </Menu>

            <div>
              <IconButton
                onClick={() => setFilter(true)}
                aria-haspopup="true"
                color="primary"
              >
                <FaFilter />
              </IconButton>
              <FilterDialog openFilter={openFilter} setFilter={setFilter} />
            </div>
            <div>
              <FaHeart />
            </div>
          </div> */}
        </div>
        {Array.isArray(data) ? (
          <MapProduct
            data={data}
            objKey={null}
            getSort={getSorting}
            sortingType={sortingType}
          />
        ) : (
          Object.keys(data).map(key => {
            return (
              <Fragment key={key}>
                <h3 className={style.subHeading}>{key}</h3>
                <MapProduct
                  data={data[key]}
                  getSort={getSorting}
                  sortingType={sortingType}
                  objKey={key}
                />
              </Fragment>
            );
          })
        )}
      </div>
    </div>
  );
};

export default CategoriesComp;
