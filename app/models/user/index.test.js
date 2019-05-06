const { expect } = require("chai");
const User = require(".");
const Base = require("../base");

describe("User", () => {
  it("extends Base model", () => {
    expect(User.prototype instanceof Base).to.be.true;
  });

  describe("#shape", () => {
    it("returns correct shape", () => {
      expect(new User([]).shape()).to.deep.equal({
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
});
