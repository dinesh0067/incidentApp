import React, { Component } from "react";

import IncidentItem from "./Incident/IncidentItem";
import CreateIncidentButton from "./Incident/CreateIncidentButton";
import { connect } from "react-redux";
import { getIncidents } from "../actions/incidentActions";
import PropTypes from "prop-types";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getIncidents();
  }
  render() {
    const { incidents } = this.props.incident;
    return (
      <div className="incidents">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Incidents</h1>
              <br />
              <CreateIncidentButton />

              <br />
              <hr />
              {incidents.map(incident => (
                <IncidentItem key={incident.id} incident={incident} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  incident: PropTypes.object.isRequired,
  getIncidents: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  incident: state.incident
});

export default connect(mapStateToProps, { getIncidents })(Dashboard);
