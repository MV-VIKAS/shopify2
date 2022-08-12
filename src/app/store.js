import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../features/cart/cartSlice";
import LoginSlice from "../features/Login/LoginSlice";
import productSlice from "../features/products/productSlice";
import userSlice from "../features/User/userSlice";
import wishlistSlice from "../features/wishlist/wishlistSlice";
import addressSlice from "../features/address/addressSlice";
import orderSlice from "./../features/orders/orderSlice";

const store = configureStore({
  reducer: {
    product: productSlice,
    cart: cartSlice,
    Login: LoginSlice,
    wishlist: wishlistSlice,
    user: userSlice,
    address: addressSlice,
    orders: orderSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
