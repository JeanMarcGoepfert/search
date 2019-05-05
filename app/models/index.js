const { get, setWith } = require("lodash");

class Base {
  constructor(rows) {
    this.rows = rows;
    this.invertedIndex = this.createIndex(rows, this.shape());
  }

  shape() {
    throw new Error("shape method must be implemented");
  }

  query(row, queryString) {
    const matches = get(this.invertedIndex, [row, queryString], []);
    return matches.map(rowIndex => this.rows[rowIndex]);
  }

  createIndex(rows, shape) {
    return rows.reduce((acc, row, rowIndex) => {
      for (let field in shape) {
        const values = this.normalizeValue(row[field], shape[field]);

        values.forEach(value => {
          const existingMathes = get(acc, [field, value], []);
          setWith(acc, [field, value], [...existingMathes, rowIndex], Object);
        });
      }

      return acc;
    }, {});
  }

  normalizeValue(value, type) {
    const emptyValue = [""];

    if (value === undefined) {
      return emptyValue;
    }

    switch (type) {
      case Boolean:
        return [value.toString()];
      case Number:
        return [value.toString()];
      case String:
        return [value];
      case Array:
        return value.length > 0 ? value : emptyValue;
      default:
        return value;
    }
  }
}

module.exports = Base;
