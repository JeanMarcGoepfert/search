const Base = require("../base");

class Organization extends Base {
  shape() {
    return {
      _id: Number,
      url: String,
      external_id: String,
      name: String,
      domain_names: Array,
      created_at: String,
      details: String,
      shared_tickets: Boolean,
      tags: Array
    };
  }
}

module.exports = Organization;
