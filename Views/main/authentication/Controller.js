class Controller {
    constructor()
    {
        this.login = this.login.bind(this);
        this.dashboard = this.dashboard.bind(this);
        this.register = this.register.bind(this);
    }

    async login(req,h){
        return h.view('main/authentication/login',{ title: "Welcome To " })
    }

    async dashboard(req,h)
    {
        return h.view('main/dashboard/main', { title: "Dashboard Admin", username: "Rasya Putra Pratama" });
    }
}


export default Controller;