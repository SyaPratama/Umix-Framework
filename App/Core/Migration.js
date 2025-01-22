import fs from "fs";
import { Database } from "./Database.js";
import path from "path";
import { pathToFileURL } from "url";
import { select } from "@inquirer/prompts";

const handleFile = async (fileMigration,__migrations,mode) => {
  const connect = new Database();
    fileMigration.forEach(async n => {
        const pathFile = pathToFileURL(
            path.resolve(path.join(__migrations, n))
          ).href;
          const file = await import(pathFile);
          const migrationMode = file.default[mode];
          await connect.connection();
          await connect.pool.execute(migrationMode);
    });
}

(async () => {
  try {
  } catch (e) {
    console.error(e);
    throw e;
  }
  const __migrations = "./Migrations";
  const fileMigration = fs.readdirSync(__migrations, { encoding: "utf-8" });
  const answer = await select({
    message: "Select Menu Migration",
    choices: [
      {
        name: "Up",
        value: "Up",
        description: "To Create A Table From Migration",
      },
      {
        name: "Down",
        value: "Down",
        description: "To Drop A Table From Migration",
      },
    ],
  });
  switch (answer) {
    case "Up":
        handleFile(fileMigration,__migrations,answer.toLowerCase());
      break;
    case "Down":
        handleFile(fileMigration,__migrations,answer.toLowerCase());
        break;
  }
  console.info(`Migration Success ${answer}`);
})();
