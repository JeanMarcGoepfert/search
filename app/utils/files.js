const util = require("util");
const fs = require("fs");

async function readJSON(filename) {
  const readFile = util.promisify(fs.readFile);
  const data = await readFile(filename);
  return JSON.parse(data);
}

async function readJSONFiles(files) {
  return Promise.all(files.map(readJSON));
}

module.exports = {
  readJSONFiles,
  readJSON
};
