import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../apis/Axios";

const initialState = {
  wishList: [],
  error: "",
};

export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async ({ userId, payload }) => {
    await Axios.post(`/customers/${userId}/wishlist`, payload);
    return { payload };
  }
);

export const getAllWishlist = createAsyncThunk(
  "wishlist/getAllWishlist",
  async ({ userId }) => {
    return fetch(
      `http://localhost:8080/shopping-kart-ty-api-0.0.1-SNAPSHOT/customers/${userId}/wishlist`
    ).then(res => res.json());
  }
);

export const deleteFromWishlist = createAsyncThunk(
  "wishlist/deleteFromWishlist",
  async ({ userId, wishlistId }) => {
    await Axios.delete(`/customers/${userId}/wishlist/${wishlistId}`);
    return { wishlistId };
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  extraReducers: builder => {
    builder.addCase(addToWishlist.fulfilled, (state, action) => {
      state.wishList.push(action.payload.payload);
    });
    builder.addCase(addToWishlist.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(deleteFromWishlist.fulfilled, (state, action) => {
      let index = state.wishList.findIndex(
        ({ productId }) => productId == action.payload.wishlistId
      );
      state.wishList.splice(index, 1);
    });
    builder.addCase(deleteFromWishlist.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(getAllWishlist.fulfilled, (state, action) => {
      state.wishList = action.payload.data;
    });
    builder.addCase(getAllWishlist.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export default wishlistSlice.reducer;
