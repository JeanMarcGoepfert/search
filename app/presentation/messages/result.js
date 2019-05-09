const ui = require("./ui");
const relatedUI = require("./related");

function print({ results, keys, field, value, model }) {
  ui.emptyLine();
  results.forEach(({ row, related }) => {
    ui.sectionBreak();
    keys.forEach(key => ui.row({ keys, key, row, field }));
    relatedUI.print(related);
  });

  ui.searchMeta({ model, field, value, results });
}

module.exports = {
  print
};
