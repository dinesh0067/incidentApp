import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import incidentReducer from "./incidentReducer";
import backlogReducer from "./backlogReducer";
import securityReducer from "./securityReducer";

export default combineReducers({
  errors: errorReducer,
  incident: incidentReducer,
  backlog: backlogReducer,
  security: securityReducer
});
