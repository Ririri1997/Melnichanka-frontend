
export const INITIAL_STATE = {
  goodsData: [],
  sortDirection: "asc",
  activeColumn: "",
  searchFlourName: "",
  searchBrand: "",
  selectedRows: [],
};

export function clientsReducer(state, action) {
  switch (action.type) {
    case "setGoodsData":
      return { ...state, goodsData: action.payload };
    case "setSortDirection":
      return { ...state, sortDirection: action.payload };
    case "setActiveColumn":
      return { ...state, activeColumn: action.payload };
    case "setLoading":
      return { ...state, loading: action.payload };
    case "setIsModalOpen":
      return { ...state, isModalOpen: action.payload };
    case "setUserName":
      return { ...state, userName: action.payload };
    case "setActiveStep":
      return { ...state, activeStep: action.payload };
    case "setCompleted":
      return { ...state, completed: action.payload };
    case "setSearchFlourName":
      return { ...state, searchFlourName: action.payload };
    case "setSearchBrand":
      return { ...state, searchBrand: action.payload };
    case "setSelectedRows":
      return { ...state, selectedRows: action.payload };
    case "setDeliveryType":
      return {
        ...INITIAL_STATE,
        factories: state.factories,
        deliveryType: action.payload,
      };
    default:
      throw new Error();
  }
}