import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loadState } from "../storage";
import axios from "axios";
import { PREFIX } from "../../helpers/API";


export const JWT_ACCESS_PERSISTENT_STATE = 'access_token';
export const JWT_REFRESH_PERSISTENT_STATE = 'refresh_token';

const initialState = {
 access_token: loadState(JWT_ACCESS_PERSISTENT_STATE)?.access_token ?? null,
 refresh_token: loadState(JWT_REFRESH_PERSISTENT_STATE)?.refresh_token ?? null,
 registerErrorMessage: null,
 loginErrorMessage: null,
};

export const login = createAsyncThunk('users/login', async (values, { rejectWithValue }) => {
 try {
   const { data } = await axios.post(`${PREFIX}users/login/`, {
     email: values.email,
     password: values.password,
   });
   return data;
 } catch (e) {
   console.error("Login API error:", e.response?.data);
   return rejectWithValue(e.response?.data?.detail || 'Login failed');
 }
});




export function clearState() {
 localStorage.removeItem(JWT_ACCESS_PERSISTENT_STATE);
 localStorage.removeItem(JWT_REFRESH_PERSISTENT_STATE);
};
export const userSlice = createSlice({
 name: 'user',
 initialState,
 reducers: {
   logout: (state) => {
     state.access_token = null;
     state.refresh_token = null;
     clearState(); // Очищаем токены в localStorage
   },
   clearLoginError: (state) => {
     state.loginErrorMessage = undefined;
   },
   clearRegisterError: (state) => {
     state.registerErrorMessage = undefined;
   }
 },
 extraReducers: (builder) => {
  builder.addCase(login.fulfilled, (state, action) => {
   state.access_token = action.payload.access;
   state.refresh_token = action.payload.refresh;
   state.loginErrorMessage = null;
 });
 builder.addCase(login.rejected, (state, action) => {
   state.loginErrorMessage = action.payload || action.error.message;
 });
 }
});

export default userSlice.reducer;

export const userActions = userSlice.actions;
