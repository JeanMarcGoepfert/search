const { asyncPrompt } = require("../../utils/input");

const question = `Please select the field you want to search on\n`;

function validate(response, shape) {
  return shape.hasOwnProperty(response);
}

async function prompt(model) {
  const input = await asyncPrompt(question);
  const response = input.trim();
  const isValid = validate(response, model.shape());

  if (!isValid) {
    console.log(`"${response}" is not a valid choice.`);
    return prompt(model);
  } else {
    return response;
  }
}

module.exports = {
  prompt
};
