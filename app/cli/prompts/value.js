const { asyncPrompt } = require("../../utils/input");

const question = `Enter a search value\n`;

async function prompt() {
  const input = await asyncPrompt(question);

  return input.trim();
}

module.exports = {
  prompt
};
