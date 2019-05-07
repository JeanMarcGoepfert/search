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

  console.log(
    `${chalk.bold(results.length)} result(s) found in ${chalk.bold(
      nsTaken / BigInt(1000)
    )}μs`
  );
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

function organizations(organizations) {
  console.log(chalk.bold("Organization:"));
  organizations.forEach(org => console.log(`${org.name}`));
}

function submittedTickets(tickets) {
  console.log(chalk.bold("Submitted Tickets: "));
  tickets.forEach(ticket => console.log(`${ticket.subject}`));
}

function assignedTickets(tickets) {
  console.log(chalk.bold("Assigned Tickets:"));
  tickets.forEach(ticket => console.log(`${ticket.subject}`));
}

function submitter(users) {
  console.log(chalk.bold("Submitted by:"));
  users.forEach(user => console.log(`${user.name}`));
}

function assignee(users) {
  console.log(chalk.bold("Assigned to:"));
  users.forEach(user => console.log(`${user.name}`));
}

function assignee(users) {
  console.log(chalk.bold("Assigned to:"));
  users.forEach(user => console.log(`${user.name}`));
}

function users(users) {
  console.log(chalk.bold("Users:"));
  users.forEach(user => console.log(`${user.name}`));
}

function tickets(tickets) {
  console.log(chalk.bold("Tickets:"));
  tickets.forEach(ticket => console.log(`${ticket.subject}`));
}

module.exports = {
  lineBreak,
  searchMeta,
  row,
  sectionBreak,
  emptyLine,
  welcome,
  related: {
    organizations,
    submittedTickets,
    assignedTickets,
    submitter,
    assignee,
    users,
    tickets
  }
};
