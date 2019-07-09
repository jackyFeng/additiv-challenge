const axios = require("axios");

export const getEmployeeDetails = async employeeName => {
  const response = await axios.get(
    `http://api.additivasia.io/api/v1/assignment/employees/${employeeName}`
  );
  return response.data;
};
