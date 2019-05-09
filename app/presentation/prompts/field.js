const input = require("../../utils/input");
const commands = require("./commands");

const question = `Please select the field you want to search on (or type help to list valid commands)\n`;

function validate(response, schema) {
  return schema.hasOwnProperty(response);
}

function printValidCommands(schema) {
  console.log("\nValid commands are:");
  Object.keys(schema).forEach(key => console.log(key));
  console.log("");
}

async function prompt(model) {
  const response = await input.exitablePrompt(question);
  const isValid = validate(response, model.schema);
  const isHelp = response === commands.help;

  if (isHelp) {
    printValidCommands(model.schema);
    return prompt(model);
  }

  if (!isValid) {
    console.log(`"${response}" is not a valid choice.`);
    return prompt(model);
  }

  return response;
}

module.exports = prompt;
