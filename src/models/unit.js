const connection = require('../config/db');
const selectAll = (sortby, sort, searchingId, searchingName) => {
  let searching = '';

  if (searchingId && searchingName) {
    searching = `WHERE unitId= ${searchingId} AND nameUnit = ${searchingName}`;
  } else if (searchingId) {
    searching = `WHERE unitId= ${searchingId}`;
  } else if (searchingName) {
    searching = `WHERE nameUnit LIKE '%${searchingName}%'`;
  }

  return new Promise((resolve, reject) =>
    connection.query(`SELECT * FROM unit ${searching} ORDER BY ${sortby} ${sort} `, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};


const newUnit = (unitId, nameUnit) => {
  return new Promise((resolve, reject) =>
   connection.query(
      `INSERT INTO unit (unitId, nameUnit) VALUES ('${unitId}','${nameUnit}')`,
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    )
  );
};

const updateUnit = (unitId, nameUnit) => {
  return new Promise((resolve, reject) =>
   connection.query(
      `UPDATE unit SET  nameUnit = '${nameUnit}' WHERE unitId = ${unitId}`,
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    )
  );
};


const deleteUnit = ( unitId) => {
  return new Promise((resolve, reject) =>
   connection.query(
      `DELETE FROM unit WHERE unitId = ${unitId}`,
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    )
  );
};


module.exports = {
  selectAll,
  newUnit,
  updateUnit,
  deleteUnit,
};
