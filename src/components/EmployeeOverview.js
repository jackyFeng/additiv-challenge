import React, { useEffect, useState } from "react";

import Title from "./Title";
import { getSubordinates } from "../api/employeeApi";

const EmployeeOverview = ({ match }) => {
  const { employeeName } = match.params;
  const [subordinates, setSubordinates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function getDirectandIndirectSubordinates(employeeName) {
      let indirectSubordiantes = [];
      let data = await getSubordinates(employeeName);
      const directSubordinates = retrieveSubordinates(data);
      if (directSubordinates.length > 0) {
        const data = await Promise.all(
          directSubordinates.map(subordinate => getSubordinates(subordinate))
        );
        indirectSubordiantes = data.flatMap(eachData =>
          retrieveSubordinates(eachData)
        );
      }
      return new Set(directSubordinates.concat(indirectSubordiantes)); // use Set to remove duplicates
    }

    getDirectandIndirectSubordinates(employeeName)
      .then(data => {
        setIsLoading(false);
        setSubordinates([...data]); // convert Set to array
      })
      .catch(err => {
        setIsLoading(false);
        setIsError(true);
      });
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
      return <div />;
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
