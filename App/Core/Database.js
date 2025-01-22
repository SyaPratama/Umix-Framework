import mysql from "mysql2/promise";
import "dotenv/config";
export class Database {
  constructor() {
    this.pool;
  }
  async connection() {
    try {
      const connect = mysql.createPool({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        waitForConnections: true,
        keepAliveInitialDelay: 0,
        enableKeepAlive: true,
        connectionLimit: 10,
        jsonStrings: true,
        namedPlaceholders: true,
      });

      this.pool = connect;
      return connect;
    } catch (e) {
      const connect = mysql.createPool({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        namedPlaceholders: true,
      });
      const regex = new RegExp(/\bUnknown database\b/);
      if (regex.test(e.message)) {
        await connect?.query(
          `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`
        );
        return;
      }
      throw e;
    }
  }

  async getAll(table) {
    try {
      if (table) {
        await this.connection();
        const res = await this.pool?.execute(`SELECT * FROM ${table}`);
        return res[0];
      }
    } catch (e) {
      console.info(e);
      throw new Error(e);
    }
  }

  async find(table, id) {
    try {
      if (table && id) {
        await this.connection();
        const res = await this.pool?.execute(`SELECT * FROM ${table} WHERE id = :id`,{ id });
        return res[0]
      }
    } catch (e) {
      console.error(e);
      throw new Error(e);
    }
  }
}
