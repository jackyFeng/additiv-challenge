const axios = require('axios');

export const getSubordinates = async (employeeName) => {
    try {
        const response = await axios.get(`http://api.additivasia.io/api/v1/assignment/employees/${employeeName}`);
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}