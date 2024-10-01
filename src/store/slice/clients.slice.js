import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  clientsData: [],
  sortDirection: 'asc',
  activeColumn: 'destination_city',
  loading: true,
  cities: {},
  selectedRow: null,
  isModalOpen: false,
  userName: '',
  searchCriteria: { name: '', city: '' },
};

const clientSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    setClientsData: (state, action) => {
      state.clientsData = action.payload;
    },
    setSortDirection: (state, action) => {
      state.sortDirection = action.payload;
    },
    setActiveColumn: (state, action) => {
      state.activeColumn = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setCities: (state, action) => {
      state.cities = action.payload;
    },
    setSelectedRow: (state, action) => {
      state.selectedRow = action.payload;
    },
    setIsModalOpen: (state, action) => {
      state.isModalOpen = action.payload;
    },
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    setNewClients: (state) => {
      state.selectedRow = false;
      state.isModalOpen = true
    },
    setNewClientModal: (state) => {
      state.selectedRow = null;
      state.isModalOpen = true;
    },
    setSearchCriteria: (state, action) => {
     state.searchCriteria = { ...state.searchCriteria, ...action.payload };
   },

  },
});

export const { 
 setClientsData, setSortDirection, setActiveColumn,
 setLoading, setCities, setSelectedRow, setIsModalOpen, setUserName,
 setNewClients, setSearchCity, setSearchName
} = clientSlice.actions;

export default clientSlice.reducer;
export const clientsActions = clientSlice.actions;