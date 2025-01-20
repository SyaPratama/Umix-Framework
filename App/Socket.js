"use strict";
import Hapi from "@hapi/hapi";
import "dotenv/config";
import { Plugins } from "./Plugins/Plugin.js";
import { exploreFolder } from "./Lib/loadFile.js";

(async () => {
  const Server = Hapi.server({
    port: process.env.APP_PORT,
    host: process.env.APP_HOST,
    routes: {
      cors: {
        origin: ["*"],
        headers: ["Accept", "Content-Type"],
      },
    },
  });

  await Server.register([
    {
      plugin: Plugins,
    },
  ]);

  exploreFolder(Server);

  await Server.start();
})();
