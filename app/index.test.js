const { expect } = require("chai");
const sinon = require("sinon");
const files = require("./utils/files");
const presenter = require("./cli");
const { init, sources } = require("./");
const { readJSONFiles } = require("./utils/files");
const models = require("./models");

describe("sources", () => {
  it("should refer to valid json files", async () => {
    const response = await readJSONFiles(sources);
    expect(response).to.exist
  });
});

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
    promptStub = sinon.stub(presenter, "init");
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
    expect(presenter.init.called).to.be.true;
  });
});
