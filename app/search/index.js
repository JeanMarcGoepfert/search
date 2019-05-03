class Search {
  constructor() {
    this.invertedIndex = {};
  }

  index(rows, { name, identifier }) {
    this.invertedIndex = rows.reduce((acc, row) => {
      for (let key in row) {
        const value = row[key];
        acc[value] = acc[value] || [];
        acc[value].push({ id: row[identifier], name });
      }
      return acc;
    }, this.invertedIndex);
  }

  query(queryString) {
    return this.invertedIndex[queryString] || [];
  }
}

module.exports = Search;
