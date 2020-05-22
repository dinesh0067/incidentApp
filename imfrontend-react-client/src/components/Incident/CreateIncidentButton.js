import React from "react";
import { Link } from "react-router-dom";

const CreateIncidentButton = () => {
  return (
    <React.Fragment>
      <Link to="/addIncident" className="btn btn-lg btn-info">
        Create a Incident
      </Link>
    </React.Fragment>
  );
};

export default CreateIncidentButton;
