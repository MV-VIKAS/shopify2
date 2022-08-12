import {
  Box,
  Button,
  Dialog,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "./profile.css";
import { createCurrentUser, editProfile } from "../../features/User/userSlice";
import { useNavigate } from "react-router-dom";
import Axios from "../../apis/Axios";

let initialState = {
  firstName: "",
  lastName: "",
  gender: null,
  phone: 0,
  email: "",
};

function EditProfile({ open, onClose }) {
  let currentUser = useSelector(state => state.user.currentUser);

  let navigate = useNavigate();

  let [userData, setUserData] = useState(initialState);
  let [error, setError] = useState({});
  const dispatch = useDispatch();

  const getUser = async () => {
    try {
      let { data } = await Axios.get(`/customers/${currentUser.userId}`);
      setUserData(data);
    } catch (error) {
      setError(error);
      setUserData(error.response.data.data);
      // console.log(error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  const handleChange = e => {
    let value = e.target.value;
    setUserData(pre => ({ ...pre, [e.target.name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      let updatedUserData = {
        id: currentUser.userId,
        payload: { ...userData },
      };
      dispatch(editProfile(updatedUserData));

      dispatch(createCurrentUser({ currentUser: userData }));
      setTimeout(() => {
        onClose();
        toast.success("successfully updated");
        navigate("/my-profile/my-profile-info");
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
          <h2>Edit Profile</h2>
          <Grid container spacing={2}>
            <Grid item sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                onChange={handleChange}
                value={userData.firstName}
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item sm={6}>
              <TextField
                required
                fullWidth
                onChange={handleChange}
                value={userData.lastName}
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid
              item
              xs={12}
              row="true"
              aria-labelledby="demo-row-radio-buttons-group-label"
            >
              <Typography
                sx={{
                  marginRight: "1rem",
                  color: "navy",
                  display: "inline",
                  fontWeight: "semibold",
                }}
              >
                Gender:
              </Typography>
              <RadioGroup onChange={handleChange} value={userData.gender}>
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                  name="gender"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                  name="gender"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                  name="gender"
                />
              </RadioGroup>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChange}
                value={userData.email}
                type="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="phone"
                label="Phone Number"
                type="Phone Number"
                id="Phone Number"
                autoComplete="Phone Number"
                onChange={handleChange}
                value={userData.phone}
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

export default EditProfile;
