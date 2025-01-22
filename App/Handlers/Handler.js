import { Database } from "../Core/Database.js";

export class Handler{
    constructor(Service)
    {
        this.Service = Service;
        this.login = this.login.bind(this);
        this.dashboard = this.dashboard.bind(this);
    }

    async login(req,h)
    {
        return await this.Service.login(req,h)
    }

    async dashboard(req,h)
    {
        return await this.Service.dashboard(req,h);
    }
}