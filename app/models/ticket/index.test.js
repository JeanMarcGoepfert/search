const { expect } = require("chai");
const Ticket = require(".");
const User = require("../user");
const Organization = require("../organization");
const Base = require("../base");

describe("Ticket", () => {
  it("extends Base model", () => {
    expect(Ticket.prototype instanceof Base).to.be.true;
  });

  describe("#schema", () => {
    it("returns correct schema", () => {
      expect(new Ticket([]).schema).to.deep.equal({
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

  describe("#primaryKey", () => {
    it("returns the primary key for the model", () => {
      expect(new Ticket([]).primaryKey).to.equal("_id");
    });
  });

  describe("#foreignKeys", () => {
    it("returns the foreign keys key for the model", () => {
      expect(new Ticket([]).foreignKeys).to.deep.equal({
        submitter: "submitter_id",
        user: {
          submitter: "submitter_id",
          assignee: "assignee_id"
        },
        organization: "organization_id"
      });
    });
  });

  describe("#getSubmitter", () => {
    it("returns submitter of the ticket", () => {
      const user = { _id: "1" };
      const ticket = { _id: "1", submitter_id: "1" };
      const DB = {
        tickets: new Ticket([ticket]),
        users: new User([user])
      };
      const result = new Ticket([]).getSubmitter(DB, DB.tickets.rows[0]);

      expect(result).to.deep.equal([user]);
    });
  });

  describe("#getAssignee", () => {
    it("returns assignee of the ticket", () => {
      const user = { _id: "1" };
      const ticket = { _id: "1", assignee_id: "1" };
      const DB = {
        tickets: new Ticket([ticket]),
        users: new User([user])
      };
      const result = new Ticket([]).getAssignee(DB, DB.tickets.rows[0]);

      expect(result).to.deep.equal([user]);
    });
  });

  describe("#getOrganization", () => {
    it("returns organization of the ticket", () => {
      const organization = { _id: "1" };
      const ticket = { _id: "1", organization_id: "1" };
      const DB = {
        tickets: new Ticket([ticket]),
        organizations: new Organization([organization])
      };
      const result = new Ticket([]).getOrganizations(DB, DB.tickets.rows[0]);

      expect(result).to.deep.equal([organization]);
    });
  });

  describe("#getRelatedData", () => {
    it("returns matching tickets with related data", () => {
      const ticket = {
        _id: "1",
        organization_id: "1",
        assignee_id: "1",
        submitter_id: "2",
        subject: "foo"
      };
      const user1 = { _id: "1" };
      const user2 = { _id: "2" };
      const organization = { _id: "1" };
      const DB = {
        tickets: new Ticket([ticket]),
        organizations: new Organization([organization]),
        users: new User([user1, user2])
      };
      const result = new Ticket([ticket]).getRelatedData(DB, "subject", "foo");
      expect(result).to.deep.equal([
        {
          row: ticket,
          related: {
            assignee: [user1],
            submitter: [user2],
            organizations: [organization]
          }
        }
      ]);
    });
  });
});
