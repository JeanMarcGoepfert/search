const { get } = require("lodash");
const Base = require("../base");

class Ticket extends Base {
  shape() {
    return {
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
    };
  }

  getRelatedData(DB, row, queryString) {
    const matches = get(this.invertedIndex, [row, queryString], []);

    return matches.map(rowIndex => {
      const ticket = this.rows[rowIndex];
      const organizations = DB.organizations.query(
        "_id",
        ticket.organization_id
      );
      const submitter = DB.users.query("_id", ticket.submitter_id);
      const assignee = DB.users.query("_id", ticket.assignee_id);

      return {
        row: ticket,
        related: { organizations, submitter, assignee }
      };
    });
  }
}

module.exports = Ticket;
