export default class Middleware{
    constructor(Server)
    {
        this.server = Server;
        this.before = this.before.bind(this);
    }
    async before(){
        this.server.ext('onRequest',async function(req,h){
            return h.continue;
        });
    };
}