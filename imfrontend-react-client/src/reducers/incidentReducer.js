import { GET_INCIDENTS, GET_INCIDENT, DELETE_INCIDENT } from "../actions/types";

const initialState = {
  incidents: [],
  incident: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_INCIDENTS:
      return {
        ...state,
        incidents: action.payload
      };
    case GET_INCIDENT:
      return {
        ...state,
        incident: action.payload
      };
    case DELETE_INCIDENT:
      return {
        ...state,
        incidents: state.incidents.filter(
          incident => incident.incidentIdentifier !== action.payload
        )
      };
    default:
      return state;
  }
}
