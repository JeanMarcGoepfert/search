const chalk = require("chalk");
const ui = require("./ui");

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

function users(users) {
  console.log(chalk.bold("Users:"));
  users.forEach(user => console.log(`${user.name}`));
}

function tickets(tickets) {
  console.log(chalk.bold("Tickets:"));
  tickets.forEach(ticket => console.log(`${ticket.subject}`));
}

const relatedFieldsMap = {
  organizations,
  submittedTickets,
  assignedTickets,
  submitter,
  assignee,
  users,
  tickets
};

function print(related) {
  ui.emptyLine();
  for (let key in related) {
    const handler = relatedFieldsMap[key];
    if (handler) {
      handler(related[key]);
      ui.emptyLine();
    }
  }
}

module.exports = {
  print,
  ...relatedFieldsMap
};
