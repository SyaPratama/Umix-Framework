import Middleware from "./Middleware.js";

export default class Authentication extends Middleware{
    constructor(server)
    {
        super(server);
        this.before = this.before.bind(this);
    }
    async before(){
        this.server.ext("onPreResponse", async (req, h) => {
            if (req.auth.isAuthenticated) {
              const restrictedPath = ["/login", "/register"];
              if(restrictedPath.includes(req.path))
              {
                  return h.redirect('/');
              }
              return h.continue;
            }
            return h.continue;
          });
    };
}