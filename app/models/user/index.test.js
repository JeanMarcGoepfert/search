const { expect } = require("chai");
const User = require(".");
const Ticket = require("../ticket");
const Organization = require("../organization");
const Base = require("../base");

describe("User", () => {
  it("extends Base model", () => {
    expect(User.prototype instanceof Base).to.be.true;
  });

  describe("#schema", () => {
    it("returns correct schema", () => {
      expect(new User([]).schema).to.deep.equal({
        _id: Number,
        url: String,
        external_id: String,
        name: String,
        alias: String,
        created_at: String,
        active: Boolean,
        verified: Boolean,
        shared: Boolean,
        locale: String,
        timezone: String,
        last_login_at: String,
        email: String,
        phone: String,
        signature: String,
        organization_id: Number,
        tags: Array,
        suspended: Boolean,
        role: String
      });
    });
  });

  describe("#primaryKey", () => {
    it("returns the primary key for the model", () => {
      expect(new User([]).primaryKey).to.equal("_id");
    });
  });

  describe("#foreignKeys", () => {
    it("returns the foreign keys key for the model", () => {
      expect(new User([]).foreignKeys).to.deep.equal({
        organization: "organization_id"
      });
    });
  });

  describe("#getAssignedTickets", () => {
    it("returns tickets assigned to the user", () => {
      const ticket = { _id: "1", assignee_id: "1" };
      const user = { _id: "1" };
      const DB = {
        tickets: new Ticket([ticket]),
        users: new User([user])
      };
      const result = new User([]).getAssignedTickets(DB, DB.users.rows[0]);

      expect(result).to.deep.equal([ticket]);
    });
  });

  describe("#getSubmittedTickets", () => {
    it("returns tickets submitted by the user", () => {
      const ticket = { _id: "1", submitter_id: "1" };
      const user = { _id: "1" };
      const DB = {
        tickets: new Ticket([ticket]),
        users: new User([user])
      };
      const result = new User([]).getSubmittedTickets(DB, DB.users.rows[0]);

      expect(result).to.deep.equal([ticket]);
    });
  });

  describe("#getOrganization", () => {
    it("returns organization of the user", () => {
      const organization = { _id: "1" };
      const user = { _id: "1", organization_id: "1" };
      const DB = {
        users: new User([user]),
        organizations: new Organization([organization])
      };
      const result = new User([]).getOrganizations(DB, DB.users.rows[0]);

      expect(result).to.deep.equal([organization]);
    });
  });

  describe("#queryWithRelations", () => {
    it("returns matching users with related data", () => {
      const user = { _id: "1", name: "foo", organization_id: "1" };
      const organization = { _id: "1" };
      const ticket = { _id: "1", submitter_id: "1", assignee_id: "1" };
      const DB = {
        tickets: new Ticket([ticket]),
        organizations: new Organization([organization]),
        users: new User([user])
      };
      const result = new User([user]).queryWithRelations(DB, "name", "foo");
      expect(result).to.deep.equal([
        {
          row: user,
          related: {
            organizations: [organization],
            submittedTickets: [ticket],
            assignedTickets: [ticket]
          }
        }
      ]);
    });
  });
});
