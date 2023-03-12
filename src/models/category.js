const koneksi = require('../config/db');
const getCategory = () => {
  return new Promise((resolve, reject) =>
    koneksi.query('SELECT * FROM category', (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

const getDetailCategory = (categoryId, nameCategory, sorting) => {
  let searchByIdandName = '';
  if (categoryId && nameCategory) {
    searchByIdandName = `WHERE categoryId = ${categoryId} AND nameCategory LIKE '%${nameCategory}%'`;
  } else if (categoryId) {
    searchByIdandName = `WHERE categoryId = ${categoryId}`;
  } else if (nameCategory) {
    searchByIdandName = `WHERE nameCategory LIKE '%${nameCategory}%'`;
  }

  return new Promise((resolve, reject) =>
    koneksi.query(`SELECT * FROM category ${searchByIdandName} ORDER BY nameCategory ${sorting}`, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

const newCreateCategory = (categoryId, nameCategory) => {
  return new Promise((resolve, reject) =>
    koneksi.query(
      `INSERT INTO category (categoryId,nameCategory) VALUES (${categoryId},'${nameCategory}')`,

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

const getUpdateCategory = (nameCategory, categoryId) => {
  return new Promise((resolve, reject) =>
    koneksi.query(
      `UPDATE category SET nameCategory ='${nameCategory}'WHERE categoryId = ${categoryId}`,

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

const destroyCategory = (categoryId) => {
  return new Promise((resolve, reject) =>
    koneksi.query(
      `DELETE FROM category WHERE categoryId = ${categoryId}`,

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
module.exports = { getCategory, getDetailCategory, newCreateCategory, getUpdateCategory, destroyCategory };

// const insertUser = (data) => {
//   const { id, name, email, nip, passwords, role } = data;
//   return new Promise((resolve, reject) =>
//     connection.query(
//       `INSERT INTO users(id,name,email,nip,passwords,role) VALUES(${id},'${name}','${email}',${nip},'${passwords}','${role}')`,
//       (error, result) => {
//         if (!error) {
//           resolve(result);
//         } else {
//           reject(error);
//         }
//       }
//     )
//   );
// };
