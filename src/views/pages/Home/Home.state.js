export const INITIAL_STATE = {
 activeStep: 0,
 completed: [false, false, false, false],
 railwayStation: ''
};

export function homeReducer(state, action) {
 switch (action.type) {
  case "setActiveStep":
   return { ...state, activeStep: action.payload };
  case "setCompleted":
   return { ...state, completed: action.payload };
   case "setRailwayStation":
    return { ...state, railwayStation: action.payload };
  default:
   throw new Error();
 }
}