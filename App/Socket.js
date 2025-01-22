"use strict";
import Hapi from "@hapi/hapi";
import "dotenv/config";
import { exploreFolder } from "./Lib/loadFile.js";
import { ListPlugin } from "./Plugins/ListPlugin.js";

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

  await Server.register(ListPlugin);

  exploreFolder(Server);

  await Server.start();
  console.info(`Server Running : ${Server.info.protocol}://${Server.info.host}:${Server.info.port}`)
})();
