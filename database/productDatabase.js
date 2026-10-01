const fs = require("fs/promises");
const path = require("path");

const DB_PATH = path.join(__dirname, "..", "db.json");

async function readData() {
  const data = await fs.readFile(DB_PATH, "utf-8");
  return JSON.parse(data);
}

async function writeData(data) {
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
}

module.exports = {
  readData,
  writeData,
  DB_PATH,
};
