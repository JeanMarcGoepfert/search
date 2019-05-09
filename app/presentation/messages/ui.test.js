const chalk = require("chalk");
const { expect } = require("chai");
const sinon = require("sinon");
const ui = require("./ui");

describe("ui functions", () => {
  beforeEach(() => {
    sinon.spy(console, "log");
  });

  afterEach(() => {
    console.log.restore();
  });

  describe("#lineBreak", () => {
    it("should log a line break", () => {
      ui.lineBreak();
      expect(console.log.calledWith("-------------------------------")).to.be
        .true;
    });
  });

  describe("#sectionBreak", () => {
    it("should log a section break", () => {
      ui.sectionBreak();
      expect(console.log.calledWith("###############################")).to.be
        .true;
    });
  });

  describe("#welcome", () => {
    it("should display a welcome message with instructions", () => {
      ui.welcome();
      expect(console.log.calledWith(chalk.bold("Welcome to Zendesk Search"))).to
        .be.true;
      expect(
        console.log.calledWith(
          `Type '${chalk.bold("exit")}' to exit at any time`
        )
      ).to.be.true;
      expect(
        console.log.calledWith(
          `Type '${chalk.bold("help")}' to list valid commands`
        )
      ).to.be.true;
    });
  });

  describe("#searchMeta", () => {
    it("should display a welcome message with instructions", () => {
      const mockArg = {
        model: "users",
        field: "role",
        value: "admin",
        results: [1]
      };
      ui.searchMeta(mockArg);

      expect(
        console.log.calledWith(
          `Searched for "${chalk.bold("admin")}" in ${chalk.bold(
            "role"
          )} in ${chalk.bold("users")}`
        )
      ).to.be.true;

      expect(console.log.calledWith(`${chalk.bold(1)} result(s) found`)).to.be
        .true;
    });
  });

  describe("#row", () => {
    const mockArg = {
      keys: ["name", "role"],
      key: "name",
      row: { name: "john", role: "admin" },
      field: "name"
    };

    describe("when it is not the row being searched", () => {
      it("should display search result row details", () => {
        ui.row({ ...mockArg, key: "role" });
        const calls = console.log.getCalls();
        expect(calls[0].args[0]).to.include("role");
        expect(calls[0].args[0]).to.include("admin");
      });
    });

    describe("when the value is not defined", () => {
      it("displays the row key", () => {
        ui.row({ ...mockArg, row: {} });
        const calls = console.log.getCalls();
        expect(calls[0].args[0]).to.include("name");
      });
    });

    describe("when it is the row being searched", () => {
      it("should display search result row details", () => {
        ui.row(mockArg);
        const calls = console.log.getCalls();
        expect(calls[0].args[0]).to.include("name");
        expect(calls[0].args[0]).to.include("john");
      });
    });
  });
});
