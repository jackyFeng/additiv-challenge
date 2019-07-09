import React, { useEffect, useState } from "react";

import Title from "./Title";
import { getEmployeeDetails } from "../api/employeeApi";

const EmployeeOverview = ({ match }) => {
  const { employeeName } = match.params;
  const [subordinates, setSubordinates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    function* getSubordinates(employeeNames) {
      yield Promise.all(
        employeeNames.map(employeeName => getEmployeeDetails(employeeName))
      ).then(data => data.flatMap(eachData => retrieveSubordinates(eachData)));
    }

    function getAllSubordinates(employeeNames, allSubordinates = []) {
      const subordinatesGen = getSubordinates(employeeNames);
      const next = subordinatesGen.next();
      next.value
        .then(subordinates => {
          if (subordinates.length > 0) {
            getAllSubordinates(
              subordinates,
              allSubordinates.concat(subordinates)
            );
          } else {
            setIsLoading(false);
            const distinctSubordinates = new Set(allSubordinates);
            setSubordinates([...distinctSubordinates]); // convert Set to array
          }
        })
        .catch(err => {
          setIsLoading(false);
          setIsError(true);
        });
    }

    getAllSubordinates([employeeName]);
  }, [employeeName]); // tells Hooks stop running effect if it is the same employee

  function retrieveSubordinates(data) {
    let [, directSubordinates] = data;
    return (
      (directSubordinates && directSubordinates["direct-subordinates"]) || []
    );
  }

  function renderSubordinates() {
    if (isError) {
      return <div className="error-msg">Employee is not existed</div>;
    }

    if (isLoading) {
      return <div>Loading...</div>;
    } else {
      return !!subordinates.length ? (
        subordinates.map(subordinate => (
          <div key={subordinate}> {subordinate} </div>
        ))
      ) : (
        <div>No Direct Ordinate</div>
      );
    }
  }

  return (
    <div className="container">
      <Title title="Employee Overview" />
      <div className="employee-overview">
        <div className="employee-overview__title">
          {" "}
          Subordinates of employee {employeeName}:
        </div>
        <div className="employee-overview__subordinates">
          {renderSubordinates()}
        </div>
      </div>
    </div>
  );
};

export default EmployeeOverview;
