const { expect } = require("chai");
const Base = require(".");

describe("Base", () => {
  const mockData = [
    { id: 1, name: "john", tags: ["a", "b"] },
    { id: 2, name: "jane", tags: ["c", "d"] }
  ];
  const indexShape = { id: Number, name: String, tags: Array };
  let model;

  beforeEach(() => {
    Base.prototype.shape = () => indexShape;
    model = new Base(mockData);
  });

  describe("#constructor", () => {
    it("should create and store an inverted index", () => {
      const expected = {
        id: { "1": [0], "2": [1] },
        name: { jane: [1], john: [0] },
        tags: { a: [0], b: [0], c: [1], d: [1] }
      };
      expect(model.invertedIndex).to.deep.equal(expected);
    });

    it("should store given rows", () => {
      expect(model.rows).to.deep.equal(mockData);
    });
  });

  describe("#createIndex", () => {
    it("should return an inverted index", () => {
      const expected = {
        id: { "1": [0], "2": [1] },
        name: { jane: [1], john: [0] },
        tags: { a: [0], b: [0], c: [1], d: [1] }
      };
      expect(model.createIndex(mockData, indexShape)).to.deep.equal(expected);
    });

    it("should index array values correctly", () => {
      const mockData = [{ ids: ["1", "2", "3"] }];
      const indexShape = { ids: Array };
      const expected = { ids: { "1": [0], "2": [0], "3": [0] } };
      expect(model.createIndex(mockData, indexShape)).to.deep.equal(expected);
    });

    it("should only index given fields", () => {
      const indexShape = { name: String };
      const expected = { name: { jane: [1], john: [0] } };
      expect(model.createIndex(mockData, indexShape)).to.deep.equal(expected);
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

    it("should return empty results when no matches exist", () => {
      expect(model.query("name", "phil")).to.deep.equal([]);
    });
  });
});
