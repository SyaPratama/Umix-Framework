import fs from "fs";
import { Database } from "./Database.js";
import path from "path";
import { pathToFileURL } from "url";
import { input, select } from "@inquirer/prompts";

const handleFile = async (fileMigration, __migrations, mode) => {
  try {
    const connect = new Database();
    await connect.connection();

    let answer = await select({
      message: "Options",
      choices: [
        { name: "All", value: false },
        { name: "Path", value: true },
      ],
    });

    if (answer) {
      answer = await input({ message: "Path=" });

      const nameFile = fileMigration.find((n) => n.replace(".js", "") === answer) ?? null;
      if (nameFile) {
        const pathFile = pathToFileURL(path.resolve(path.join(__migrations, nameFile))).href;
        const file = await import(pathFile);
        const migrationMode = file.default[mode];

        if (connect.pool) {
          await connect.pool.query(migrationMode);
          console.info("Migration Success");
        }
      } else {
        console.info("File Not Found!");
      }
    } else {
      for (const n of fileMigration) {  // 🔹 Gantilah forEach dengan for...of
        const pathFile = pathToFileURL(path.resolve(path.join(__migrations, n))).href;
        if (pathFile.endsWith(".js")) {
          const file = await import(pathFile);
          const migrationMode = file.default[mode];

          if (connect.pool) {
            console.dir(migrationMode);
            await connect.pool.query(migrationMode);
            console.info(`Migration Success: ${n}`);
          } else {
            console.error("Database connection not established.");
            return;
          }
        }
      }
    }

    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

(async () => {
  try {
    const __migrations = "./Migrations";
    const fileMigration = fs.readdirSync(__migrations, { encoding: "utf-8" });

    const answer = await select({
      message: "Select Menu Migration",
      choices: [
        { name: "Up", value: "Up", description: "To Create A Table From Migration" },
        { name: "Down", value: "Down", description: "To Drop A Table From Migration" },
        { name: "No", value: "No", description: "Didn't Wanna To Migration" },
      ],
    });

    if (answer !== "No") {
      await handleFile(fileMigration, __migrations, answer.toLowerCase());
    }
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
