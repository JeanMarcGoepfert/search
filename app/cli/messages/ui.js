const chalk = require("chalk");

function lineBreak() {
  console.log("-------------------------------");
}

function searchMeta({ model, field, value, results, nsTaken }) {
  lineBreak();

  console.log(
    `Searched ${chalk.bold(model)} for ${chalk.bold(
      field
    )} rows including "${chalk.bold(value)}"`
  );

  console.log(
    `Found ${results.length} results found in ${nsTaken / BigInt(1000)}μs`
  );
  lineBreak();
}

function row({ keys, key, row, field }) {
  const longestKey = Math.max(...keys.map(key => key.length));
  const space = Array(longestKey - key.length + 1).join(" ");
  const output = `${chalk.bold(key)}: ${space} ${row[key] || ""}`;

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
