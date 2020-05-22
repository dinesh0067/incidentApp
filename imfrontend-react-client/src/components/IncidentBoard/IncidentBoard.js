import React, { Component } from "react";
import { Link } from "react-router-dom";
import Backlog from "./Backlog";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getBacklog } from "../../actions/backlogActions";

class IncidentBoard extends Component {
  //constructor to handle errors
  constructor() {
    super();
    this.state = {
      errors: {}
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getBacklog(id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { id } = this.props.match.params;
    const { incident_tasks } = this.props.backlog;
    const { errors } = this.state;

    let BoardContent;

    const boardAlgorithm = (errors, incident_tasks) => {
      if (incident_tasks.length < 1) {
        if (errors.incidentNotFound) {
          return (
            <div className="alert alert-danger text-center" role="alert">
              {errors.incidentNotFound}
            </div>
          );
        } else if (errors.incidentIdentifier) {
          return (
            <div className="alert alert-danger text-center" role="alert">
              {errors.incidentIdentifier}
            </div>
          );
        } else {
          return (
            <div className="alert alert-info text-center" role="alert">
              No Incident Tasks on this board
            </div>
          );
        }
      } else {
        return <Backlog incident_tasks_prop={incident_tasks} />;
      }
    };

    BoardContent = boardAlgorithm(errors, incident_tasks);
    return (
      <div className="container">
        <Link to={`/addIncidentTask/${id}`} className="btn btn-primary mb-3">
          <i className="fas fa-plus-circle"> Create Incident Task</i>
        </Link>
        <br />
        <hr />
        {BoardContent}
      </div>
    );
  }
}

IncidentBoard.propTypes = {
  backlog: PropTypes.object.isRequired,
  getBacklog: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  backlog: state.backlog,
  errors: state.errors
});

export default connect(mapStateToProps, { getBacklog })(IncidentBoard);
