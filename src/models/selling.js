const pool = require("../config/db");

const searchByIdAndDate = (id, startDate, endDate) => {
  let searchByIdAndDate = "";
  if (id) searchByIdAndDate += `WHERE ID = ${id} `;
  if (startDate) {
    if (id) {
      searchByIdAndDate += `AND tgl_transaksi >= '${startDate}' `;
    } else {
      searchByIdAndDate += `WHERE tgl_transaksi >= '${startDate}' `;
    }
  }
  if (endDate) {
    if (id || startDate) {
      searchByIdAndDate += `AND tgl_transaksi <= '${endDate}' `;
    } else {
      searchByIdAndDate += `WHERE tgl_transaksi <= '${endDate}' `;
    }
  }
  return searchByIdAndDate;
}

const selectAllDetailSelling = (limit, offset, orderby, order) => {
  return new Promise((resolve, reject) =>
    pool.query(
      `SELECT detail_penjualan.ID, medicene.namaObat, detail_penjualan.jumlah_satuan_obat, detail_penjualan.Subtotal, detail_penjualan.ID_penjualan, (SELECT SUM(detail_penjualan.Subtotal) AS harga_total FROM detail_penjualan) AS harga_total, penjualan.tgl_transaksi
      FROM detail_penjualan
      JOIN medicene
      ON detail_penjualan.ID_obat = medicene.idMedicene
      JOIN penjualan
      ON detail_penjualan.ID_penjualan = penjualan.ID
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

const selectAllSelling = (limit, offset, orderby, order, id, startDate, endDate, searchByIdAndDateFn) => {
  const searchByIdAndDate = searchByIdAndDateFn(id, startDate, endDate);
  return new Promise((resolve, reject) =>
    pool.query(
      `SELECT * FROM penjualan
      ${searchByIdAndDate}
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

const selectAllSellingById = (id, orderby, order) => {
  return new Promise((resolve, reject) =>
    pool.query(
      `SELECT detail_penjualan.ID AS id_detail_penjualan, medicene.idMedicene AS id_obat, medicene.namaObat as obat, detail_penjualan.jumlah_satuan_obat, detail_penjualan.subtotal, penjualan.total FROM detail_penjualan
      JOIN medicene
      ON detail_penjualan.ID_obat = medicene.idMedicene
      JOIN penjualan
      ON detail_penjualan.ID_penjualan = penjualan.ID
      WHERE penjualan.ID=${id}
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

const countAllSelling = (id, startDate, endDate, searchByIdAndDateFn) => {
  const searchByIdAndDate = searchByIdAndDateFn(id, startDate, endDate);
  return new Promise((resolve, reject) =>
    pool.query(
      `SELECT COUNT(ID) AS count FROM penjualan
      ${searchByIdAndDate} 
      `,
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

const countAllDetailSelling = () => {
  return new Promise((resolve, reject) =>
    pool.query(
      `SELECT COUNT(ID) AS count FROM detail_penjualan`,
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

const insertSelling = (customer, transactionDate, userId) => {
  return new Promise((resolve, reject) =>
    pool.query(
      `INSERT INTO penjualan (customer, total, tgl_transaksi, ID_users)
      VALUES ('${customer}', 0, '${transactionDate}', ${userId})`,
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

const deleteSelling = (sellingId) => {
  return new Promise((resolve, reject) =>
    pool.query(
      `DELETE FROM penjualan WHERE ID=${sellingId}`,
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

const insertDetailSelling = (sellingId, detailMedicines) => {
  let subtotalQuery = ``;
  let firstMedicineQuery = `INSERT INTO detail_penjualan(ID_penjualan, ID_obat, jumlah_satuan_obat, subtotal)
  VALUES (${sellingId}, ${detailMedicines[0].id}, ${detailMedicines[0].qty}, @harga_subtotal_0)`;
  let secondMedicineQuery = ``;
  let insertQuery = ``;

  for (let i = 0; i < detailMedicines.length; i++) {
    subtotalQuery += `SET @harga_subtotal_${i}=((SELECT hargaJual FROM medicene WHERE medicene.idMedicene=${detailMedicines[i].id})*${detailMedicines[i].qty});
    `;
  }

  if (detailMedicines.length > 1) {
    for (let i = 1; i < detailMedicines.length; i++) {
      secondMedicineQuery += `,(${sellingId}, ${
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
      }
    })
  );
};

module.exports = {
  selectAllDetailSelling,
  selectAllSelling,
  selectAllSellingById,
  insertSelling,
  deleteSelling,
  insertDetailSelling,
  countAllDetailSelling,
  countAllSelling,
  searchByIdAndDate 
};
