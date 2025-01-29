"use strict";
import Hapi from "@hapi/hapi";
import "dotenv/config";
import { exploreFolder } from "./Lib/loadFile.js";
import { ListPlugin } from "./Plugins/ListPlugin.js";
import Vision from "@hapi/vision";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import inert from "@hapi/inert";
import Cookie from "@hapi/cookie";
import bcrypt from "bcrypt";
import { Database } from "./Core/Database.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ViewPath = path.join(__dirname, "../");
(async () => {
  const Server = Hapi.server({
    port: process.env.APP_PORT,
    host: process.env.APP_HOST,
    routes: {
      security: {
        hsts: {
          maxAge: 31536000,
          includeSubDomains: true,
          preload: true,
        },
        xframe: 'deny',
        xss: 'enabled',
        noSniff: true,
        referrer: 'no-referrer',
      },
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
    isCached: false,
    relativeTo: ViewPath,
    path: "Views",
    partialsPath: "Views/partials",
    layoutPath: "Views/template",
    layout: true,
  });

  await Server.register(inert);

  Server.route({
    method: "GET",
    path: "/resource/{file*}",
    options: {
      auth: false,
    },
    handler: {
      directory: {
        path: "Resource",
        redirectToSlash: true,
        listing: false,
        index: true,
      },
    },
  });

  await Server.register(Cookie);

  Server.auth.strategy("session", "cookie", {
    cookie: {
      name: "SESSION_LOGIN",
      password: process.env.APP_COOKIE,
      isSecure: false,
      path: "/",
    },
    redirectTo: "/login",
    validate: async (req, session) => {
      const db = new Database();
      const findToken = await db.where("personal_access_tokens", "user_id", {
        user_id: session.id,
      });
      if (findToken.find((n) => n.token === session.token)) {
        return { isValid: true, credentials: session.user };
      }
      return { isValid: false };
    },
  });

  Server.auth.default("session");

  await exploreFolder(Server);
  await Server.register(ListPlugin);

  await Server.start();
  console.info(
    `Server Running : ${Server.info.protocol}://${Server.info.host}:${Server.info.port}`
  );
})();
