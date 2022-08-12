// In this page called right contains the right part of the Profile

import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import { Button, Avatar } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useSelector } from "react-redux";

import "./right.css";
import EditProfile from "./EditProfile";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const ProfileInfo = () => {
  const [openeditprofile, setOpeneditprofile] = useState(false);

  const handleClose = value => {
    setOpeneditprofile(false);
  };

  let currUser = useSelector(state => state.user.currentUser);
  let { firstName, lastName, gender, email, phone } = currUser;
  return (
    <>
      {openeditprofile && (
        <EditProfile open={openeditprofile} onClose={handleClose} />
      )}
      <section className="myprofileOutlet">
        <div className="r1">
          <h1>
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar>{firstName.slice(0, 1)}</Avatar>
            </StyledBadge>
            <span>{firstName}</span>
          </h1>
          <Button
            sx={{ textTransform: "capitalize", fontWeight: "600" }}
            variant="contained"
            onClick={() => setOpeneditprofile(true)}
          >
            Edit Profile &nbsp; <ModeEditIcon />
          </Button>
        </div>
        <div className="r2">
          <table>
            <thead>
              <tr>
                <th>FirstName</th>
                <th>LastName</th>
                <th>Email</th>
                <th>Phone</th>

                <th>Gender</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{`${firstName}`}</td>
                <td>{`${lastName}`}</td>
                <td>{`${email}`}</td>
                <td>{`${phone}`}</td>
                <td>{`${gender}`}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default ProfileInfo;
