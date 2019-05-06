const ui = require("./ui");

function message({ results, keys, field, value, nsTaken, model }) {
  results.forEach(row => {
    ui.lineBreak();
    keys.forEach(key => ui.row({ keys, key, row, field }));
  });

  ui.searchMeta({ model, field, value, results, nsTaken });
}

module.exports = {
  message
};
