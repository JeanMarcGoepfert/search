const chalk = require("chalk");

function lineBreak() {
  console.log("-------------------------------");
}

function searchMeta({ model, field, value, results, nsTaken }) {
  lineBreak();

  console.log(
    `Searched for "${chalk.bold(value)}" in ${chalk.bold(
      field
    )} in ${chalk.bold(model)}`
  );

  console.log(
    `${chalk.bold(results.length)} result(s) found in ${chalk.bold(
      nsTaken / BigInt(1000)
    )}μs`
  );
  lineBreak();
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
  row
};
