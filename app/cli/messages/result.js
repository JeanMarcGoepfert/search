const ui = require("./ui");

function message({ results, keys, field, value, nsTaken, model }) {
  ui.emptyLine();
  results.forEach(({ row, related }) => {
    ui.sectionBreak();
    keys.forEach(key => ui.row({ keys, key, row, field }));
    relatedData(related);
  });

  ui.searchMeta({ model, field, value, results, nsTaken });
}

function relatedData(related) {
  ui.emptyLine();
  for (key in related) {
    ui.related[key](related[key]);
    ui.emptyLine();
  }
}

module.exports = {
  message
};
