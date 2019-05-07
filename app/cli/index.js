const { asyncPrompt } = require("../utils/input");
const prompts = require("./prompts");
const result = require("./messages/result");

async function prompt(DB) {
  const model = await prompts.model.prompt();
  const field = await prompts.field.prompt(DB[model]);
  const value = await prompts.value.prompt();

  const [results, nsTaken] = getResults(DB, model, field, value);

  result.message({
    results,
    model,
    field,
    value,
    nsTaken,
    keys: Object.keys(DB[model].shape())
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
  prompt,
  getResults
};
