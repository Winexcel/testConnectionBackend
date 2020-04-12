const mysql = require('mysql');
const { dbConfig } = require('@config/config');

const pool = {
  con: mysql.createPool({
    connectionLimit: 100,
    waitForConnections: true,
    ...dbConfig,
  }),

  escape(param) {
    return this.con.escape(param);
  },

  query(query) {
    return new Promise((resolve, reject) => {
      this.con.query(query.query, query.values, (error, result, fields) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  },
};

module.exports = pool;
