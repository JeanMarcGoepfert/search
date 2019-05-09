const input = require("../../utils/input");
const commands = require("./commands");

const responseMap = { "1": "users", "2": "tickets", "3": "organizations" };
const question = `Please select \
1) for ${responseMap["1"]} or \
2) for ${responseMap["2"]} or \
3) for ${responseMap["3"]}
`;

function validate(response) {
  return Object.keys(responseMap).includes(response);
}

async function prompt() {
  const response = await input.exitablePrompt(question);
  const isValid = validate(response);
  const isHelp = response === commands.help;

  if (isHelp) {
    console.log(`\nValid commands are: 1, 2 or 3\n`);
    return prompt();
  }

  if (!isValid) {
    console.log(`"${response}" is not a valid choice.`);
    return prompt();
  }

  return responseMap[response];
}

module.exports = prompt;
