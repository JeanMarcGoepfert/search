const chalk = require("chalk");
const { commands } = require("../../utils/input");

function lineBreak() {
  console.log("-------------------------------");
}

function sectionBreak() {
  console.log("###############################");
}

function emptyLine() {
  console.log("");
}

function welcome() {
  sectionBreak();
  console.log(chalk.bold("Welcome to Zendesk Search"));
  sectionBreak();
  console.log(`Type '${chalk.bold(commands.exit)}' to exit at any time`);
  console.log(`Type '${chalk.bold(commands.help)}' to list valid commands`);
  emptyLine();
}

function searchMeta({ model, field, value, results, nsTaken }) {
  sectionBreak();

  console.log(
    `Searched for "${chalk.bold(value)}" in ${chalk.bold(
      field
    )} in ${chalk.bold(model)}`
  );

  console.log(`${chalk.bold(results.length)} result(s) found`);

  sectionBreak();
  emptyLine();
}

function row({ keys, key, row, field }) {
  const longestKey = Math.max(...keys.map(key => key.length));
  const space = Array(longestKey - key.length + 1).join(" ");
  const value = row[key] === undefined ? "" : row[key];
  const output = `${chalk.bold(key)}: ${space} ${value}`;

  if (key === field) {
    console.log(chalk.inverse(output));
  } else {
    console.log(output);
  }
}

module.exports = {
  lineBreak,
  searchMeta,
  row,
  sectionBreak,
  emptyLine,
  welcome
};
