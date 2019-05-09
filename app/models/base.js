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

  /* createIndex
   * creates an inverted index, keyed by field and field name and string
   * value of the json rows provided.
   *
   * eg:
   *
   * For the users:
   *
   * [{name: john, id: 2}, {name: "jane", id: 2}]
   *
   * {
   *   id: { "1": [0], "2": [1] },
   *   name: { "john": [0], "jane": [1] }
   * }
   *
   * this object can then be queried with id and name
   * to find all matching rows:
   *
   * index.id.john === [0]
   * rows[0] === {name: "john", id: "1"}
   */
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

  /* normalizeValue
   *
   * Used to retrieve searchable values in a consistent format before adding
   * them to the inverted index.
   *
   * Values can currently comes through as:
   * boolean, array of strings, string, number, undefined (when field is not present in data)
   *
   * These values get stored as keys on the index object, therefore need to be converted
   * to strings.
   *
   * With arrays of strings however, each string in the array must be stored as a
   * key (so tags are searchable etc). So rather than having an approach to handle
   * strings, and an approach to handle arrays of strings - we just convert everything
   * to an array of strings and handle them in the same way.
   */
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
