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
  rating: 0,
};

function AddReview({ open, onClose, orderId, productId }) {
  let navigate = useNavigate();
  let [userData, setUserData] = useState(initialState);
  let { userId } = useSelector(state => state.user.currentUser);
  let [error, setError] = useState({});
  const dispatch = useDispatch();
  let { id } = useParams();

  const handleChange = e => {
    let value = e.target.value;
    setUserData(pre => ({ ...pre, [e.target.name]: value }));
  };
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

export default AddReview;
