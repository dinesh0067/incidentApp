import React, { Component } from "react";
import { Link } from "react-router-dom";
import { deleteIncidentTask } from "../../../actions/backlogActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
class IncidentTask extends Component {
  onDeleteClick(backlog_id, it_id) {
    this.props.deleteIncidentTask(backlog_id, it_id);
  }
  render() {
    const { incident_task } = this.props;

    let priorityString;
    let priorityClass;

    if (incident_task.priority === 1) {
      priorityClass = "bg-danger text-light";
      priorityString = "HIGH";
    }

    if (incident_task.priority === 2) {
      priorityClass = "bg-warning text-light";
      priorityString = "MEDIUM";
    }

    if (incident_task.priority === 3) {
      priorityClass = "bg-info text-light";
      priorityString = "LOW";
    }
    return (
      <div className="card mb-1 bg-light">
        <div className={`card-header text-primary ${priorityClass}`}>
          ID: {incident_task.incidentSequence} -- Priority:{priorityString}
          {incident_task.priority}
        </div>
        <div className="card-body bg-light">
          <h5 className="card-title">incident_task.summary</h5>
          <p className="card-text text-truncate ">
            {incident_task.acceptanceCriteria}
          </p>
          <Link
            to={`/updateIncidentTask/${incident_task.incidentIdentifier}/${incident_task.incidentSequence}`}
            className="btn btn-primary"
          >
            View / Update
          </Link>

          <button
            className="btn btn-danger ml-4"
            onClick={this.onDeleteClick.bind(
              this,
              incident_task.incidentIdentifier,
              incident_task.incidentSequence
            )}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}
IncidentTask.propTypes = {
  deleteIncidentTask: PropTypes.func.isRequired
};
export default connect(null, { deleteIncidentTask })(IncidentTask);
