const entry = require("./prompts/entry");
const ui = require("./messages/ui");

function init(DB) {
  ui.welcome();
  entry.prompt(DB);
}

module.exports = { init };
