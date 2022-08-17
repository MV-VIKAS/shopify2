import { Box, Button, Dialog, Grid, TextField, Rating } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "../profile/profile.css";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "../../apis/Axios";

let initialState = {
  description: "",
  heading: "",
  rating: "",
};
function UpdateReview({ open, onClose, orderId, productId }) {
  let [userData, setUserData] = useState(initialState);
  let [review,setReview] = useState([])
  console.log(userData);
  let navigate = useNavigate();
  let { userId } = useSelector(state => state.user.currentUser);
  let [error, setError] = useState({});
  const dispatch = useDispatch();
  let { id } = useParams();
  // console.log(thisReview);
  const handleChange = e => {
    let value = e.target.value;
    setUserData(pre => ({ ...pre, [e.target.name]: value }));
  };
  // console.log(thisReview);

  let getReview = () => {
    try {
      fetch(
        `http://localhost:8080/shopping-kart-ty-api-0.0.1-SNAPSHOT/review/product/${productId}`
      )
        .then(data => data.json())
        .then(fData => setReview(fData.data));
      // setThisReview(data.json());
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getReview();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    console.log(id);

    try {
      Axios.post(
        `/review/customer/${userId}/order/${orderId}/product?product_id=${productId}`,
        userData
      );

      setTimeout(() => {
        onClose();
        toast.success("successfully updated");
      }, 300);
    } catch (err) {
      toast.error(err);
    }
  };
  return (
    <section className="editpromodal">
      <Dialog open={open} onClose={onClose}>
        <Box
          className="editprofilebox"
          component="form"
          onSubmit={handleSubmit}
        >
          <h2>Add Review</h2>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="heading"
                label="heading"
                name="heading"
                autoComplete="heading"
                onChange={handleChange}
                value={userData.heading}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="description"
                label="description"
                id="description"
                autoComplete="description"
                onChange={handleChange}
                value={userData.description}
              />
            </Grid>
            <Grid item xs={12}>
              <Rating
                name="rating"
                label="rating"
                id="rating"
                autoComplete="rating"
                value={userData.rating}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
        </Box>
      </Dialog>
    </section>
  );
}

export default UpdateReview;
