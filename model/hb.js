const mongoose = require('mongoose')

// admin schema
let adminHBSchema = mongoose.Schema({
  name: {
    type: String
  },
  phoneNumber: {
    type: String
  },
  email: {
    type: String
  },
  about_me: {
    type: String
  },
  certification_name: {
    type: String
  },
  cert_img_link: {
    type: String
  },
  skills: {
    type: String
  }
});


module.exports = mongoose.model('hb', adminHBSchema);
