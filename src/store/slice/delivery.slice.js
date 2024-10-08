import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { PREFIX } from "../../helpers/API";
import { getAccessToken } from "../../utils/authService";

const initialState = {
 factories: [],
 isFormReadyToSubmit: false,
 loading: false,
 error: null,
 deliveryInfo: {},
 deliveryCost: 0,
 inputFullAddress: "",
 factoryId: null,
 deliveryType: "self",
};
// Async action для получения данных с фабрик
export const fetchFactories = createAsyncThunk(
 "delivery/fetchFactories",
 async (_, { rejectWithValue }) => {
  const accessToken = getAccessToken();
  if (!accessToken) {
   return rejectWithValue("No access token available");
  }
  try {
   const response = await axios.get(`${PREFIX}logistics/factories/`, {
    headers: {
     Authorization: `Bearer ${accessToken}`,
     "Content-Type": "application/json",
    },
   });
   return response.data;
  } catch (error) {
   if (error.response && error.response.status === 401) {
    return rejectWithValue("Unauthorized");
   }
   return rejectWithValue(error.message);
  }
 }
);

const deliverySlice = createSlice({
 name: "delivery",
 initialState,
 reducers: {
  setIsFormReadyToSubmit: (state, action) => {
   state.isFormReadyToSubmit = action.payload;
  },
  setDeliveryType: (state, action) => {
   state.deliveryType = action.payload;
  },
  setDeliveryInfo: (state, action) => {
   state.deliveryInfo = action.payload;
  },
  setDeliveryCost: (state, action) => {
   state.deliveryCost = action.payload;
  },
  setInputAddress: (state, action) => {
   state.inputFullAddress = action.payload;
  },
  setFactoryId: (state, action) => {
   state.factoryId = action.payload;
  },
 },
 extraReducers: (builder) => {
  builder
   .addCase(fetchFactories.pending, (state) => {
    state.loading = true;
    state.error = null;
   })
   .addCase(fetchFactories.fulfilled, (state, action) => {
    state.factories = action.payload;
    state.loading = false;
   })
   .addCase(fetchFactories.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload || "Error fetching factories";
   });
 },
});

export const {
 setIsFormReadyToSubmit,
 setDeliveryInfo,
 setDeliveryCost,
 setInputAddress,
 setFactoryId,
 setDeliveryType,
} = deliverySlice.actions;
export default deliverySlice.reducer;
export const deliveryActions = deliverySlice.actions;