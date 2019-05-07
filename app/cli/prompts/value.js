const { exitablePrompt, commands } = require("../../utils/input");

const question = `Enter a search value\n`;

async function prompt() {
  const response = exitablePrompt(question);
  const isHelp = response === commands.help;

  if (isHelp) {
    console.log(`\nValid commands are: Any value to search on :)\n`);
    return prompt();
  }

  return response;
}

module.exports = {
  prompt
};
