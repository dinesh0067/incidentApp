import axios from "axios";
import {
  GET_ERRORS,
  GET_INCIDENTS,
  GET_INCIDENT,
  DELETE_INCIDENT
} from "./types";

export const createIncident = (incident, history) => async dispatch => {
  try {
    await axios.post("/api/incident", incident);
    history.push("/dashboard");
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const getIncidents = () => async dispatch => {
  const res = await axios.get("/api/incident/all");
  dispatch({
    type: GET_INCIDENTS,
    payload: res.data
  });
};

export const getIncident = (id, history) => async dispatch => {
  try {
    const res = await axios.get(`/api/incident/${id}`);
    dispatch({
      type: GET_INCIDENT,
      payload: res.data
    });
  } catch (error) {
    history.push("/dashboard");
  }
};
export const deleteIncident = id => async dispatch => {
  if (
    window.confirm(
      "Are you sure? This will delete the incident and all the data related to it"
    )
  ) {
    await axios.delete(`/api/incident/${id}`);
    dispatch({
      type: DELETE_INCIDENT,
      payload: id
    });
  }
};
