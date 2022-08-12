import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteFromWishlist,
  getAllWishlist,
} from "../../features/wishlist/wishlistSlice";
import styles from "./wishlist.module.css";
import { AiOutlineDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import CalculateOffer from "../../components/Offer Helper Components/CalculateOffer";
import StarRatings from "../../components/starRating/StarRatings";
import { Button } from "@mui/material";
import { addToCart } from "../../features/cart/cartSlice";
import ConfirmDialogButton from "../../components/customButton/ConfirmDialogButton";

const Wishlist = () => {
  // let [wl,setWl] = useState([])
  let navigate = useNavigate();
  let currentUser = useSelector(state => state.user.currentUser);
  let { userId } = currentUser;

  let productlist = useSelector(state => state.product.productList);

  const dispatch = useDispatch();
  useEffect(() => {
    if (currentUser.role.includes("CUSTOMER")) {
      dispatch(getAllWishlist({ userId }));
    }
  }, []);
  let wishlist = useSelector(state => state.wishlist.wishList);
  let cartItems = useSelector(state => state.cart.cartItems);

  return (
    <section className={styles.wishlist}>
      <article>
        <h1>My Wishlist ({wishlist.length})</h1>
        {wishlist.length === 0 ? (
          <h1>Your wish list is empty please go back and add some products</h1>
        ) : (
          <div className={styles.listContainer}>
            {wishlist.map((product, index) => {
              let { productId, quantity, imageLink } = product;
              let payload = {
                cost: product.cost,
                imageLink: product.imageLink,
                quantity: 1,
                productId: product.productId,
              };
              let cartData = {
                userId,
                payload,
              };
              let { title, brand, description, offer, price } =
                productlist.find(v => v.productId == productId);
              let found = cartItems.find(v => v.productId == product.productId);
              return (
                <div
                  onClick={() => navigate(`/products_page/${productId}`)}
                  className={styles.wishlistProduct}
                  key={productId}
                >
                  <div className={styles.prodImg}>
                    <img src={imageLink} alt={title} height="200" width="200" />
                  </div>
                  <div className={styles.prodDetails}>
                    <h2>
                      {brand} {title}
                    </h2>
                    <p>
                      {description.length >= 200
                        ? description.slice(0, 200) + " ..."
                        : description}
                    </p>
                    {/* <span style={{ position: "relative", width: "100%" }}> */}
                    {/* {rating.toFixed(1)} */}
                    {/* <StarRatings rating={rating} left="1.7" top="0" /> */}
                    {/* <Chip className={style.chip} label="Best" /> */}
                    {/* </span> */}
                    <CalculateOffer
                      originPrice={price}
                      offerPercentage={offer}
                    />
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={e => {
                        e.stopPropagation();

                        if (found == undefined) dispatch(addToCart(cartData));
                      }}
                    >
                      {found ? "Added" : "Add To Cart"}
                    </Button>
                  </div>

                  <ConfirmDialogButton
                    title="Are you sure you want to remove it from wishlist?"
                    icon={<AiOutlineDelete />}
                    onConfirm={permit =>
                      permit
                        ? dispatch(
                            deleteFromWishlist({
                              userId,
                              wishlistId: productId,
                            })
                          )
                        : ""
                    }
                  />
                </div>
              );
            })}
          </div>
        )}
      </article>
    </section>
  );
};

export default Wishlist;
