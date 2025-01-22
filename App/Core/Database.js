import mysql from "mysql2/promise";
import "dotenv/config";
export class Database{
    constructor()
    {
        this.pool;
    }
    async connection()
    {
        try{
            const connect = mysql.createPool({
                host: process.env.DB_HOST,
                port: process.env.DB_PORT,
                user: process.env.DB_USER,
                password: process.env.DB_PASS,
                database: process.env.DB_NAME,
                connectionLimit:10,
            })
            await connect.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME};`);
            this.pool = connect;
            return connect;
        }catch(e)
        {
            console.info(e);
            throw new Error(e);
        }
    }

    async getAll(table)
    {
        try{
            
        }catch(e)
        {
            console.info(e);
            throw new Error(e);
        }
    }
}