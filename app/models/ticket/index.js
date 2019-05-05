const Base = require("../");

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
}

module.exports = Ticket;
