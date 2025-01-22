class Controller {
    constructor()
    {
        this.void = this.void.bind(this);
    }
    void(){
        console.log('Controller');
    }
}


export default Controller;