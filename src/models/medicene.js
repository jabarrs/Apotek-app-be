const koneksi = require('../config/db');

const getMedicine = () => {
  return new Promise((resolve, reject) =>
    koneksi.query('SELECT * FROM medicene', (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

const getDetailMedicene = (sorting, sort) => {
  return new Promise((resolve, reject) =>
    koneksi.query(`SELECT * FROM medicene ORDER BY ${sort} ${sorting}`, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};
const getDetailMediceneById = (idMedicene) => {
  return new Promise((resolve, reject) =>
    koneksi.query(`SELECT * FROM medicene WHERE idMedicene = ${idMedicene}`, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

const getDetailMediceneByName = (namaObat) => {
  return new Promise((resolve, reject) =>
    koneksi.query(`SELECT * FROM medicene WHERE namaObat LIKE '%${namaObat}%'`, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

const getDetailMediceneByCategory = (categoryId) => {
  return new Promise((resolve, reject) =>
    koneksi.query(`SELECT * FROM medicene WHERE categoryId =${categoryId}`, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

const getDetailMediceneBySupplierId = (supplierId) => {
  return new Promise((resolve, reject) =>
    koneksi.query(`SELECT * FROM medicene WHERE supplierId =${supplierId}`, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

const getDetailMediceneByUnit = (unitId) => {
  return new Promise((resolve, reject) =>
    koneksi.query(`SELECT * FROM medicene WHERE unitId =${unitId}`, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

const getDetailMediceneByStorageId = (storageId) => {
  return new Promise((resolve, reject) =>
    koneksi.query(`SELECT * FROM medicene WHERE storageId =${storageId}`, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};
const newCreateMedicene = (namaObat, categoryId, stock, unitId, storageId, tglKadeluarsa, hargaBeli, supplierId, hargaJual, keterangan) => {
  return new Promise((resolve, reject) =>
    koneksi.query(
      `INSERT INTO medicene (namaObat,categoryId,stock,unitId,storageId,tglKadeluarsa,hargaBeli,supplierId,hargaJual,keterangan) VALUES ('${namaObat}',${categoryId},${stock},${unitId},${storageId},'${tglKadeluarsa}',${hargaBeli},${supplierId},${hargaJual},'${keterangan}')`,

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

const getUpdateMedicene = (namaObat, categoryId, stock, unitId, storageId, tglKadeluarsa, hargaBeli, supplierId, hargaJual, keterangan, idMedicene) => {
  return new Promise((resolve, reject) =>
    koneksi.query(
      `UPDATE medicene SET namaObat ='${namaObat}', categoryId = ${categoryId}, stock = ${stock},unitId= ${unitId}, storageId = ${storageId}, tglKadeluarsa = '${tglKadeluarsa}',hargaBeli=${hargaBeli},supplierId = ${supplierId},hargaJual =${hargaJual},keterangan='${keterangan}'WHERE idMedicene = ${idMedicene}`,

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

const destroyMedicene = (idMedicene) => {
  return new Promise((resolve, reject) =>
    koneksi.query(
      `DELETE FROM medicene WHERE idMedicene = ${idMedicene}`,

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
  getMedicine,
  getDetailMedicene,
  getDetailMediceneById,
  getDetailMediceneByName,
  getDetailMediceneByCategory,
  getDetailMediceneBySupplierId,
  getDetailMediceneByUnit,
  getDetailMediceneByStorageId,
  newCreateMedicene,
  getUpdateMedicene,
  destroyMedicene,
};
