const { expect } = require("chai");
const Ticket = require(".");
const Base = require("../base");

describe("Ticket", () => {
  it("extends Base model", () => {
    expect(Ticket.prototype instanceof Base).to.be.true;
  });

  describe("#shape", () => {
    it("returns correct shape", () => {
      expect(new Ticket([]).shape()).to.deep.equal({
        _id: String,
        url: String,
        external_id: String,
        created_at: String,
        type: String,
        subject: String,
        description: String,
        priority: String,
        status: String,
        submitter_id: Number,
        assignee_id: Number,
        organization_id: Number,
        tags: Array,
        has_incidents: Boolean,
        due_at: String,
        via: String
      });
    });
  });
});
