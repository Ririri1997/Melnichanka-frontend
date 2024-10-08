import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeStep: 0,
  completed: Array(4).fill(false), // Массив для 4 шагов
  // selectedGoods: [],
  // selectedClients: null,
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setActiveStep: (state, action) => {
      state.activeStep = action.payload;
    },
    setCompleted: (state, action) => {
      state.completed = action.payload;
    },
  },
});

export const { 
  setActiveStep, setCompleted
} = homeSlice.actions;

export default homeSlice.reducer;
export const homeActions = homeSlice.actions;