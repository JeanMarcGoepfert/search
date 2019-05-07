const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const commands = {
  exit: "exit",
  help: "help"
};

const exitablePrompt = prompt => {
  return new Promise(resolve => {
    rl.question(`${prompt}`, input => {
      const response = input.trim();

      if (response === commands.exit) {
        process.exit();
      }

      resolve(response);
    });
  });
};

module.exports = {
  exitablePrompt,
  rl,
  commands
};
