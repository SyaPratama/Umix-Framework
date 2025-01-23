import mysql from "mysql2/promise";
import "dotenv/config";
import { select } from "@inquirer/prompts";
export class Database {
  constructor() {
    this.pool;
  }
  async connection() {
      const pool = mysql.createPool({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        namedPlaceholders: true,
      });

      try{
        const connection  = await pool.getConnection();
        this.pool = connection;
        return connection;
      }catch(e)
      { 
        if(e instanceof Error)
        {
          const regex = new RegExp(/\bUnknown database\b/);
          if(regex.test(e.message))
          {
            const answer = await select({
              message: "Database Tidak Ada Apakah Anda Ingin Membuat Database?",
              choices:[
                {
                  name: 'Yes',
                  value:true,
                },
                {
                  name: 'No',
                  value: false,
                }
              ]
            });
            if(answer)
            {
              const createDB = mysql.createPool({
                host: process.env.DB_HOST,
                port:process.env.DB_PORT,
                user:process.env.DB_USER,
                password: process.env.DB_PASS,
              });

              await createDB.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
              console.info('Database Berhasil Dibuat Silahkan Migrasi Ulang');
              return process.exit(0);
            }
          }
        }
        return process.exit(0);
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
