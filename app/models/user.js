const { get } = require("lodash");
const Base = require("./base");

class User extends Base {
  get primaryKey() {
    return "_id";
  }

  get foreignKeys() {
    return {
      organization: "organization_id"
    };
  }

  get schema() {
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

  queryWithRelations(DB, row, queryString) {
    const matches = get(this.invertedIndex, [row, queryString], []);
    return matches.map(rowIndex => {
      const user = this.rows[rowIndex];
      return {
        row: user,
        related: {
          organizations: this.getOrganizations(DB, user),
          submittedTickets: this.getSubmittedTickets(DB, user),
          assignedTickets: this.getAssignedTickets(DB, user)
        }
      };
    });
  }

  getAssignedTickets(DB, user) {
    return DB.tickets.query(
      DB.tickets.foreignKeys.user.assignee,
      user[this.primaryKey]
    );
  }

  getSubmittedTickets(DB, user) {
    return DB.tickets.query(
      DB.tickets.foreignKeys.user.submitter,
      user[this.primaryKey]
    );
  }

  getOrganizations(DB, user) {
    return DB.organizations.query(
      DB.users.primaryKey,
      user[this.foreignKeys.organization]
    );
  }
}

module.exports = User;
