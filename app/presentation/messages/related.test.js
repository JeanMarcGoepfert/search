const { expect } = require("chai");
const related = require("./related");
const sinon = require("sinon");

describe("cli message functions", () => {
  beforeEach(() => {
    sinon.spy(console, "log");
  });

  afterEach(() => {
    console.log.restore();
  });

  describe("#organizations", () => {
    it("should log correct output", () => {
      related.organizations([{ name: "zendesk" }]);
      const logs = console.log.getCalls();
      expect(logs[0].args[0]).to.include("Organization:");
      expect(logs[1].args[0]).to.include("zendesk");
    });
  });

  describe("#submittedTickets", () => {
    it("should log correct output", () => {
      related.submittedTickets([{ subject: "it's broken" }]);
      const logs = console.log.getCalls();
      expect(logs[0].args[0]).to.include("Submitted Tickets:");
      expect(logs[1].args[0]).to.include("it's broken");
    });
  });

  describe("#assignedTickets", () => {
    it("should log correct output", () => {
      related.assignedTickets([{ subject: "it's broken" }]);
      const logs = console.log.getCalls();
      expect(logs[0].args[0]).to.include("Assigned Tickets:");
      expect(logs[1].args[0]).to.include("it's broken");
    });
  });

  describe("#submitter", () => {
    it("should log correct output", () => {
      related.submitter([{ name: "john" }]);
      const logs = console.log.getCalls();
      expect(logs[0].args[0]).to.include("Submitted by:");
      expect(logs[1].args[0]).to.include("john");
    });
  });

  describe("#assignee", () => {
    it("should log correct output", () => {
      related.assignee([{ name: "john" }]);
      const logs = console.log.getCalls();
      expect(logs[0].args[0]).to.include("Assigned to:");
      expect(logs[1].args[0]).to.include("john");
    });
  });

  describe("#users", () => {
    it("should log correct output", () => {
      related.users([{ name: "john" }]);
      const logs = console.log.getCalls();
      expect(logs[0].args[0]).to.include("Users:");
      expect(logs[1].args[0]).to.include("john");
    });
  });

  describe("#tickets", () => {
    it("should log correct output", () => {
      related.tickets([{ subject: "it's broken" }]);
      const logs = console.log.getCalls();
      expect(logs[0].args[0]).to.include("Tickets:");
      expect(logs[1].args[0]).to.include("it's broken");
    });
  });

  describe("#print", () => {
    const mockData = {
      invalid: [{ some: "junk" }],
      organizations: [{ name: "organizations" }],
      submittedTickets: [{ subject: "submittedTickets" }],
      assignedTickets: [{ subject: "assignedTickets" }],
      submitter: [{ name: "submitter" }],
      assignee: [{ name: "assignee" }],
      users: [{ name: "users" }],
      tickets: [{ subject: "tickets" }]
    };

    it("should ignore invalid keys", () => {
      expect(console.log.calledWith("junk")).to.be.false;
    });

    it("should handle all valid keys", () => {
      related.print(mockData);
      expect(console.log.calledWith("organizations")).to.be.true;
      expect(console.log.calledWith("submittedTickets")).to.be.true;
      expect(console.log.calledWith("assignedTickets")).to.be.true;
      expect(console.log.calledWith("assignedTickets")).to.be.true;
      expect(console.log.calledWith("submitter")).to.be.true;
      expect(console.log.calledWith("assignee")).to.be.true;
      expect(console.log.calledWith("tickets")).to.be.true;
    });
  });
});
