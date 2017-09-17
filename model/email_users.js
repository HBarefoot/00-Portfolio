const mongoose = require('mongoose')

// project schema
let email_usersSchema = mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  comment: {
    type: String
  }
});


module.exports = mongoose.model('email_users', email_usersSchema);
