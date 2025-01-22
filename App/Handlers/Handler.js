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
        console.log('Handler Running');
        return "Hi";
    }
}