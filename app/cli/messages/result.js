const ui = require("./ui");
const relatedUI = require("./related");

function message({ results, keys, field, value, nsTaken, model }) {
  ui.emptyLine();
  results.forEach(({ row, related }) => {
    ui.sectionBreak();
    keys.forEach(key => ui.row({ keys, key, row, field }));
    relatedUI.print(related);
  });

  ui.searchMeta({ model, field, value, results, nsTaken });
}

module.exports = {
  message
};
