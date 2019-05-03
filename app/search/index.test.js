const { expect } = require("chai");
const Search = require(".");

describe("Search", () => {
  const mockData = [{ id: "1", value: "foo" }, { id: "2", value: "bar" }];
  let search;

  beforeEach(() => {
    search = new Search();
  });

  describe("#index", () => {
    it("should created an inverted index of data provided", () => {
      const expected = {
        "1": [{ id: "1", name: "mock" }],
        "2": [{ id: "2", name: "mock" }],
        foo: [{ id: "1", name: "mock" }],
        bar: [{ id: "2", name: "mock" }]
      };

      search.index(mockData, { name: "mock", identifier: "id" });

      expect(search.invertedIndex).to.deep.equal(expected);
    });
  });

  describe("#query", () => {
    beforeEach(() => {
      search.index(mockData, { name: "mock", identifier: "id" });
    });

    it("should return references to matching fields", () => {
      const expected = [{ id: "1", name: "mock" }];

      expect(search.query("foo")).to.deep.equal(expected);
    });

    it("should return an empty array when no values match keyword", () => {
      expect(search.query("nope")).to.deep.equal([]);
    });
  });
});
