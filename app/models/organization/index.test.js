const { expect } = require("chai");
const Organization = require(".");
const Base = require("../");

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
});
