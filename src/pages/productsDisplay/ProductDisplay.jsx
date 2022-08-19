import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import style from "./ProductDisplay.module.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import { useNavigate, useParams } from "react-router-dom";
import Cataxios from "./../../apis/Cataxios";
import { getCurrentUser } from "../../features/User/userSlice";
// import Statements
import { addToCart, getCart } from "../../features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { OpenLogin } from "../../features/Login/LoginSlice";
import StarRatings from "../../components/starRating/StarRatings";
import CalculateOffer from "../../components/Offer Helper Components/CalculateOffer";
import { Box, Grid, Rating } from "@mui/material";
import { AiOutlineDown } from "react-icons/ai";
// import ReactImageZoom from "react-image-zoom";
import AddReview from "./../review/AddReview";
import UpdateReview from "./../review/UpdateReview";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import { Divider } from "@material-ui/core";
import AllReview from "../review/AllReview";

const useStyles = makeStyles(theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

const ProductDisplay = () => {
  let currentUser = useSelector(state => state.user.currentUser);
  let userId = currentUser.userId;
  let { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();
  let [currentProduct, setCurrentProduct] = useState([]);
  // let currentProduct = useSelector(state => state.product.currentProduct);
  const [productName, setProductName] = useState("Kids");
  const [productPriceInfo, setProductPriceInfo] = useState(
    "From ₹8227.00/mo.Per Month with EMI,Footnote** or ₹69900.00"
  );
  const [offerDetails, setOfferDetails] = useState(
    "Get ₹9000.00 – ₹46700.00 off*"
  );
  const [ratings, setRating] = useState(4.9);
  const [price, setPrice] = useState(88);
  const [brand, setBrand] = useState("Apple");
  const [product, setProduct] = useState({});
  const [description, setDescription] = useState("");
  const [offer, setOffer] = useState(0);
  let [cartIdList, setCartIdList] = useState([]);
  let cartlist = useSelector(state => state.cart.cartItems);
  let [delivered, setDelivered] = useState(undefined);
  const [openAddreview, setOpenAddreview] = useState(false);
  const [openUpdatereview, setOpenUpdatereview] = useState(false);
  const [showRating, setShowRating] = useState(false);

  const orderList = useSelector(state => state.orders.orderList);
  const [orderId, setOrderId] = useState("");
  let [review, setReview] = useState({});

  // to check whehter the products has been ordered and delivered
  console.log(delivered);
  useEffect(() => {
    let pId = id;
    let tempOrderId;
    let exists = false;
    orderList?.filter(order => {
      order.orderedItems.filter(oProduct => {
        if (oProduct.productId === pId) {
          exists = true;
          console.log(exists);
        }
      });
      if (exists) {
        tempOrderId = order.id;
      }
      return order.orderId;
    });
  }, []);
  // useEffect(() => {
  //   setReview(currentProduct.reviews.find(v => v.userId == userId));
  // }, []);
  useEffect(() => {
    // setIdList(cartList.map(item => item.productId));
    setCartIdList(cartlist.map(item => item.productId));
  }, [cartlist]);
  useEffect(() => {
    dispatch(getCurrentUser({ userId }));
  }, [currentProduct]);

  let handleBuy = e => {
    if (!currentUser.email) {
      dispatch(OpenLogin());
      return;
    }
    navigate("/selectaddress");
  };

  let payload = {
    cost: currentProduct.price,
    imageLink: currentProduct.thumbnailURL,
    quantity: 1,
    productId: currentProduct.productId,
  };
  let cartData = {
    userId,
    payload,
  };
  useEffect(() => {
    fetch(
      `http://localhost:8080/shopping-kart-ty-api-0.0.1-SNAPSHOT/products/${id}`
    )
      .then(res => res.json())
      .then(data => setCurrentProduct(data.data))
      .catch(err => console.log(err));
  }, [openUpdatereview]);
  useEffect(() => {
    setReview(currentProduct.reviews?.find(v => v.userId == userId));
  }, [currentProduct]);

  useEffect(() => {
    setDelivered(
      currentUser.customerOrders?.find(
        v =>
          v.orderStatus == "DELIVERED" &&
          v.orderedItems?.some(i => i.productId == currentProduct.productId)
      )
    );
  }, [currentUser]);
  const handleAddClose = value => {
    setOpenAddreview(false);
  };
  const handleUpdateClose = value => {
    setOpenUpdatereview(false);
  };
  console.log(showRating);
  return (
    <>
      {openAddreview && (
        <AddReview
          open={openAddreview}
          onClose={handleAddClose}
          orderId={delivered.id}
          productId={id}
        />
      )}
      {openUpdatereview && (
        <UpdateReview
          open={openUpdatereview}
          onClose={handleUpdateClose}
          orderId={delivered.id}
          productId={id}
          review={review}
        />
      )}
      <div className={style.prdouctPage}>
        {/* title card */}
        <Card elevation={3} className={style.headingCard}>
          <section className={style.sectionCard}>
            <span className={style.heading}>
              <h1>{currentProduct.title}</h1>
            </span>
            <span className={style.priceInfo}>
              <span>{productPriceInfo}</span>
            </span>
          </section>
        </Card>
        {/*price and additional info card*/}
        <div className={style.productInfoImgContainer}>
          {/* image card */}
          <div className={style.imageCard}>
            <section className={style.imgContainer}>
              <Carousel
                showThumbs={false}
                autoPlay={true}
                infiniteLoop={true}
                showStatus={false}
                showArrows={false}
                useKeyboardArrows={true}
                interval="2000"
              >
                {currentProduct.productImageURLs &&
                  currentProduct.productImageURLs.map(e => {
                    // let props = {
                    //   img: e,
                    //   zoomWidth: 500,
                    //   zoomPosition: "right",
                    //   offset: {
                    //     vertical: 0,
                    //     horizontal: 20,
                    //   },
                    //   zoomLensStyle: "opacity: 0.7; background-color: green",
                    // };
                    return (
                      <div width="600" key={e}>
                        <img
                          src={e}
                          alt={currentProduct.title}
                          width="600"
                          height="400"
                          style={{
                            objectFit: "contain",
                            objectPosition: "center",
                          }}
                        />
                        {/* <ReactImageZoom {...props} /> */}
                      </div>
                    );
                  })}
              </Carousel>
            </section>
          </div>

          {/* --------------------------------------------------------------------------------------------------- */}

          {/* info card */}
          <div className={style.infoCard}>
            <h1 className={style.h1Title}>
              {currentProduct.brand}
              <sup className={style.supScript}>new</sup>
            </h1>
            <Accordion className={style.accordion}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography className={classes.heading}>
                  Product description
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{currentProduct.description}</Typography>
              </AccordionDetails>
            </Accordion>
            {/* <section className={style.offerDetailsContainer}>
            <span className={style.offerDetails}>
              
            </span>
          </section> */}
            <div
              className={style.starHeading}
              onMouseEnter={_ => setShowRating(true)}
              onMouseLeave={_ => setShowRating(false)}
            >
              <StarRatings rating={currentProduct.rating} />
            </div>
            {showRating && (
              <AllReview
                style={{ zIndex: "2", position: "absolute" }}
                productId={id}
                reviews={currentProduct.reviews}
                showRating={showRating}
              />
            )}
            {/* <Accordion className={style.starAccordion}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panelstar-content"
                id="panelstar-header"
              >
                <div className={style.starHeading}>
                  <StarRatings rating={currentProduct.rating} />
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <div className={style.ratingsContainer}>
                  <div className={style.productRatings}>
                    <label>
                      <h3>5 Star:</h3>
                    </label>
                    <progress
                      className={style.progressBar}
                      id="file"
                      value="90"
                      title="90%"
                      max="100"
                    >
                      {" "}
                      90%{" "}
                    </progress>
                    <p>90%</p>
                  </div>

                  <div className={style.productRatings}>
                    <label>
                      <h3>4 Star:</h3>
                    </label>
                    <progress
                      className={style.progressBar}
                      id="file"
                      value="60"
                      title="60%"
                      max="100"
                    >
                      {" "}
                      60%{" "}
                    </progress>
                    <p>60%</p>
                  </div>

                  <div className={style.productRatings}>
                    <label>
                      <h3>3 Star:</h3>
                    </label>
                    <progress
                      className={style.progressBar}
                      id="file"
                      value="50"
                      title="50%"
                      max="100"
                    >
                      {" "}
                      50%{" "}
                    </progress>
                    <p>50%</p>
                  </div>

                  <div className={style.productRatings}>
                    <label>
                      <h3>2 Star:</h3>
                    </label>
                    <progress
                      className={style.progressBar}
                      id="file"
                      value="46"
                      title="46%"
                      max="100"
                    >
                      {" "}
                      46%{" "}
                    </progress>
                    <p>46%</p>
                  </div>

                  <div className={style.productRatings}>
                    <label>
                      <h3>1 Star:</h3>
                    </label>
                    <progress
                      className={style.progressBar}
                      id="file"
                      value="32"
                      max="100"
                      title="32%"
                    >
                      {" "}
                      32%{" "}
                    </progress>
                    <p>32%</p>
                  </div>
                  <div className={style.seeAllReviews}>
                    <a href="#">See all customer reviews </a>
                  </div>
                </div>
              </AccordionDetails>
            </Accordion> */}
            {/* <span>
            Ratings:
            <span className={style.ratingstag}>
             

              <StarRatings rating={currentProduct.rating} left="1.7" top="0" />
              
            </span>
          </span> */}

            <br />
            <br />
            <span>
              Price:
              {/* <span className={style.priceTag}>₹{price}</span>
            <sup className={style.supScriptPriceTag}>new</sup> */}
              <CalculateOffer
                originPrice={currentProduct.price}
                offerPercentage={currentProduct.offer}
              />
            </span>
            <footer className={style.imgCardFooterCard}>
              {currentProduct.price > 1000 && <span>free Delivery</span>}
            </footer>
            <section className={style.btnContainer}>
              <button className={style.buyNow} onClick={handleBuy}>
                Buy Now
              </button>
              <br />

              <button
                className={style.addToCart}
                onClick={() => {
                  if (cartIdList.includes(currentProduct.productId) == false)
                    dispatch(
                      addToCart({
                        userId,
                        payload: {
                          cost: currentProduct.price,
                          imageLink: currentProduct.thumbnailURL,
                          quantity: 1,
                          productId: currentProduct.productId,
                        },
                      })
                    );
                  setTimeout(() => {
                    dispatch(getCart(userId));
                  }, 300);
                }}
              >
                {cartIdList.includes(currentProduct.productId)
                  ? "added"
                  : "add to cart"}
              </button>

              <Box>
                {currentUser.customerOrders?.length != 0 &&
                delivered != undefined ? (
                  currentProduct.reviews?.some(v => v.userId == userId) ? (
                    <button
                      className={style.buyNow}
                      onClick={() => setOpenUpdatereview(true)}
                    >
                      Update Review
                    </button>
                  ) : (
                    <button
                      className={style.buyNow}
                      onClick={() => setOpenAddreview(true)}
                    >
                      Add Review
                    </button>
                  )
                ) : (
                  ""
                )}
              </Box>
              <h3>Reviews</h3>
              <Card sx={{ maxWidth: 345 }}>
                {currentProduct.reviews?.map(review => {
                  return (
                    <div key={review.reviewId}>
                      <CardHeader
                        avatar={
                          <Avatar
                            sx={{ bgcolor: red[500] }}
                            aria-label="recipe"
                          >
                            {review.userName.charAt(0).toUpperCase()}
                          </Avatar>
                        }
                        title={review.userName}
                        subheader={new Date(
                          `${review.dateTime}`
                        ).toLocaleString()}
                      />
                      <Typography style={{ marginLeft: "4%" }}>
                        <span style={{ display: "flex", alignItems: "center" }}>
                          <Rating
                            name="read-only"
                            value={review.rating}
                            readOnly
                          ></Rating>
                          <strong>{review.heading}</strong>
                        </span>
                      </Typography>

                      <CardContent>
                        <Typography variant="body2" color="text.secondary">
                          {review.description}
                        </Typography>
                      </CardContent>
                      <Divider />
                    </div>
                  );
                })}
              </Card>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDisplay;
