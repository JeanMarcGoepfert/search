const User = require("./models/user");
const Organization = require("./models/organization");
const Ticket = require("./models/ticket");
const { readJSONFiles } = require("./utils/files");
const presenter = require("./cli");

const sources = ["users.json", "tickets.json", "organizations.json"];

async function init() {
  const [users, tickets, organizations] = await readJSONFiles(sources);

  const DB = {
    users: new User(users),
    tickets: new Ticket(tickets),
    organizations: new Organization(organizations)
  };

  await presenter.prompt(DB);
}

module.exports = init;
