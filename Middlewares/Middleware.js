export default class Middleware{
    constructor(Server)
    {
        this.server = Server;
        this.before = this.before.bind(this);
    }
    async before(){
        this.server.ext('onRequest',async function(req,h){
            console.log("Middleware Main");
            return h.continue;
        });
    };
}