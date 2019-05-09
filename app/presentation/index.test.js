const { expect } = require("chai");
const sinon = require("sinon");
const entry = require("./prompts/entry");
const ui = require("./messages/ui");
const { init } = require("./");

describe("presentation init function", () => {
  before(() => {
    sinon.stub(entry, "prompt");
    sinon.stub(ui, "welcome");
  });

  after(() => {
    entry.prompt.restore();
    ui.welcome.restore();
  });

  it("should welcome user", () => {
    init("DB");
    expect(ui.welcome.called).to.be.true;
  });

  it("should enter the search app", () => {
    init("DB");
    expect(entry.prompt.calledWith("DB")).to.be.true;
  });
});
