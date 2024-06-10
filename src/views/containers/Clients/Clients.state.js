export const INITIAL_STATE = {
 clientsData: [],
 sortDirection: 'asc',
 activeColumn: 'destination_city',
 loading: true,
 cities: {},
 selectedRow: null,
 isModalOpen: false,
 userName: '',
 searchName: '',
 searchCity: '',
};

export function clientsReducer(state, action) {
 switch (action.type) {
   case 'setClientsData':
     return { ...state, clientsData: action.payload };
   case 'setSortDirection':
     return { ...state, sortDirection: action.payload };
   case 'setActiveColumn':
     return { ...state, activeColumn: action.payload };
   case 'setLoading':
     return { ...state, loading: action.payload };
   case 'setCities':
     return { ...state, cities: action.payload };
   case 'setSelectedRow':
     return { ...state, selectedRow: action.payload };
   case 'setIsModalOpen':
     return { ...state, isModalOpen: action.payload };
   case 'setUserName':
     return { ...state, userName: action.payload };
   case 'setNewClients':
    return { ...state, isModalOpen: true, selectedRow: false };
   
    case 'setSearchCity':
      return { ...state, searchCity: action.payload };
    case 'setSearchName':
      return { ...state, searchName: action.payload };
      default:
     throw new Error();
 }
}