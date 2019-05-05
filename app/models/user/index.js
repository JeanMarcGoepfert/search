const Base = require("../");

class User extends Base {
  shape() {
    return {
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
    };
  }
}

module.exports = User;
