import {
  GET_BACKLOG,
  GET_INCIDENT_TASK,
  DELETE_INCIDENT_TASK
} from "../actions/types";

const initialState = {
  incident_tasks: [],
  incident_task: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_BACKLOG:
      return {
        ...state,
        incident_tasks: action.payload
      };

    case GET_INCIDENT_TASK:
      return {
        ...state,
        incident_task: action.payload
      };

    case DELETE_INCIDENT_TASK:
      return {
        ...state,
        incident_tasks: state.incident_tasks.filter(
          incident_task => incident_task.incidentSequence !== action.payload
        )
      };

    default:
      return state;
  }
}
