const { expect } = require("chai");
const sinon = require("sinon");
const input = require("../../utils/input");
const field = require("./field");

describe("field prompt", () => {
  const mockModel = {
    schema: () => {
      return { validKey: "" };
    }
  };
  let result;

  before(async () => {
    let promptStub = sinon.stub(input, "exitablePrompt");
    promptStub.onCall(0).resolves("help");
    promptStub.onCall(1).resolves("invalid");
    promptStub.onCall(2).resolves("validKey");
    sinon.spy(console, "log");

    result = await field.prompt(mockModel);
  });

  after(() => {
    console.log.restore();
    input.exitablePrompt.restore();
  });

  it("should call exitablePrompt with correct string", () => {
    const expected = "Please select the field you want to search";
    expect(input.exitablePrompt.getCalls()[0].args[0]).to.include(expected);
  });

  it("should provide instructions on help command", () => {
    const expected1 = "Valid commands are:";
    const expected2 = "validKey";
    expect(console.log.getCalls()[0].args[0]).to.include(expected1);
    expect(console.log.getCalls()[1].args[0]).to.include(expected2);
  });

  it("should instruct users when command is not valid", () => {
    const expected = "is not a valid choice.";
    expect(console.log.getCalls()[3].args[0]).to.include(expected);
  });

  it("should return a value on valid input", () => {
    expect(result).to.equal("validKey");
  });
});
