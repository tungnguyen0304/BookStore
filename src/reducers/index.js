import { combineReducers } from "redux";

import userRole from "./userRole";

const allReducers = combineReducers({
    userRole,
  // add more reducers here
});

export default allReducers