const { get } = require("lodash");
const Base = require("../base");

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

  getRelatedData(DB, row, queryString) {
    const matches = get(this.invertedIndex, [row, queryString], []);

    return matches.map(rowIndex => {
      const user = this.rows[rowIndex];
      const organizations = DB.organizations.query("_id", user.organization_id);
      const submittedTickets = DB.tickets.query("submitter_id", user._id);
      const assignedTickets = DB.tickets.query("assignee_id", user._id);

      return {
        row: user,
        related: { organizations, assignedTickets, submittedTickets }
      };
    });
  }
}

module.exports = User;
