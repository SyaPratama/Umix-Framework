import fs from "fs";
import { pathToFileURL } from "url";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const __middleware = path.join(__dirname, "../../Middlewares");

const loadFile = async (filePath,server) => {
  try {
    if (filePath.endsWith(".js")) {
      const URI = pathToFileURL(path.resolve(filePath));
      const middleware = await import(URI.href);
      return new middleware.default(server).before();
    }
    return;
  } catch (error) {
    console.log(error);
  }
};

export const exploreFolder = (server) => {
  fs.readdirSync(__middleware, { encoding: "utf-8" }).forEach((dirOrFile) => {
    const dirOrFilePath = path.join(__middleware, dirOrFile);
    if (fs.statSync(dirOrFilePath).isDirectory()) {
      exploreFolder(__middleware);
    } else {
      loadFile(dirOrFilePath, server);
    }
  });
};
