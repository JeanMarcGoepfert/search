const prompts = require("./prompts");
const ui = require("./messages/ui");
const result = require("./messages/result");

function init(DB) {
  ui.welcome();
  prompt(DB);
}

async function prompt(DB) {
  const model = await prompts.model.prompt();
  const field = await prompts.field.prompt(DB[model]);
  const value = await prompts.value.prompt();

  const results = DB[model].queryWithRelations(DB, field, value);

  result.print({
    results,
    model,
    field,
    value,
    keys: Object.keys(DB[model].schema)
  });

  return prompt(DB);
}

module.exports = {
  init,
  prompt
};
