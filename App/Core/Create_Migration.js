import path from "path";
import { input, select } from "@inquirer/prompts";
import fs from "fs";

async function generateTable(migrationPath, table) {
  const date = new Date().getTime();
  const nameTable = `${date}_create_table_${table}`;
  const fullPath = path.join(migrationPath, nameTable + ".js");
  const fileContent = `export default { 
    up:"CREATE TABLE ${table} (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)",
    down:"DROP TABLE ${table}" 
}
    `;
  const file = fs.readdirSync(path.dirname(fullPath), {
    encoding: "utf-8",
    recursive: true,
  });
  const find = new RegExp(`(?:^|[^a-zA-Z0-9])${table}(?:[^a-zA-Z0-9]|$)`, "gi");
  const findFile = file.find((n) =>
    find.test(n.split("Migrations\\").join("").trim())
  );
  if (findFile) {
    console.error("Table Is Already Exists:", findFile);
    return;
  } else {
    fs.writeFileSync(
      fullPath,
      fileContent,
      function (err) {
        if (err) {
          console.error("File Failed Created! ", err);
          return;
        } else {
          console.info("File Successfully Created");
          return;
        }
      }
    );
  }
}

(async () => {
  const __migrations = "./Migrations";
  const selected = await select({
    message: "Wanna Created Table?",
    choices: [
      {
        name: "Yes",
        value: true,
        description: "Accepted",
      },
      {
        name: "No",
        value: false,
        description: "Not Accepte",
      },
    ],
  });
  if (selected) {
    const answer = (
      await input({ message: "Table name:" })
    ).toLocaleLowerCase();
    if (/[s]/gi.test(answer.charAt(answer.length - 1))) {
      generateTable(__migrations, answer);
    } else {
      const newStr = answer.concat("s");
      generateTable(__migrations, newStr);
    }
  }
  return process.exit(0);
})();
