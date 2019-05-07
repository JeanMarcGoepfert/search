const ui = require("./ui");

function message({ results, keys, field, value, nsTaken, model }) {
  results.forEach(({row, related}) => {
    console.log(related);
    ui.lineBreak();
    keys.forEach(key => ui.row({ keys, key, row, field }));
  });

  ui.searchMeta({ model, field, value, results, nsTaken });
}

module.exports = {
  message
};
