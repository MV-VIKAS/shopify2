import React, { useState, useEffect } from "react";
import Axios from "../../apis/Axios";
import style from "../productsDisplay/ProductDisplay.module.css";

const AllReview = ({ productId, reviews }) => {
  const [review, setReview] = useState({
    star1: 0,
    star2: 0,
    star3: 0,
    star4: 0,
    star5: 0,
  });
  useEffect(() => {
    let newReview = { star1: 0, star2: 0, star3: 0, star4: 0, star5: 0 };
    for (let i = 1; i < 6; i++) {
      let filteredReview = reviews?.filter(v => v.rating == i);
      let key = "star" + i;
      if (filteredReview != null) {
        let reviewPercentage = (filteredReview?.length / reviews.length) * 100;
        newReview = { ...newReview, [key]: reviewPercentage };
      }
    }
    setReview(newReview);
  }, []);
  console.log(review);

  return (
    <div>
      <div className={style.ratingsContainer}>
        <div className={style.productRatings}>
          <label>
            <h3>5 Star:</h3>
          </label>
          <progress
            className={style.progressBar}
            id="file"
            value={review.star5}
            title="90%"
            max="100"
          >
            {" "}
            {review.star5}{" "}
          </progress>
          <p>{review.star5}%</p>
        </div>

        <div className={style.productRatings}>
          <label>
            <h3>4 Star:</h3>
          </label>
          <progress
            className={style.progressBar}
            id="file"
            value={review.star4}
            title="60%"
            max="100"
          >
            {" "}
            {review.star4}{" "}
          </progress>
          <p>{review.star4}%</p>
        </div>

        <div className={style.productRatings}>
          <label>
            <h3>3 Star:</h3>
          </label>
          <progress
            className={style.progressBar}
            id="file"
            value={review.star3}
            title="50%"
            max="100"
          >
            {" "}
            {review.star3}{" "}
          </progress>
          <p>{review.star3}%</p>
        </div>

        <div className={style.productRatings}>
          <label>
            <h3>2 Star:</h3>
          </label>
          <progress
            className={style.progressBar}
            id="file"
            value={review.star2}
            title="46%"
            max="100"
          >
            {" "}
            {review.star2}{" "}
          </progress>
          <p>{review.star2}%</p>
        </div>

        <div className={style.productRatings}>
          <label>
            <h3>1 Star:</h3>
          </label>
          <progress
            className={style.progressBar}
            id="file"
            value={review.star1}
            max="100"
            title="32%"
          >
            {" "}
            {review.star1}{" "}
          </progress>
          <p>{review.star1}%</p>
        </div>
        <div className={style.seeAllReviews}>
          <a href="#">See all customer reviews </a>
        </div>
      </div>
    </div>
  );
};

export default AllReview;
