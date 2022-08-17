import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./cart.module.css";
import { deleteFromCart } from "../../features/cart/cartSlice";
import { fetchProducts } from "../../features/products/productSlice";

import { Card } from "@material-ui/core";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useState, useEffect } from "react";
// import StarRatings from "../../components/starRating/StarRatings";
// import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Axios from "../../apis/Axios";
import { getCart } from "../../features/cart/cartSlice";
import CalculateOffer from "../../components/Offer Helper Components/CalculateOffer";

import BackdropSpinner from "./../../components/spinner/BackdropSpinner";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmDialogButton from "../../components/customButton/ConfirmDialogButton";

const CheckoutProducts = () => {
  // for the card
  const navigate = useNavigate();
  const [cartIdObject, setCartIdObject] = useState({});
  const [cart, setCart] = useState([]);
  const [showBackdrop, setShowBackdrop] = useState(false);
  const allProducts = useSelector(state => state.product.productList);
  const dispatch = useDispatch();

  const { userId } = useSelector(state => state.user.currentUser);
  const cartItems = useSelector(state => state.cart.cartItems);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [deleteFromCart]);

  useEffect(() => {
    let cartIdList = cartItems?.map(item => item.productId);
    let newCartIdobj = cartItems?.reduce((acc, item) => {
      return { ...acc, [item.productId]: [item.itemId, item.quantity] };
    }, {});
    setCartIdObject(newCartIdobj);
    let filteredList = allProducts?.filter(item => {
      return cartIdList?.includes(item.productId);
    });
    setCart(filteredList);
  }, [cartItems]);

  const increaseQuantity = async (userId, itemId, quantity) => {
    setShowBackdrop(true);
    let payload = {
      quantity: quantity + 1,
    };
    try {
      Axios.put(`/customers/${userId}/carts/${itemId}`, payload);
    } catch (error) {
      console.log(error);
    }
    setTimeout(() => {
      setShowBackdrop(false);
    }, 1000);
  };
  const decreaseQuantity = async (userId, itemId, quantity) => {
    setShowBackdrop(true);
    let payload;

    if (quantity <= 1) {
      dispatch(
        deleteFromCart({
          userId,
          cartid: itemId,
        })
      );
    } else {
      payload = {
        quantity: quantity - 1,
      };
    }

    try {
      Axios.put(`/customers/${userId}/carts/${itemId}`, payload);
    } catch (error) {
      console.log(error);
    }
    setTimeout(() => {
      setShowBackdrop(false);
    }, 1000);
  };

  return (
    <div className={styles.checkoutProductContainer}>
      {cartItems?.length === 0 ? (
        <div className={styles.emptyCart}>
          <img
            src="https://rukminim1.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90"
            alt="..."
          />
          <h2>Your cart is empty!</h2>
          <p>It's a good day to buy the items you saved for later!</p>
        </div>
      ) : (
        cart?.map((product, index) => {
          // let thisProduct = allProducts.find(
          //   v => v.productId == product.productId
          // );
          let {
            productId,
            title,
            price,
            description,
            offer,
            thumbnailURL,
            rating,
            brand,
          } = product;
          // let payload = {
          //   userId,
          //   productId,
          // };

          // let {quantity}=cartItems.find(v=>v.productId==productId)

          return (
            <Card
              elevation={5}
              className={styles.cartProduct}
              key={productId}
              onClick={() => navigate(`/products_page/${productId}`)}
            >
              <img src={thumbnailURL} alt={title} />
              <div className={styles.productDetails}>
                <h3>{brand}</h3>
                <p>{title}</p>
                <p>
                  {description.length >= 200
                    ? description.slice(0, 200) + "  ...."
                    : description}
                </p>
              </div>
              <div className={styles.moreDetails}>
                {/* <StarRatings rating={rating} /> */}
                <span>{rating}⭐</span>

                {/* <span>₹{price}</span> */}
                <CalculateOffer originPrice={price} offerPercentage={offer} />
                <div className={styles.quantity}>
                  <AiOutlineMinusCircle
                    onClick={e => {
                      e.stopPropagation();
                      decreaseQuantity(
                        userId,
                        cartIdObject[productId][0],
                        cartIdObject[productId][1]
                      );
                      setTimeout(() => {
                        dispatch(getCart(userId));
                      }, 200);
                    }}
                  />
                  {/* {cartIdObject[productId][1]} */}
                  {/* <span>Qty:{productQuantityCounter[productId]}</span> */}
                  <span>Qty:{cartIdObject[productId][1]}</span>

                  <AiOutlinePlusCircle
                    onClick={e => {
                      e.stopPropagation();
                      increaseQuantity(
                        userId,
                        cartIdObject[productId][0],
                        cartIdObject[productId][1]
                      );
                      setTimeout(() => {
                        dispatch(getCart(userId));
                      }, 200);
                    }}
                  />
                </div>

                <ConfirmDialogButton
                  btnText="Remove from cart"
                  icon={<DeleteIcon />}
                  title="Are you sure, you want remove from cart?"
                  onConfirm={permit =>
                    permit ? (
                      <>
                        {dispatch(
                          deleteFromCart({
                            userId,
                            cartid: cartIdObject[productId][0],
                          })
                        ).then(
                          setTimeout(() => {
                            dispatch(getCart(userId));
                          }, 200)
                        )}
                      </>
                    ) : (
                      ""
                    )
                  }
                />
              </div>

              <BackdropSpinner open={showBackdrop} />
            </Card>
          );
        })
      )}
    </div>
  );
};

export default CheckoutProducts;
