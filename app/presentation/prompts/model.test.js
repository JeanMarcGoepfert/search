const { expect } = require("chai");
const sinon = require("sinon");
const input = require("../../utils/input");
const model = require("./model");

describe("model prompt", () => {
  let result;

  before(async () => {
    let promptStub = sinon.stub(input, "exitablePrompt");
    promptStub.onCall(0).resolves("help");
    promptStub.onCall(1).resolves("invalid");
    promptStub.onCall(2).resolves("1");
    sinon.spy(console, "log");

    result = await model.prompt();
  });

  after(() => {
    console.log.restore();
    input.exitablePrompt.restore();
  });

  it("should call exitablePrompt with correct string", () => {
    const expected = "Please select";
    expect(input.exitablePrompt.getCalls()[0].args[0]).to.include(expected);
  });

  it("should provide instructions on help command", () => {
    const expected = "Valid commands are: 1, 2 or 3";
    expect(console.log.getCalls()[0].args[0]).to.include(expected);
  });

  it("should instruct users when command is not valid", () => {
    const expected = "is not a valid choice.";
    expect(console.log.getCalls()[1].args[0]).to.include(expected);
  });

  it("should return a value on valid input", () => {
    expect(result).to.equal("users");
  });
});
