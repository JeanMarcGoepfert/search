const { asyncPrompt } = require("../utils/input");

async function prompt(DB) {
  const model = await asyncPrompt("what dataset?\n");
  const field = await asyncPrompt("what field?\n");
  const value = await asyncPrompt("what value?\n");

  const res = DB[model].query(field, value);

  console.info(res.length + " results found");

  prompt(DB);
}

module.exports = {
  prompt
};
