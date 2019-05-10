const { expect } = require("chai");
const Base = require("./base");

describe("Base", () => {
  let model;
  const mockData = [
    { id: 1, name: "john", tags: ["a", "b"], banned: true },
    { id: 2, name: "jane", tags: ["c", "d"], banned: false }
  ];
  const invertedIndexMock = {
    id: { "1": [0], "2": [1] },
    name: { jane: [1], john: [0] },
    tags: { a: [0], b: [0], c: [1], d: [1] },
    banned: { true: [0], false: [1] }
  };
  const indexSchema = {
    id: Number,
    name: String,
    tags: Array,
    banned: Boolean
  };

  beforeEach(() => {
    class BaseWithSchema extends Base {
      get schema() {
        return indexSchema;
      }
    }
    model = new BaseWithSchema(mockData);
  });

  describe("#constructor", () => {
    it("should create and store an inverted index", () => {
      expect(model.invertedIndex).to.deep.equal(invertedIndexMock);
    });

    it("should store given rows", () => {
      expect(model.rows).to.deep.equal(mockData);
    });
  });

  describe("#createIndex", () => {
    it("should return an inverted index", () => {
      expect(model.createIndex(mockData, indexSchema)).to.deep.equal(
        invertedIndexMock
      );
    });

    it("should handle array values correctly", () => {
      const mockData = [{ ids: ["1", "2", "3"] }];
      const indexSchema = { ids: Array };
      const expected = { ids: { "1": [0], "2": [0], "3": [0] } };
      expect(model.createIndex(mockData, indexSchema)).to.deep.equal(expected);
    });

    it("should handle boolean values correctly", () => {
      const mockData = [{ on: true }, { on: false }];
      const indexSchema = { on: Boolean };
      const expected = { on: { true: [0], false: [1] } };
      expect(model.createIndex(mockData, indexSchema)).to.deep.equal(expected);
    });

    it("should handle missing fields correctly", () => {
      const mockData = [{ field: "a" }, {}];
      const indexSchema = { field: String };
      const expected = { field: { "": [1], a: [0] } };
      expect(model.createIndex(mockData, indexSchema)).to.deep.equal(expected);
    });

    it("should handle empty string fields correctly", () => {
      const mockData = [{ field: "" }];
      const indexSchema = { field: String };
      const expected = { field: { "": [0] } };
      expect(model.createIndex(mockData, indexSchema)).to.deep.equal(expected);
    });

    it("should handle empty array fields correctly", () => {
      const mockData = [{ field: [] }];
      const indexSchema = { field: String };
      const expected = { field: { "": [0] } };
      expect(model.createIndex(mockData, indexSchema)).to.deep.equal(expected);
    });

    it("should only index given fields", () => {
      const indexSchema = { name: String };
      const expected = { name: { jane: [1], john: [0] } };
      expect(model.createIndex(mockData, indexSchema)).to.deep.equal(expected);
    });
  });

  describe("#query", () => {
    it("should return matching results from array values", () => {
      expect(model.query("tags", "a")).to.deep.equal([mockData[0]]);
    });

    it("should return matching results for string values", () => {
      expect(model.query("name", "jane")).to.deep.equal([mockData[1]]);
    });

    it("should return matching results for number values", () => {
      expect(model.query("id", "2")).to.deep.equal([mockData[1]]);
    });

    it("should return matching results for boolean values", () => {
      expect(model.query("id", "2")).to.deep.equal([mockData[1]]);
    });

    it("should return empty results when no matches exist", () => {
      expect(model.query("name", "phil")).to.deep.equal([]);
    });
  });

  describe("#normalizeValue", () => {
    it("returns string[] when given boolean", () => {
      expect(model.normalizeValue(true, Boolean)).to.deep.equal(["true"]);
    });

    it("returns string[] when given number", () => {
      expect(model.normalizeValue(1, Number)).to.deep.equal(["1"]);
    });

    it("returns string[] when given string", () => {
      expect(model.normalizeValue("a", String)).to.deep.equal(["a"]);
    });

    it("returns string[] when given string[]", () => {
      expect(model.normalizeValue(["a"], Array)).to.deep.equal(["a"]);
    });

    it("returns array with empty string when given empty array", () => {
      expect(model.normalizeValue([], Array)).to.deep.equal([""]);
    });

    it("returns array with empty string when given undefined", () => {
      expect(model.normalizeValue(undefined, String)).to.deep.equal([""]);
    });

    it("throws an error for unsupported type", () => {
      expect(() => model.normalizeValue({ foo: "bar" }, Object)).to.throw(
        "Type is not supported"
      );
    });
  });

  describe("#schema", () => {
    it("throws an error", () => {
      expect(() => Base.prototype.schema()).to.throw(
        "schema method must be implemented"
      );
    });
  });
});
