const { get } = require("lodash");
const Base = require("../base");

class Ticket extends Base {
  get primaryKey() {
    return "_id";
  }

  get foreignKeys() {
    return {
      submitter: "submitter_id",
      user: {
        submitter: "submitter_id",
        assignee: "assignee_id"
      },
      organization: "organization_id"
    };
  }

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

      return {
        row: ticket,
        related: {
          organizations: this.getOrganizations(DB, ticket),
          submitter: this.getSubmitter(DB, ticket),
          assignee: this.getAssignee(DB, ticket)
        }
      };
    });
  }

  getSubmitter(DB, ticket) {
    return DB.users.query(
      DB.users.primaryKey,
      ticket[DB.tickets.foreignKeys.user.submitter]
    );
  }

  getAssignee(DB, ticket) {
    return DB.users.query(
      DB.users.primaryKey,
      ticket[DB.tickets.foreignKeys.user.assignee]
    );
  }

  getOrganizations(DB, ticket) {
    return DB.organizations.query(
      DB.organizations.primaryKey,
      ticket[DB.tickets.foreignKeys.organization]
    );
  }
}

module.exports = Ticket;
