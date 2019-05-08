const { expect } = require("chai");
const sinon = require("sinon");
const input = require("../../utils/input");
const value = require("./value");

describe("value prompt", () => {
  let result;

  before(async () => {
    let promptStub = sinon.stub(input, "exitablePrompt");
    promptStub.onCall(0).resolves("help");
    promptStub.onCall(1).resolves("foo");

    sinon.spy(console, "log");

    result = await value.prompt();
  });

  after(() => {
    console.log.restore();
    input.exitablePrompt.restore();
  });

  it("should prompt user to enter value", () => {
    const expected = "Enter a search value\n";
    expect(input.exitablePrompt.calledWith(expected)).to.be.true;
  });

  it("should provide instructions on help command", () => {
    const expected = "\nValid commands are: Any value to search on :)\n";
    expect(console.log.getCalls()[0].args[0]).to.equal(expected);
  });

  it("should return input", () => {
    const expected = "\nValid commands are: Any value to search on :)\n";
    expect(result).to.equal("foo");
  });
});
