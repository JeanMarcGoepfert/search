const { get, setWith } = require("lodash");

class Base {
  constructor(rows) {
    this.rows = rows;
    this.invertedIndex = this.createIndex(rows, this.shape());
  }

  shape() {
    throw new Error("Shape method must be implemented");
  }

  createIndex(rows, shape) {
    return rows.reduce((acc, row, i) => {
      for (let field in shape) {
        const values = [].concat(row[field]);

        values.forEach(value => {
          const currentMatches = get(acc, [field, value], []);
          setWith(acc, [field, value], [...currentMatches, i], Object);
        });
      }

      return acc;
    }, {});
  }

  query(row, queryString) {
    const matches = get(this.invertedIndex, [row, queryString], []);
    return matches.map(rowIndex => this.rows[rowIndex]);
  }
}

module.exports = Base;
