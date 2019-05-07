const { get } = require("lodash");
const Base = require("../base");

class Organization extends Base {
  get primaryKey() {
    return "_id";
  }

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

      return {
        row: organization,
        related: {
          users: this.getUsers(DB, organization),
          tickets: this.getTickets(DB, organization)
        }
      };
    });
  }

  getUsers(DB, organization) {
    return DB.users.query(
      DB.users.foreignKeys.organization,
      organization[this.primaryKey]
    );
  }

  getTickets(DB, organization) {
    return DB.tickets.query(
      DB.tickets.foreignKeys.organization,
      organization[this.primaryKey]
    );
  }
}

module.exports = Organization;
