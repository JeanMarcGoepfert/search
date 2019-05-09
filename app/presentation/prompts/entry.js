const prompts = require("./index");
const ui = require("../messages/ui");
const result = require("../messages/result");

async function prompt(DB) {
  const model = await prompts.promptModel();
  const field = await prompts.promptField(DB[model]);
  const value = await prompts.promptValue();

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

module.exports = { prompt };
