import React, { useEffect, useState } from 'react';

import { getSubordinates } from '../api/employeeApi';


const EmployeeOverview = ({location}) => {
  console.log(location);
  const { state } = location;
  const [subordinates, setSubordinates] = useState([]);

  useEffect(() => {
    getSubordinates(state.employee).then(data => {
      console.log(data);
      const directSubordinates = data[1]['direct-subordinates'];
      setSubordinates(directSubordinates);
    })
  }, [state.employee]); // tells Hooks stop running effect if it is the same employee

  return (
    <div className="container">
      <header className="header">
        <h5> Employee Overview </h5>
      </header>
      <div>
        <h5> Subordinates of employee {state.employee}:</h5>
        <ul>
          {
            subordinates && subordinates.map(subordinate => <li key={subordinate}> {subordinate} </li>)
          }
        </ul>
      </div>
    </div>
  )
}

export default EmployeeOverview;