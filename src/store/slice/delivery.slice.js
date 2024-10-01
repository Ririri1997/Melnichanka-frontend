import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { PREFIX } from "../../helpers/API";
import { getAccessToken } from "../../utils/authService";

// Async action для получения данных с фабрик
export const fetchFactories = createAsyncThunk(
  'delivery/fetchFactories',
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
  name: 'delivery',
  initialState: {
    factories: [],
    isFormReadyToSubmit: false,
    loading: false,
    error: null
  },
  reducers: {
    setIsFormReadyToSubmit: (state, action) => {
      state.isFormReadyToSubmit = action.payload;
    }
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
  }
});

export const { setIsFormReadyToSubmit } = deliverySlice.actions;
export default deliverySlice.reducer;
