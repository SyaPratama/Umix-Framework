import fs from "fs/promises";
import { pathToFileURL } from "url";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const __middleware = path.join(__dirname, "../../Middlewares");

const loadFile = async (filePath, server) => {
  try {
    if (filePath.endsWith(".js")) {
      const URI = pathToFileURL(path.resolve(filePath));
      const middleware = await import(URI.href);
      const newMiddleware = new middleware.default(server);
      return await newMiddleware.before();
    }
  } catch (error) {
    console.error(`Error loading file ${filePath}:`, error);
  }
};

export const exploreFolder = async (server) => {
  try {
    const entries = await fs.readdir(__middleware, { encoding: "utf-8" });

    for (const entry of entries) {
      const entryPath = path.join(__middleware, entry);
      const stat = await fs.stat(entryPath);

      if (stat.isDirectory()) {
        await exploreFolder(server);
      } else {
        await loadFile(entryPath, server);
      }
    }
  } catch (error) {
    console.error("Error exploring folder:", error);
  }
};
