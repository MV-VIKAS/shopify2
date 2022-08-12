import { Button, Card } from "@mui/material";
import React, { useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import style2 from "../featured products/featuredProducts.module.css";
import style from "./cat.module.css";
import { addToCart } from "../../features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToWishlist } from "../../features/wishlist/wishlistSlice";
import { useEffect } from "react";
import CalculateOffer from "../Offer Helper Components/CalculateOffer";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarRatings from "../starRating/StarRatings";
import { deleteFromWishlist } from "./../../features/wishlist/wishlistSlice";

const MapProduct = ({ data, getSort, sortingType, objKey }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector(state => state.user.currentUser.userId);
  let cartList = useSelector(state => state.cart.cartItems);
  let wishList = useSelector(state => state.wishlist.wishList);
  let [productIdList, setIdList] = useState([]);
  let [cartIdList, setCartIdList] = useState([]);
  useEffect(() => {
    getSort(objKey);
  }, [sortingType]);
  useEffect(() => {
    setIdList(wishList?.map(item => item.productId));
    setCartIdList(cartList?.map(item => item.productId));
  }, [cartList, wishList]);

  return (
    <div className={style.box}>
      {data.map(data => {
        let { productId, brand, rating, thumbnailURL, price, title, offer } =
          data;
        let payload = {
          cost: price,
          imageLink: thumbnailURL,
          quantity: 1,
          productId: productId,
        };
        let cartData = {
          userId,
          payload,
        };
        return (
          <Card
            data-aos="zoom-in"
            data-aos-offset="200"
            onClick={() => navigate(`/products_page/${productId}`)}
            className={style2.productCard}
            style={{
              background: "#efefef",
              border: "#d2cdcd 0.1px solid",
            }}
            key={productId}
          >
            <div className={style2.cardBody}>
              <img src={thumbnailURL} alt={title} />
            </div>
            <div className={style2.cardHeader}>
              <span>{rating.toFixed(1)}</span>
              <StarRatings rating={rating} left="2.5" />
              {rating > 4.6 ? <span>Featured</span> : null}
            </div>
            <div className={style2.cardFooter}>
              <div className={style2.footerLeft}>
                <span>{brand}</span>
                <span>
                  {title.length > 38 ? title.slice(0, 35) + "..." : title}
                </span>
                <CalculateOffer originPrice={price} offerPercentage={offer} />
              </div>
              <div className={style2.footerRight}>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={e => {
                    e.stopPropagation();

                    if (cartIdList?.includes(productId) == false) {
                      dispatch(addToCart(cartData));
                    }
                  }}
                >
                  {cartIdList?.includes(productId) ? "added" : "add to cart"}
                </Button>
                <FavoriteIcon
                  onClick={e => {
                    e.stopPropagation();
                    if (productIdList?.includes(productId)) {
                      dispatch(
                        deleteFromWishlist({
                          userId,
                          wishlistId: productId,
                        })
                      );
                      return;
                    }
                    dispatch(addToWishlist(cartData));
                  }}
                  style={{
                    fill: productIdList?.includes(productId)
                      ? "red"
                      : "#c0bfbf",
                  }}
                />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default MapProduct;
