const models = require("./models");
const files = require("./utils/files");
const presenter = require("./cli");

const sources = [
  "files/users.json",
  "files/tickets.json",
  "files/organizations.json"
];

async function init() {
  const [users, tickets, organizations] = await files.readJSONFiles(sources);

  const DB = {
    users: new models.User(users),
    tickets: new models.Ticket(tickets),
    organizations: new models.Organization(organizations)
  };

  presenter.init(DB);
}

module.exports = init;
