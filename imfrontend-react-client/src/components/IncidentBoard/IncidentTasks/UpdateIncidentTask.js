import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";
import {
  getIncidentTask,
  updateIncidentTask
} from "../../../actions/backlogActions";
import PropTypes from "prop-types";

class UpdateIncidentTask extends Component {
  constructor() {
    super();

    this.state = {
      id: "",
      incidentSequence: "",
      summary: "",
      acceptanceCriteria: "",
      status: "",
      priority: "",
      dueDate: "",
      incidentIdentifier: "",
      create_At: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    const { backlog_id, it_id } = this.props.match.params;
    this.props.getIncidentTask(backlog_id, it_id, this.props.history);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    const {
      id,
      incidentSequence,
      summary,
      acceptanceCriteria,
      status,
      priority,
      dueDate,
      incidentIdentifier,
      create_At
    } = nextProps.incident_task;

    this.setState({
      id,
      incidentSequence,
      summary,
      acceptanceCriteria,
      status,
      priority,
      dueDate,
      incidentIdentifier,
      create_At
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const UpdateIncidentTask = {
      id: this.state.id,
      incidentSequence: this.state.incidentSequence,
      summary: this.state.summary,
      acceptanceCriteria: this.state.acceptanceCriteria,
      status: this.state.status,
      priority: this.state.priority,
      dueDate: this.state.dueDate,
      incidentIdentifier: this.state.incidentIdentifier,
      create_At: this.state.create_At
    };

    console.log(UpdateIncidentTask);
    this.props.updateIncidentTask(
      this.state.incidentIdentifier,
      this.state.incidentSequence,
      UpdateIncidentTask,
      this.props.history
    );
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="add-PBI">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link
                to={`/incidentBoard/${this.state.incidentIdentifier}`}
                className="btn btn-light"
              >
                Back to Incident Board
              </Link>
              <h4 className="display-4 text-center">Update Incident Task</h4>
              <p className="lead text-center">
                Incident Name: {this.state.incidentIdentifier} | Incident Task
                ID: {this.state.incidentSequence}{" "}
              </p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.summary
                    })}
                    name="summary"
                    placeholder="Incident Task summary"
                    value={this.state.summary}
                    onChange={this.onChange}
                  />
                  {errors.summary && (
                    <div className="invalid-feedback">{errors.summary}</div>
                  )}
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    placeholder="Acceptance Criteria"
                    name="acceptanceCriteria"
                    value={this.state.acceptanceCriteria}
                    onChange={this.onChange}
                  />
                </div>
                <h6>Due Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    name="dueDate"
                    value={this.state.dueDate}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <select
                    className="form-control form-control-lg"
                    name="priority"
                    value={this.state.priority}
                    onChange={this.onChange}
                  >
                    <option value={0}>Select Priority</option>
                    <option value={1}>High</option>
                    <option value={2}>Medium</option>
                    <option value={3}>Low</option>
                  </select>
                </div>

                <div className="form-group">
                  <select
                    className="form-control form-control-lg"
                    name="status"
                    value={this.state.status}
                    onChange={this.onChange}
                  >
                    <option value="">Select Status</option>
                    <option value="TO_DO">TO DO</option>
                    <option value="IN_PROGRESS">IN PROGRESS</option>
                    <option value="DONE">DONE</option>
                  </select>
                </div>

                <input
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UpdateIncidentTask.propTypes = {
  getIncidentTask: PropTypes.func.isRequired,
  incident_task: PropTypes.object.isRequired,
  updateIncidentTask: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  incident_task: state.backlog.incident_task,
  errors: state.errors
});

export default connect(mapStateToProps, {
  getIncidentTask,
  updateIncidentTask
})(UpdateIncidentTask);
