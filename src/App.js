import React from "react";
import { Switch, Route } from "react-router-dom";
import EmployeeExplorer from "./components/EmployeeExplorer";
import EmployeeOverview from "./components/EmployeeOverview";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={EmployeeExplorer} />
        <Route path="/overview/:employeeName" component={EmployeeOverview} />
      </Switch>
    </div>
  );
}

export default App;
