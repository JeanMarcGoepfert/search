const { get, setWith } = require("lodash");

class Search {
  constructor() {
    this.invertedIndex = {};
  }

  createIndex(rows, { name, model, identifier }) {
    const index = rows.reduce((acc, row) => {
      for (let key in model) {
        const colValue = row[key];
        const matches = get(acc, [key, colValue], []);
        const newMatches = [...matches, row[identifier]];
        setWith(acc, [key, colValue], newMatches, Object);
      }

      return acc;
    }, {});

    this.invertedIndex[name] = index;
  }

  query(index, row, queryString) {
    return get(this.invertedIndex, [index, row, queryString], []);
  }
}

module.exports = Search;
