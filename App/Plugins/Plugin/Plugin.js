import { Handler } from "../../Handlers/Handler.js";
import { Route } from "../../Routes/Routes.js";

export const Plugins = {
    name: "examplePlugin",
    version: '1.0.0',
    register: async function (server, { Service })
    {
        const handler = new Handler(Service);
        server.route(Route(handler));
    }
};