import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../apis/Axios";
import { toast } from "react-toastify";

const initialState = {
  addressList: [],
  error: "",
};

export const fetchAddress = createAsyncThunk(
  "address/fetchAddress",
  async customerid => {
    return fetch(
      `http://localhost:8080/shopping-kart-ty-api-0.0.1-SNAPSHOT/customers/${customerid}/address`
    )
      .then(data => data.json())
      .then(finalData => finalData)
      .catch(err => err);
  }
);

export const deleteAddress = createAsyncThunk(
  "address/deleteAddress",
  async obj => {
    // let permit = window.confirm("Are you sure you want to delete Address");

    try {
      let { userId, addressId } = obj;
      // if (permit) {
        await Axios.delete(`customers/${userId}/address/${addressId}`);
        toast.success("Address deleted successfully");
        return { addressId };
      // }
    } catch (err) {
      toast.error(err.message);
    }
  }
);

export const editAddress = createAsyncThunk(
  "address/editAddress",
  async obj1 => {
    let { userId, addressId, currPayload } = obj1;
    await Axios.put(`customers/${userId}/address/${addressId}`, currPayload);
    return { addressId, currPayload };
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState,
  extraReducers: {
    [fetchAddress.fulfilled]: (state, action) => {
      state.addressList = action.payload.data;
    },
    [fetchAddress.rejected]: (state, action) => {
      state.error = action.error.message;
    },
    [deleteAddress.fulfilled]: (state, action) => {
      let index = state.addressList.findIndex(
        ({ addressId }) => addressId == action.payload.addressId
      );
      state.addressList.splice(index, 1);
    },
    [deleteAddress.rejected]: (state, action) => {
      state.error = action.error.message;
    },
    [editAddress.fulfilled]: (state, action) => {
      let index = state.addressList.findIndex(
        v => v.addressId == action.payload.addressId
      );
      state.addressList.splice(index, 1, action.payload.currPayload);
    },
    [editAddress.rejected]: (state, action) => {
      state.error = action.error.message;

      console.log(action.payload.data.message);
    },
    [deleteAddress.rejected]: (state, action) => {
      console.log(action.payload.data.message);
    },
  },
});

export default addressSlice.reducer;
