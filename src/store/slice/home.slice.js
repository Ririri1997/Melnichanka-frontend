import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeStep: 0,
  completed: Array(4).fill(false), // Массив для 4 шагов
  selectedGoods: [],
  selectedClients: null,
  deliveryInfo: {},
  deliveryCost: 0,
  inputFullAddress: '',
  factoryId: null,
  deliveryType: 'self'
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
    setSelectedClients: (state, action) => {
      state.selectedClients = action.payload;
    },
    setSelectedGoods: (state, action) => {
      // Предотвращаем дублирование товаров
      if (!state.selectedGoods.some(good => good.id === action.payload.id)) {
        state.selectedGoods.push(action.payload);
      }
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
    setDeliveryType: (state, action) => {
      state.deliveryType = action.payload;
    },
  },
});

export const { 
  setActiveStep, setCompleted, setSelectedClients, setSelectedGoods, 
  setDeliveryInfo, setDeliveryCost, setInputAddress, setFactoryId, 
  setDeliveryType,  
} = homeSlice.actions;

export default homeSlice.reducer;
export const homeActions = homeSlice.actions;