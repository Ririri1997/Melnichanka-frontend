import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 goodsData: [],
 sortDirection: "asc",
 activeColumn: "",
 loading: null,
 userName: "",
 selectedRows: [],
 searchCriteria: { flourName: '', brand: '' },
};

const goodsSlice = createSlice({
  name: "goods",
  initialState,
  reducers: {
   setGoodsData: (state, action) => {
      state.goodsData = action.payload;
    },
    setSortDirection: (state, action) => {
      state.sortDirection = action.payload;
    },
    setActiveColumn: (state, action) => {
      state.activeColumn = action.payload;
    },
    setLoading: (state, action) => {
      state.isModalOpen = action.payload;
    },
    setIsModalOpen: (state, action) => {
      state.cities = action.payload;
    },
    setUserName: (state, action) => {
      state.isModalOpen = action.payload;
    },
    setActiveStep: (state, action) => {
      state.activeStep = action.payload;
    },
    setCompleted: (state, action) => {
      state.completed = action.payload;
    },
    setSelectedRows: (state, action) => {
      state.selectedRows = action.payload;
    },
    setSearchCriteria: (state, action) => {
     state.searchCriteria = { ...state.searchCriteria, ...action.payload };
   },

  },
});

export const { 
 setClientsData, setSortDirection, setActiveColumn,
 setLoading, setCities, setSelectedRows, setIsModalOpen, setUserName,
 setNewClients, setSearchCity, setSearchName
} = goodsSlice.actions;

export default goodsSlice.reducer;
export const goodsActions = goodsSlice.actions;