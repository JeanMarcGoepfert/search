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

  const [results, nsTaken] = getResults(DB, model, field, value);

  result.print({
    results,
    model,
    field,
    value,
    nsTaken,
    keys: Object.keys(DB[model].schema)
  });

  prompt(DB);
}

function getResults(DB, model, field, value) {
  const start = process.hrtime.bigint();
  const results = DB[model].getRelatedData(DB, field, value);
  const end = process.hrtime.bigint();
  return [results, end - start];
}

module.exports = {
  init,
  prompt,
  getResults
};
