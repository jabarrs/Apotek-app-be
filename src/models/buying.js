const pool = require("../config/db");

const selectAllDetailBuying = (limit, offset, orderby, order) => {
  return new Promise((resolve, reject) =>
    pool.query(
      `SELECT detail_pembelian.ID, medicene.namaObat, detail_pembelian.jumlah_satuan_obat, detail_pembelian.Subtotal, detail_pembelian.ID_pembelian, (SELECT SUM(detail_pembelian.Subtotal) AS harga_total FROM detail_pembelian) AS harga_total, pembelian.tgl_transaksi
      FROM detail_pembelian
      JOIN obat
      ON detail_pembelian.ID_obat = medicene.idMedicene
      JOIN pembelian
      ON detail_pembelian.ID_pembelian = pembelian.ID
      ORDER BY ${orderby} ${order} LIMIT ${limit} OFFSET ${offset}`,
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

const selectAllBuying = (limit, offset, orderby, order) => {
  return new Promise((resolve, reject) =>
    pool.query(
      `SELECT * FROM pembelian
      ORDER BY ${orderby} ${order} LIMIT ${limit} OFFSET ${offset}`,
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

const selectAllBuyingById = (id, orderby, order) => {
  return new Promise((resolve, reject) =>
    pool.query(
      `SELECT detail_pembelian.ID AS id_detail_pembelian, medicene.idMedicene, medicene.namaObat, detail_pembelian.jumlah_satuan_obat, detail_pembelian.subtotal, pembelian.total FROM detail_pembelian
      JOIN obat
      ON detail_pembelian.ID_obat = medicene.idMedicene
      JOIN pembelian
      ON detail_pembelian.ID_pembelian = pembelian.ID
      WHERE pembelian.ID=${id}
      ORDER BY ${orderby} ${order}`,
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

const countAllBuying = () => {
  return new Promise((resolve, reject) =>
    pool.query(
      `SELECT COUNT(ID) AS count FROM pembelian`,
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

const countAllDetailBuying = () => {
  return new Promise((resolve, reject) =>
    pool.query(
      `SELECT COUNT(ID) AS count FROM detail_pembelian`,
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

const insertBuying = (transactionDate, userId) => {
  return new Promise((resolve, reject) =>
    pool.query(
      `INSERT INTO pembelian (total, tgl_transaksi, ID_users)
      VALUES (0, '${transactionDate}', ${userId})`,
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

const deleteBuying = (buyingId) => {
  return new Promise((resolve, reject) =>
    pool.query(
      `DELETE FROM pembelian WHERE ID=${buyingId}`,
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

const insertDetailBuying = (buyingId, detailMedicines) => {
  let subtotalQuery = ``;
  let firstMedicineQuery = `INSERT INTO detail_pembelian(ID_pembelian, ID_obat, jumlah_satuan_obat, subtotal)
  VALUES (${buyingId}, ${detailMedicines[0].id}, ${detailMedicines[0].qty}, @harga_subtotal_0)`;
  let secondMedicineQuery = ``;
  let insertQuery = ``;

  for (let i = 0; i < detailMedicines.length; i++) {
    subtotalQuery += `SET @harga_subtotal_${i}=((SELECT hargaBeli FROM medicene WHERE medicene.idMedicene=${detailMedicines[i].id})*${detailMedicines[i].qty});
    `;
  }

  if (detailMedicines.length > 1) {
    for (let i = 1; i < detailMedicines.length; i++) {
      secondMedicineQuery += `,(${buyingId}, ${
        detailMedicines[i].id
      }, ${detailMedicines[i].qty}, @harga_subtotal_${i})`;
    }
  }

  insertQuery = `${subtotalQuery} ${firstMedicineQuery}${secondMedicineQuery}`;

  return new Promise((resolve, reject) =>
    pool.query(`${insertQuery}`, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
        console.log(error);
      }
    })
  );
};

module.exports = {
  selectAllDetailBuying,
  insertBuying,
  deleteBuying,
  insertDetailBuying,
  selectAllBuying,
  selectAllBuyingById,
  countAllBuying,
  countAllDetailBuying,
};
