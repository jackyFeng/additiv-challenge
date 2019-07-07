import React, { useEffect, useState } from 'react';

import Title from './Title';
import { getSubordinates } from '../api/employeeApi';

const EmployeeOverview = ({match}) => {
  
  const employeeName = match.params.employeeName;
  const [subordinates, setSubordinates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  console.log(isError);

  useEffect(() => {
    getSubordinates(employeeName).then(data => {
      setIsLoading(false);
      let [ , directSubordinates] = data;
      directSubordinates = (directSubordinates && directSubordinates['direct-subordinates']) || [];
      setSubordinates(directSubordinates);
    }).catch(err => {
      setIsLoading(false);
      setIsError(true);
    })
  }, [employeeName]); // tells Hooks stop running effect if it is the same employee

  function renderSubordinates() {
    if (isError) {
      return <div>Error getting subordinates</div>;
    }

    if (isLoading) {
      return <div></div>;
    } else {
      return !!subordinates.length ? subordinates.map(subordinate => <div key={subordinate}> {subordinate} </div>) : <div>No Direct Ordinate</div>;
    }
  }

  return (
    <div className="container">
      <Title title='Employee Overview' />
      <div className="employee-overview">
        <div className="employee-overview__title"> Subordinates of employee {employeeName}:</div>
        <div className="employee-overview__subordinates">
          {
            renderSubordinates()
          }
        </div>
      </div>
    </div>
  )
}

export default EmployeeOverview;