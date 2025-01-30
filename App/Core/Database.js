import mysql from "mysql2/promise";
import "dotenv/config";
import { exec } from "child_process"
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
              console.info('Database Berhasil Dibuat! Menunggu Migrasi Ulang');
              return exec("npm run migration:run");
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

  async where(table,column,value)
  {
    try{
      await this.connection();
      const res = await this.pool?.execute(`SELECT * FROM ${table} WHERE ${column} = :${column}`,value);
      return res[0];
    }catch(e)
    {
      console.error(e);
      throw new Error(e);
    }
  }

  async raw(sql)
  {
    try{
      await this.connection();
      const res = await this.pool?.query(sql);
      return res;
    }catch(e)
    {
      console.error(e);
      throw new Error(e);
    }
  }

  async insert(table,obj)
  {
    try{
      await this.connection();
      let data = Object.keys(obj);
      let dataKeys = data.join(',');
      data = data.map(v => {
        return `:${v}`;
      })
      data = data.join(',');
      const res = await this.pool?.execute(`INSERT INTO ${table} (${dataKeys}) VALUES(${data})`,obj);
      return res;
    }catch(e)
    {
      console.error(e);
      throw new Error(e);
    }
  }

  async deleted(table,id)
  {
    try{
      await this.connection();
      const res = await this.pool?.execute(`DELETE FROM ${table} WHERE id = :id`, { id });
      return res;
    }catch(e)
    {
      console.error(e);
      throw new Error(e);
    }
  }
}
