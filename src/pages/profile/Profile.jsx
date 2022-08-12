import React, { useState } from "react";

import "./profile.css";

import { Container } from "@mui/material";

import ProfileOutlet from "./ProfileOutlet";
import UserDashBoard from "./UserDashBoard";
const Profile = () => {
  return (
    <section>
      <Container sx={{ display: "flex", paddingY: "3rem" }}>
        <UserDashBoard />
        <ProfileOutlet />
      </Container>
    </section>
  );
};
export default Profile;
