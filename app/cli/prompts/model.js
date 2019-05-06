const { asyncPrompt } = require("../../utils/input");

const responseMap = { "1": "users", "2": "tickets", "3": "organizations" };
const question = `Please select \
1) for ${responseMap["1"]} or \
2) for ${responseMap["2"]} or \
3) for ${responseMap["3"]}
`;

function validate(response) {
  const validResponses = ["1", "2", "3"];
  return validResponses.includes(response);
}

async function prompt() {
  const input = await asyncPrompt(question);
  const response = input.trim();
  const isValid = validate(response);

  if (!isValid) {
    console.log(`"${response}" is not a valid choice.`);
    return prompt();
  } else {
    return responseMap[response];
  }
}

module.exports = {
  prompt
};
