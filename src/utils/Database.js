const mysql = require('mysql2/promise');
const Logger = require('./Logger');
const databaseConfig = require('../config/database');

class Database {
  constructor() {
    this.connection = null;
    this.config = databaseConfig;
  }

  async connect() {
    try {
      if (this.config.host !== '') {
        this.connection = await mysql.createConnection(this.config);
      }
    } catch (e) {
      Logger.error(e);
    }
  }

  async close() {
    try {
      if (this.connection !== null) {
        await this.connection.close();
      }
    } catch (e) {
      Logger.error(e);
    }
  }

  async executeQuery(query = '', params = []) {
    let result = [];

    if (query.trim().length > 0 && this.config !== undefined) {
      const queryToExecute = query.trim();

      try {
        if (queryToExecute.slice(0, 6).toUpperCase().startsWith('SELECT')) {
          this.config.host = process.env.DB_HOSTNAME_READER;
        } else {
          this.config.host = process.env.DB_HOSTNAME_WRITER;
        }

        await this.connect();

        if (this.connection !== null) {
          result = await this.connection.execute(queryToExecute, params);

          await this.close();
        }
      } catch (e) {
        Logger.error(e);
      }
    }
    return result;
  }
}

module.exports = new Database();
