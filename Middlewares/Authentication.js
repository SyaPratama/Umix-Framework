import Middleware from "./Middleware.js";

export default class Authentication extends Middleware{
    async before(){
        this.server.ext('onRequest',async function(req,h){
            return h.continue;
        });
    };
}