const connection = require('../config/db');
const selectAll = (sortby, sort, searchingId, searchingName) => {
  let searching = '';

  if (searchingId && searchingName) {
    searching = `WHERE Id= ${searchingId} AND nama = ${searchingName}`;
  } else if (searchingId) {
    searching = `WHERE Id= ${searchingId}`;
  } else if (searchingName) {
    searching = `WHERE namaLIKE '%${searchingName}%'`;
  }

  return new Promise((resolve, reject) =>
    connection.query(`SELECT * FROM supplier ${searching} ORDER BY ${sortby} ${sort} `, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};


const newSupplier = (Nama, Alamat) => {
  return new Promise((resolve, reject) =>
   connection.query(
      `INSERT INTO supplier (Nama, Alamat) VALUES ('${Nama}','${Alamat}')`,
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



const updateSupplier = (Nama, Alamat, ID) => {
  return new Promise((resolve, reject) =>
   connection.query(
      `UPDATE supplier SET Nama = '${Nama}', Alamat = '${Alamat}' WHERE ID  = ${ID}`,
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


const deleteSupplier = ( ID) => {
  return new Promise((resolve, reject) =>
   connection.query(
      `DELETE FROM supplier WHERE ID = ${ID}`,
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
  newSupplier,
  updateSupplier,
  deleteSupplier,
};
