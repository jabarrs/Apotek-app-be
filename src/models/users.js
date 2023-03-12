const pool = require("../config/db");

const findId = (id) => {
  return new Promise((resolve, reject) =>
    pool.query(`SELECT * FROM users2 WHERE id=${id}`, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

const findEmail = (email) => {
  return new Promise((resolve, reject) =>
    pool.query(
      `SELECT * FROM users2 WHERE email='${email}'`,
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

const findNip = (nip) => {
  return new Promise((resolve, reject) =>
    pool.query(
      `SELECT * FROM users2 WHERE nip='${nip}'`,
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

const insertUser = (data) => {
  const { id, name, email, nip, passwords, role, isVerified } = data;
  return new Promise((resolve, reject) =>
    pool.query(
      `INSERT INTO users2(id,name,email,nip,passwords,role,is_verified) VALUES(${id},'${name}','${email}',${nip},'${passwords}','${role}',${isVerified})`,
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

const selectAllUsers = (limit, offset, orderby, order) => {
  return new Promise((resolve, reject) =>
    pool.query(
      `SELECT * FROM users2 ORDER BY ${orderby} ${order} LIMIT ${limit} OFFSET ${offset}`,
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

const countAllUsers = () => {
  return new Promise((resolve, reject) =>
    pool.query(
      `SELECT COUNT(ID) AS count FROM users2`,
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

const findUserVerification = (userId, token) => {
  return new Promise((resolve, reject) =>
    pool.query(
      `SELECT * FROM users_verification WHERE user_id='${userId}' AND token='${token}'`,
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

const insertUserVerification = (verificationId, userId, token) => {
  return new Promise((resolve, reject) =>
    pool.query(
      `INSERT INTO users_verification (verification_id, user_id, token) VALUES('${verificationId}','${userId}','${token}')`,
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

const activateUserAccount = (userId) => {
  return new Promise((resolve, reject) =>
    pool.query(
      `UPDATE users2 SET is_verified=1 WHERE id=${userId}`,
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

const deleteUserVerification = (userId, token) => {
  return new Promise((resolve, reject) =>
    pool.query(
      `DELETE FROM users_verification WHERE user_id=${userId} AND token='${token}'`,
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

const insertResetVerification = (resetId, userId, token) => {
  return new Promise((resolve, reject) =>
    pool.query(
      `INSERT INTO reset_password (reset_id, user_id, token) VALUES('${resetId}','${userId}','${token}')`,
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
  findId,
  findEmail,
  findNip,
  insertUser,
  selectAllUsers,
  countAllUsers,
  findUserVerification,
  insertUserVerification,
  activateUserAccount,
  deleteUserVerification,
  insertResetVerification
};
