import axios from "axios";
import {
  GET_ERRORS,
  GET_BACKLOG,
  GET_INCIDENT_TASK,
  DELETE_INCIDENT_TASK
} from "./types";

export const addIncidentTask = (
  backlog_id,
  incident_task,
  history
) => async dispatch => {
  try {
    await axios.post(`/api/backlog/${backlog_id}`, incident_task);
    history.push(`/incidentBoard/${backlog_id}`);
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

export const getBacklog = backlog_id => async dispatch => {
  try {
    const res = await axios.get(`/api/backlog/${backlog_id}`);
    dispatch({
      type: GET_BACKLOG,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};
export const getIncidentTask = (
  backlog_id,
  it_id,
  history
) => async dispatch => {
  try {
    const res = await axios.get(`/api/backlog/${backlog_id}/${it_id}`);
    dispatch({
      type: GET_INCIDENT_TASK,
      payload: res.data
    });
  } catch (err) {
    history.push("/dashboard");
  }
};

export const updateIncidentTask = (
  backlog_id,
  pt_id,
  incident_task,
  history
) => async dispatch => {
  try {
    await axios.patch(`/api/backlog/${backlog_id}/${pt_id}`, incident_task);
    history.push(`/incidentBoard/${backlog_id}`);
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

export const deleteIncidentTask = (backlog_id, it_id) => async dispatch => {
  if (
    window.confirm(
      `You are deleting incident task ${it_id}, this action cannot be undone`
    )
  ) {
    await axios.delete(`/api/backlog/${backlog_id}/${it_id}`);
    dispatch({
      type: DELETE_INCIDENT_TASK,
      payload: it_id
    });
  }
};
