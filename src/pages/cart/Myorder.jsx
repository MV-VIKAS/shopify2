import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./cart.module.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { Card, CardHeader } from "@material-ui/core";

import { useState, useEffect } from "react";
import StarRatings from "../../components/starRating/StarRatings";
import { IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { getOrderHistory } from "./../../features/orders/orderSlice";
import CalculateOffer from "../../components/Offer Helper Components/CalculateOffer";
import Axios from "../../apis/Axios";
import { toast } from "react-toastify";
import ConfirmDialogButton from "./../../components/customButton/ConfirmDialogButton";
import CancelTerms from "../../components/cancelTerms/CancelTerms";
const MyOrder = () => {
  const orderList = useSelector(state => state.orders.orderList);
  const orderItems = useState([]);
  const [allPropertyObj, setAllPropertyObj] = useState({});
  // for the card
  const navigate = useNavigate();
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const cartSet = cart.cartItems?.map(JSON.stringify);
  const uniqueSet = new Set(cartSet);
  let uniqueArray = Array.from(uniqueSet).map(JSON.parse);
  const userId = useSelector(state => state.user.currentUser.userId);
  // for quantity
  const productQuantityCounter = {};
  const cartQnty = useSelector(state => state.cart);

  cartQnty.cartItems?.map(element => {
    productQuantityCounter[element.productsid] =
      (productQuantityCounter[element.productsid] || 0) + 1;
  });
  const featureProduct = useSelector(state => state.product.productList);

  const handleCancelOrder = async orderId => {
    try {
      await Axios.patch(`customers/${userId}/orders/${orderId}`);
      dispatch(getOrderHistory(userId));
      toast.success("Order has been Cancelled");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.data);
    }
  };

  useEffect(() => {
    dispatch(getOrderHistory(userId));
  }, []);
  useEffect(() => {
    let newAllpropertyObj = featureProduct?.reduce((acc, value) => {
      return { ...acc, [value.productId]: value };
    }, {});
    setAllPropertyObj(newAllpropertyObj);
  }, [featureProduct]);
  return (
    <div className={styles.orderListContainer} style={{ margin: "1rem auto" }}>
      <h1>My Orders ({orderList?.length || 0})</h1>
      {orderList === null ? (
        <div className={styles.emptyCart}>
          <img
            src="https://rukminim1.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90"
            alt="..."
          />
          <h2>You Order List is Empty</h2>
          <p>It's a good day to buy the items you saved for later!</p>
        </div>
      ) : (
        orderList
          ?.map((order, index) => {
            let {
              id,
              orderStatus,
              address,
              orderedItems,
              orderDate,
              totalAmount,
            } = order;
            let {
              type,
              name,
              buildingInfo,
              streetInfo,
              landmark,
              city,
              state,
              country,
              pincode,
              phone,
            } = address;

            return (
              <Accordion key={id}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Card
                    elevation={5}
                    className={styles.cartOrder}
                    key={id}
                    // onClick={() => navigate(`/products_page/${productsid}`)}
                    style={{ margin: "10px" }}
                  >
                    <div className={styles.orderHeader}>
                      <div className={styles.orderStatus}>
                        <h3>{orderStatus}</h3>
                        <p>
                          {new Date(orderDate).toLocaleDateString()}{" "}
                          {new Date(orderDate).toLocaleTimeString()}{" "}
                        </p>
                      </div>
                      <div className={styles.orderTotal}>
                        <h3> TOTAL</h3>
                        <h3>₹{totalAmount} </h3>
                      </div>
                      <div className={styles.deliveryAddress}>
                        <h3>SHIP TO</h3>
                        <Accordion onClick={e => e.stopPropagation()}>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <Typography>{name} </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <h4>Address : &nbsp; {type} </h4>

                            <p>
                              {" "}
                              {buildingInfo} , {streetInfo}, Landmark: "
                              {landmark}" , {city} - {pincode} - {state} -{" "}
                              {country}
                            </p>
                            <strong>contact :</strong>
                            {phone}
                          </AccordionDetails>
                        </Accordion>
                      </div>
                      <div className={styles.orderNumber}>
                        <h3>ORDER #{id}</h3>
                        <button onClick={e => e.stopPropagation()}>
                          Invoice
                        </button>
                      </div>
                      <div className={styles.cancelOrder}>
                        {orderStatus == "CANCELLED" ? (
                          ""
                        ) : (
                          // <button
                          //   onClick={e => {
                          //     e.stopPropagation();
                          //     handleCancelOrder(id);
                          //   }}
                          //   className={styles.cancelBtn}
                          // >
                          //   Cancel order
                          // </button>
                          <ConfirmDialogButton
                            btnText="Cancel Order"
                            title="Are you sure you want to cancel the order?"
                            cancelTerms={<CancelTerms />}
                            onConfirm={permit =>
                              permit ? dispatch(handleCancelOrder(id)) : ""
                            }
                          />
                        )}
                      </div>
                    </div>
                  </Card>
                </AccordionSummary>
                <AccordionDetails>
                  <div className={styles.orderListContainer}>
                    {orderedItems.map(item => {
                      let fullPropertyObj = allPropertyObj[item.productId];
                      if (!(item.productId in allPropertyObj)) {
                        return;
                      }
                      return (
                        <Card
                          elevation={5}
                          className={styles.cartProduct}
                          key={item.productId}
                          onClick={() =>
                            navigate(`/products_page/${item.productId}`)
                          }
                        >
                          <img
                            src={fullPropertyObj?.thumbnailURL}
                            alt={fullPropertyObj?.title}
                          />
                          <div className={styles.productDetails}>
                            <h3>{fullPropertyObj?.brand}</h3>
                            <p>{fullPropertyObj.title}</p>
                            <p>
                              {fullPropertyObj.description.length >= 220
                                ? fullPropertyObj.description.slice(0, 220) +
                                  " ..."
                                : fullPropertyObj.description}
                            </p>
                          </div>
                          <div className={styles.moreDetails}>
                            {/* <StarRatings rating={rating} /> */}
                            <span>{fullPropertyObj.rating}⭐</span>

                            <span>₹{fullPropertyObj.price}</span>
                            <CalculateOffer
                              originPrice={fullPropertyObj.price}
                              offerPercentage={fullPropertyObj.offer}
                            />
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                </AccordionDetails>
              </Accordion>
            );
          })
          .reverse()
      )}
    </div>
  );
};

export default MyOrder;
