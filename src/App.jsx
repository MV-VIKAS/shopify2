import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
// import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import CustomRoutes from "./routes/CustomRoutes";
import AOS from "aos";
import "aos/dist/aos.css";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/footer/Footer";
import PersistentLogin from "./components/PersistentLogin/PersistentLogin";
import { useSelector, useDispatch } from "react-redux";

import CustomRoutes2 from "./routes/CustomRoutes2";
import { fetchProducts } from "./features/products/productSlice";

const App = () => {
  let currentUser = useSelector(state => state.user.currentUser);
  let dispatch = useDispatch();
  useEffect(() => {
    if (currentUser?.role?.includes("CUSTOMER")) {
      dispatch(fetchProducts());
    }
  }, []);
  AOS.init({ once: true });

  return (
    <div>
      
      <Router>
        <ToastContainer />
        <PersistentLogin>
          <Navbar />

          <CustomRoutes2 />

          <CustomRoutes />
        </PersistentLogin>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
