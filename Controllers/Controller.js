class Controller {
    constructor()
    {
        this.void = this.void.bind(this);
    }
    void(req,h){
        return h.view('template/home', { title: "Test", message: "Test Message"});
    }
}


export default Controller;