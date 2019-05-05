const { asyncPrompt } = require("../../utils/input");

const question =
  "Please select 1) for Users or 2) for Tickets or 3) for Organizations \n";

const validResponses = {
  "1": "users",
  "2": "tickets",
  "3": "organizations"
};

const prompt = async () => {
  const response = await asyncPrompt(question);
  const dataset = validResponses[response.trim()];

  if (!dataset) {
    console.error(response, "is not a valid choice");
    return prompt();
  } else {
    console.log("selected ", dataset);
    return dataset;
  }
};

module.exports = {
  prompt
};
