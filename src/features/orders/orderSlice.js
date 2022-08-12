import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../apis/Axios";

const initialState = {
  currentOrderId: 0,
  orderList: [],
  error: "",
};

export const getOrderHistory = createAsyncThunk(
  "orders/getOrderHistory",
  userId => {
    return Axios.get(`/customers/${userId}/orders`);
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    getCurrentOrderId: (state, action) => {
      state.currentOrderId = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getOrderHistory.fulfilled, (state, action) => {
      state.orderList = action.payload.data.data;
    });
  },
});

export default orderSlice.reducer;
export const { getCurrentOrderId } = orderSlice.actions;
