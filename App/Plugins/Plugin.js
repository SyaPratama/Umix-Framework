import { Route } from "../Routes/Routes.js";

export const Plugins = {
    name: "examplePlugin",
    version: '1.0.0',
    register: async function (server)
    {
        server.route(Route());
    }
};