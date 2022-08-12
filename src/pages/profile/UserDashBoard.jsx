import { Card, Grid } from "@mui/material";
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./profile.css";

function UserDashBoard() {
  const { pathname } = useLocation();
  return (
    <Card
      sx={{
        height: "60vh",
        margin: "1rem 0",
        boxShadow: "0px 1px 4px 3px lightgray",
        borderRadius:'10px',
        width: "20vw",
      }}
    >
      <Grid
        sx={{
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          alt=""
          src="https://cdn.pixabay.com/photo/2017/01/10/03/54/avatar-1968236_960_720.png"
          className="userDashimage"
        />
        <h2>My Account</h2>
      </Grid>
      <Grid>
        <NavLink to="my-profile-info">
          <Grid
            className={
              pathname === "/my-profile/my-profile-info"
                ? "profileDashactive"
                : "ediprofileDashNavlink"
            }
          >
            {" "}
            My Profile
          </Grid>
        </NavLink>
        <NavLink to="my-addresses">
          <Grid
            className={
              pathname === "/my-profile/my-addresses"
                ? "profileDashactive"
                : "ediprofileDashNavlink"
            }
          >
            My Addresses
          </Grid>
        </NavLink>
      </Grid>
    </Card>
  );
}

export default UserDashBoard;
