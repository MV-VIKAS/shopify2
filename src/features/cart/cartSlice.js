import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../apis/Axios";

const initialState = {
  cartItems: [],
  error: "",
  cartTotal: "",
};

export const addToCart = createAsyncThunk("cart/addToCart", data => {
  let { payload } = data;
  Axios.post(`/customers/${data.userId}/carts`, data.payload);
  return { payload };
});

export const getCart = createAsyncThunk("cart/getCart", userId => {
  return fetch(
    `http://localhost:8080/shopping-kart-ty-api-0.0.1-SNAPSHOT/customers/${userId}/carts`
  ).then(res => res.json());
});
export const deleteFromCart = createAsyncThunk(
  "cart/deleteFromCart",
  payload => {
    Axios.delete(`/customers/${payload.userId}/carts/${payload.cartid}`);
    return { payload };
  }
);
export const updateCart = createAsyncThunk("cart/updateCart", payload => {
  Axios.put(
    `/customers/${payload.userId}/carts/${payload.itemid}`,
    payload.data
  );
  return { payload };
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    getCartTotal: (state, action) => {
      state.cartTotal = state.cartItems?.reduce(
        (acc, item) => acc + item.cost * item.quantity,
        0
      );
    },
  },
  extraReducers: builder => {
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.cartItems.push(action.payload.payload);
    });
    builder.addCase(getCart.fulfilled, (state, action) => {
      state.cartItems = action.payload.data;
    });
    // builder.addCase(getCart.rejected, (state, action) => {
    //   state.error = action.payload.data;
    // });

    // builder.addCase(updateCart.fulfilled, (state, action) => {
    //   let index = state.cartItems.findIndex(
    //     v => v.itemId == action.payload.payload.itemid
    //   );
    //   state.addressList.splice(index, 1, action.payload.payload.data);
    // });

    builder.addCase(deleteFromCart.fulfilled, (state, action) => {
      let index = state.cartItems.findIndex(
        v => v.productId == action.payload.cartid
      );
      state.cartItems.splice(index, 1);
    });
    builder.addCase(deleteFromCart.rejected, (state, action) => {
      state.error = action.payload.data;
    });
  },
});

export default cartSlice.reducer;
export const { getCartTotal, getCartCount } = cartSlice.actions;
