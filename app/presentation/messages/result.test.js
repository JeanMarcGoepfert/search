const { expect } = require("chai");
const result = require("./result");
const related = require("./related");
const ui = require("./ui");
const sinon = require("sinon");

describe("presenter result message", () => {
  const mockArg = {
    results: [
      {
        row: { id: "1" },
        related: { organizations: [{ id: "2" }] }
      }
    ],
    keys: ["id"],
    field: "id",
    value: "1",
    model: "users"
  };

  beforeEach(() => {
    sinon.stub(related, "print");
    sinon.stub(ui, "emptyLine");
    sinon.stub(ui, "searchMeta");
    sinon.stub(ui, "sectionBreak");
    sinon.stub(ui, "row");
  });

  afterEach(() => {
    related.print.restore();
    ui.emptyLine.restore();
    ui.searchMeta.restore();
    ui.sectionBreak.restore();
    ui.row.restore();
  });

  describe("#print", () => {
    it("should log a each row", () => {
      result.print(mockArg);
      const expected = {
        keys: ["id"],
        key: "id",
        row: mockArg.results[0].row,
        field: "id"
      };

      expect(ui.row.calledWith(expected)).to.be.true;
    });

    it("should log related data", () => {
      result.print(mockArg);

      const expected = mockArg.results[0].related;

      expect(related.print.calledWith(expected)).to.be.true;
    });

    it("should log search meta", () => {
      result.print(mockArg);

      const expected = {
        model: mockArg.model,
        field: mockArg.field,
        value: mockArg.value,
        results: mockArg.results
      };

      expect(ui.searchMeta.calledWith(expected)).to.be.true;
    });
  });
});
