import { Database } from "../Core/Database.js";

export class Handler{
    constructor(Service)
    {
        this.Service = Service;
        this.main = this.main.bind(this);
    }

    async main()
    {
        const conn = new Database();
        let db = {
            data: "Rasya"
        }
        const res =  await conn.getAll(db.data);
        console.log(res);
        console.log('Handler Running');
        return "Hi";
    }
}