import { Database } from "../Core/Database.js";

export class Handler{
    constructor(Service)
    {
        this.Service = Service;
        this.main = this.main.bind(this);
    }

    async main(req,h)
    {
        return await this.Service.void(req,h)
    }
}