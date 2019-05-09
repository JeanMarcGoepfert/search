const { expect } = require("chai");
const sinon = require("sinon");
const prompts = require("./index");
const entry = require("./entry");
const result = require("../messages/result");

describe("entry prompt function", () => {
  let firstPromptStub = sinon.stub(prompts, "promptModel");
  const getDataSpy = sinon.spy();
  const mockDB = {
    users: {
      schema: "schema",
      queryWithRelations: getDataSpy
    }
  };
  const mockResponses = {
    model: "users",
    field: "name",
    value: "john"
  };

  before(() => {
    //only resolve first call to short circuit recursion loop.
    firstPromptStub.onCall(0).resolves(mockResponses.model);
    firstPromptStub.onCall(1).returns(new Promise(() => {}));
    sinon.stub(prompts, "promptField").resolves(mockResponses.field);
    sinon.stub(prompts, "promptValue").resolves(mockResponses.value);
    sinon.stub(result, "print");

    entry.prompt(mockDB);
  });

  after(() => {
    firstPromptStub.restore();
    prompts.promptField.restore();
    prompts.promptValue.restore();
    result.print.restore();
  });

  it("should prompt for a model value", () => {
    expect(prompts.promptModel.called).to.be.true;
  });

  it("should prompt for a field value", () => {
    expect(prompts.promptField.calledWith(mockDB[mockResponses.model])).to.be
      .true;
  });

  it("should prompt for a search value", () => {
    expect(prompts.promptValue.called).to.be.true;
  });

  it("should print the results", () => {
    expect(result.print.called).to.be.true;
  });
});
