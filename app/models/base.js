const { get, setWith } = require("lodash");

class Base {
  constructor(rows) {
    this.rows = rows;
    this.invertedIndex = this.createIndex(rows, this.schema);
  }

  get schema() {
    throw new Error("schema method must be implemented");
  }

  query(row, queryString) {
    const matches = get(this.invertedIndex, [row, queryString], []);
    return matches.map(rowIndex => this.rows[rowIndex]);
  }

  createIndex(rows, schema) {
    return rows.reduce((acc, row, rowIndex) => {
      for (let field in schema) {
        const values = this.normalizeValue(row[field], schema[field]);

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
        throw new Error("Type is not supported");
    }
  }
}

module.exports = Base;
