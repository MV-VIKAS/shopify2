import React from "react";
import { useRoutes } from "react-router";

import Cart from "../pages/cart/Cart";
import Home from "../pages/home/Home";
import ProductDisplay from "../pages/productsDisplay/ProductDisplay";
import Checkout from "../pages/cart/ProductCheckout/Checkout";
import Myorder from "../pages/cart/Myorder";

import Maincategory from "../components/categories/Maincategory";
import Kids from "../components/categories/Kids";
import Women from "../components/categories/Women";
import Menpage from "../components/categories/Menpage";
import Electronics from "../components/categories/Electronics";
import Beauty from "../components/categories/Beauty";
import SelectAddress from "../pages/cart/ProductCheckout/SelectAddress";
import Wishlist from "../pages/wishlist/Wishlist";
import Profile from "./../pages/profile/Profile";
import Reset from "../pages/auth/users/Reset";

import AddressForm from "../pages/auth/users/AddressForm";

import ProfileInfo from "../pages/profile/ProfileInfo";
import MyAddresses from "../pages/profile/MyAddresses";
import EditAddress from "../pages/profile/EditAddress";
import PlaceOrder from "../pages/cart/ProductCheckout/PlaceOrder";
import SubCategory from "../components/categories/sub-category/SubCategory";
import SearchedProducts from "./../pages/searched-products/SearchedProducts";
const CustomRoutes = () => {
  let myRoutes = useRoutes([
    {
      path: "/Home",
      element: <Home />,
    },

    {
      path: "/reset",
      element: <Reset />,
    },
    {
      path: "/cart",
      element: <Cart />,
    },

    {
      path: "/checkout",
      element: <Checkout />,
    },

    {
      path: `/products_page/:id`,
      element: <ProductDisplay />,
    },

    {
      path: "/main-category",
      element: <Maincategory />,
    },
    {
      path: "/men",
      element: <Menpage />,
    },
    {
      path: "/women",
      element: <Women />,
    },
    {
      path: "/kids",
      element: <Kids />,
    },
    {
      path: "/electronics",
      element: <Electronics />,
    },
    {
      path: "/beauty_products",
      element: <Beauty />,
    },
    {
      path: "/wishlist",
      element: <Wishlist />,
    },
    {
      path: "/my-profile",
      element: <Profile />,
      children: [
        {
          path: "my-profile-info",
          element: <ProfileInfo />,
        },
        {
          path: "my-addresses",
          element: <MyAddresses />,
        },
      ],
    },
    {
      path: "/myorder",
      element: <Myorder />,
    },
    {
      path: "/selectaddress",
      element: <SelectAddress />,
    },

    {
      path: "/addressform",
      element: <AddressForm />,
    },
    {
      path: `/editaddress/:addressId`,
      element: <EditAddress />,
    },
    {
      path: "/place-order",
      element: <PlaceOrder />,
    },
    {
      path: "/sub-category/:subCat",
      element: <SubCategory />,
    },
    {
      path: "/search-products/:searchKey",
      element: <SearchedProducts />,
    },
  ]);
  return myRoutes;
};

export default CustomRoutes;
