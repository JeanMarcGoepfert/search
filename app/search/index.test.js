const { expect } = require("chai");
const Search = require(".");

describe("Search", () => {
  const mockData = [{ id: "1", name: "john" }, { id: "2", name: "jane" }];
  const fieldsToIndex = {
    id: String,
    name: String
  };
  let search;

  beforeEach(() => {
    search = new Search();
  });

  describe("#createIndex", () => {
    it("should create an inverted index of data provided", () => {
      const expected = {
        users: {
          id: { "1": ["1"], "2": ["2"] },
          name: { john: ["1"], jane: ["2"] }
        }
      };

      search.createIndex(mockData, {
        name: "users",
        model: fieldsToIndex,
        identifier: "id"
      });

      expect(search.invertedIndex).to.deep.equal(expected);
    });
  });

  describe("#query", () => {
    beforeEach(() => {
      search.createIndex(mockData, {
        name: "users",
        model: fieldsToIndex,
        identifier: "id"
      });
    });

    it("should return references to matching fields", () => {
      const expected = ["1"];

      expect(search.query("users", "name", "john")).to.deep.equal(expected);
    });

    it("should return an empty array when no values match keyword", () => {
      expect(search.query("users", "name", "jim")).to.deep.equal([]);
    });
  });
});
