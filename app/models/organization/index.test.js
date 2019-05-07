const { expect } = require("chai");
const Base = require("../base");
const Organization = require(".");
const User = require("../user");
const Ticket = require("../ticket");

describe("Organization", () => {
  it("extends Base model", () => {
    expect(Organization.prototype instanceof Base).to.be.true;
  });

  describe("#shape", () => {
    it("returns correct shape", () => {
      expect(new Organization([]).shape()).to.deep.equal({
        _id: Number,
        url: String,
        external_id: String,
        name: String,
        domain_names: Array,
        created_at: String,
        details: String,
        shared_tickets: Boolean,
        tags: Array
      });
    });
  });

  describe("#primaryKey", () => {
    it("returns the primary key for the model", () => {
      expect(new Organization([]).primaryKey).to.equal("_id");
    });
  });

  describe("#getUsers", () => {
    it("returns users related to the organization", () => {
      const user = { _id: "1", organization_id: "1" };
      const organization = { _id: "1" };
      const DB = {
        users: new User([user]),
        organizations: new Organization([organization])
      };
      const result = new Organization([]).getUsers(
        DB,
        DB.organizations.rows[0]
      );

      expect(result).to.deep.equal([user]);
    });
  });

  describe("#getTickets", () => {
    it("returns tickets related to the organization", () => {
      const ticket = { _id: "1", organization_id: "1" };
      const organization = { _id: "1" };
      const DB = {
        tickets: new Ticket([ticket]),
        organizations: new Organization([organization])
      };
      const result = new Organization([]).getTickets(DB, DB.tickets.rows[0]);

      expect(result).to.deep.equal([ticket]);
    });
  });

  describe("#getRelatedData", () => {
    it("returns matching organizations with related data", () => {
      const ticket = { _id: "1", organization_id: "1" };
      const user = { _id: "1", organization_id: "1" };
      const organization = { _id: "1", name: "foo" };
      const DB = {
        tickets: new Ticket([ticket]),
        organizations: new Organization([organization]),
        users: new User([user])
      };
      const result = new Organization([organization]).getRelatedData(
        DB,
        "name",
        "foo"
      );
      expect(result).to.deep.equal([
        {
          row: organization,
          related: { users: [user], tickets: [ticket] }
        }
      ]);
    });
  });
});
