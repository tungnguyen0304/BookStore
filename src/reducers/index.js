import { combineReducers } from "redux";

import userRole from "./userRole";
// import cart from "./cart";

const allReducers = combineReducers({
    userRole,
    // cart
  // add more reducers here
});

export default allReducers