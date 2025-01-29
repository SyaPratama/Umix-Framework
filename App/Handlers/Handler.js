export class Handler{
    constructor(Service)
    {
        this.Service = Service;
        this.login = this.login.bind(this);
        this.dashboard = this.dashboard.bind(this);
        this.register = this.register.bind(this);
        this.regist_handler = this.regist_handler.bind(this);
        this.login_handler = this.login_handler.bind(this);
        this.signout = this.signout.bind(this);
    }

    async login(req,h)
    {
        return await this.Service.login(req,h)
    }

    async dashboard(req,h)
    {
        return await this.Service.dashboard(req,h);
    }

    async register(req,h)
    {
        return await this.Service.register(req,h);
    }

    async regist_handler(req,h)
    {
        return await this.Service.regist_handler(req,h);
    }

    async login_handler(req,h)
    {
        return await this.Service.login_handler(req,h);
    }

    async signout(req,h)
    {
        return await this.Service.signout(req,h);
    }
}