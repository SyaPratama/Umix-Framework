"use strict";
import Hapi from "@hapi/hapi";
import "dotenv/config";
import { exploreFolder } from "./Lib/loadFile.js";
import { ListPlugin } from "./Plugins/ListPlugin.js";
import Vision from "@hapi/vision";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ViewPath = path.join(__dirname, "../");
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

  await Server.register(Vision);
  Server.views({
    engines: {
      ejs: await import("ejs"),
    },
    relativeTo: ViewPath,
    path: "Views",
  });

  await Server.register(ListPlugin);

  exploreFolder(Server);

  await Server.start();
  console.info(
    `Server Running : ${Server.info.protocol}://${Server.info.host}:${Server.info.port}`
  );
})();
