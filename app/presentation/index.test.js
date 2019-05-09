const { expect } = require("chai");
const sinon = require("sinon");
const presentation = require(".");
const prompts = require("./prompts");
const result = require("./messages/result");

describe("presentation prompt function", () => {
  let firstPromptStub = sinon.stub(prompts.model, "prompt");
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
    sinon.stub(prompts.field, "prompt").resolves(mockResponses.field);
    sinon.stub(prompts.value, "prompt").resolves(mockResponses.value);
    sinon.stub(result, "print");

    presentation.prompt(mockDB);
  });

  after(() => {
    firstPromptStub.restore();
    prompts.field.prompt.restore();
    prompts.value.prompt.restore();
    result.print.restore();
  });

  it("should prompt for a model value", () => {
    expect(prompts.model.prompt.called).to.be.true;
  });

  it("should prompt for a field value", () => {
    expect(prompts.field.prompt.calledWith(mockDB[mockResponses.model])).to.be
      .true;
  });

  it("should prompt for a search value", () => {
    expect(prompts.value.prompt.called).to.be.true;
  });

  it("should print the results", () => {
    expect(result.print.called).to.be.true;
  });
});
