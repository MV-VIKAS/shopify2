import React, { useEffect } from "react";
import Axios from "../../apis/Axios";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Spinner from "../spinner/Spinner";
import {
  BrowserRouter,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { createCurrentUser } from "../../features/User/userSlice";


const PersistentLogin = ({ children }) => {
  let { pathname } = useLocation();
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  let currentUser = useSelector(state => state.user.currentUser);
  let dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const getUser = () => {
    setUser(JSON.parse(localStorage.getItem("user")));
  };
  useEffect(() => {
    // getNewToken();
    // getUser();
    if (localStorage.getItem("user") !== undefined) {
      let currentUser = JSON.parse(localStorage.getItem("user"));
      // console.log(currentUser);
      dispatch(createCurrentUser({ currentUser }));
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Spinner />
      </div>
    );
  } else {
    return <>{children}</>;
  }
};

export default PersistentLogin;
