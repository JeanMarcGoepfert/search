const {get} = require("lodash");
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

  getRelatedData(DB, row, queryString) {
    const matches = get(this.invertedIndex, [row, queryString], []);

    return matches.map(rowIndex => {
      const organization = this.rows[rowIndex];
      const users = DB.users.query("organization_id", organization._id);
      const tickets = DB.tickets.query("organization_id", organization._id);

      return {
        row: organization,
        related: { users, tickets }
      };
    });
  }
}

module.exports = Organization;
