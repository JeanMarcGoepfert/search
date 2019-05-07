const { asyncPrompt, commands } = require("../../utils/input");

const question = `Please select the field you want to search on (or type help to list valid commands)\n`;

function validate(response, shape) {
  return shape.hasOwnProperty(response);
}

function printValidCommands(shape) {
  console.log(`\nValid commands are:`);
  Object.keys(shape).forEach(key => console.log(key));
  console.log("");
}

async function prompt(model) {
  const response = await asyncPrompt(question);
  const isValid = validate(response, model.shape());
  const isHelp = response === commands.help;

  if (isHelp) {
    printValidCommands(model.shape());
    return prompt(model);
  }

  if (!isValid) {
    console.log(`"${response}" is not a valid choice.`);
    return prompt(model);
  }

  return response;
}

module.exports = {
  prompt
};
