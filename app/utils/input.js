const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const asyncPrompt = prompt => {
  return new Promise(resolve => {
    rl.question(prompt, response => {
      resolve(response);
    });
  });
};

module.exports = {
  asyncPrompt,
  rl
};
