import fs from "fs";
import { Database } from "./Database.js";
import path from "path";
import { pathToFileURL } from "url";
import { select } from "@inquirer/prompts";

const handleFile = async (fileMigration, __migrations, mode,status) => {
  try {
    const connect = new Database();
    await connect.connection();
    fileMigration.forEach(async (n) => {
      const pathFile = pathToFileURL(
        path.resolve(path.join(__migrations, n))
      ).href;
      if (pathFile.endsWith(".js")) {
        const file = await import(pathFile);
        const migrationMode = file.default[mode];
        if (connect.pool) {
          await connect.pool?.query(migrationMode);
          console.info("Migration Success");
          return process.exit(0);
        } else {
          handleFile(fileMigration, __migrations, mode);
          return;
        }
      }
    });
  } catch (e) {
    console.error(e);
    return;
  }
};

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
      {
        name: "No",
        value: "No",
        description: "Didn't Wanna To Migration",
      },
    ],
  });

  let status = false;
  switch (answer) {
    case "Up":
      handleFile(fileMigration, __migrations, answer.toLowerCase(),status);
      break;
    case "Down":
      handleFile(fileMigration, __migrations, answer.toLowerCase(),status);
      break;
    default:
      break;
  }
})();
