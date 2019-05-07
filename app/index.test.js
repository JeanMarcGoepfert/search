const { expect } = require("chai");
const sinon = require("sinon");
const files = require("./utils/files");
const presenter = require("./cli");
const init = require("./");
const models = require("./models");

describe("init", () => {
  let readJSONFilesStub;
  let userModelStub;
  let ticketModelStub;
  let organizationModelStub;
  let promptStub;

  before(async () => {
    readJSONFilesStub = sinon.stub(files, "readJSONFiles").resolves([1, 2, 3]);
    userModelStub = sinon.stub(models, "User");
    ticketModelStub = sinon.stub(models, "Ticket");
    organizationModelStub = sinon.stub(models, "Organization");
    promptStub = sinon.stub(presenter, "prompt").resolves();
    await init();
  });

  after(() => {
    readJSONFilesStub.reset();
    userModelStub.reset();
    ticketModelStub.reset();
    organizationModelStub.reset();
    promptStub.reset();
  });

  it("should read json files", () => {
    const filePaths = [
      "files/users.json",
      "files/tickets.json",
      "files/organizations.json"
    ];
    expect(files.readJSONFiles.calledWith(filePaths)).to.be.true;
  });

  it("should initialize a user model", () => {
    expect(models.User.calledWith(1)).to.be.true;
  });

  it("should initialize a tickets model", () => {
    expect(models.Ticket.calledWith(2)).to.be.true;
  });

  it("should initialize an organizations model", () => {
    expect(models.Organization.calledWith(3)).to.be.true;
  });

  it("should prompt the user", () => {
    expect(presenter.prompt.called).to.be.true;
  });
});
