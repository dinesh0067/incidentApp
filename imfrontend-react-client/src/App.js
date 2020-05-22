import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Layout/Header";
import Dashboard from "./components/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddIncident from "./components/Incident/AddIncident";
import UpdateIncident from "./components/Incident/UpdateIncident";
import { Provider } from "react-redux";
import store from "./store";
import IncidentBoard from "./components/IncidentBoard/IncidentBoard";
import AddIncidentTask from "./components/IncidentBoard/IncidentTasks/AddIncidentTask";
import UpdateIncidentTask from "./components/IncidentBoard/IncidentTasks/UpdateIncidentTask";
import Landing from "./components/Layout/Landing";
import Register from "./components/UserManagement/Register";
import Login from "./components/UserManagement/Login";

import jwt_decode from "jwt-decode";
import setJWTToken from "./securityUtils/setJWTToken";
import { SET_CURRENT_USER } from "./actions/types";
import { logout } from "./actions/securityActions";
import SecuredRoute from "./securityUtils/SecureRoute";

const jwtToken = localStorage.jwtToken;

if (jwtToken) {
  setJWTToken(jwtToken);
  const decoded_jwtToken = jwt_decode(jwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded_jwtToken
  });

  const currentTime = Date.now() / 1000;
  if (decoded_jwtToken.exp < currentTime) {
    store.dispatch(logout());
    window.location.href = "/";
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />

          {
            //Public Routes
          }

          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />

          {
            //Private Routes
          }
          <Switch>
            <SecuredRoute exact path="/dashboard" component={Dashboard} />
            <SecuredRoute exact path="/addIncident" component={AddIncident} />
            <SecuredRoute
              exact
              path="/updateIncident/:id"
              component={UpdateIncident}
            />
            <SecuredRoute
              exact
              path="/incidentBoard/:id"
              component={IncidentBoard}
            />
            <SecuredRoute
              exact
              path="/addIncidentTask/:id"
              component={AddIncidentTask}
            />
            <SecuredRoute
              exact
              path="/updateIncidentTask/:backlog_id/:it_id"
              component={UpdateIncidentTask}
            />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
