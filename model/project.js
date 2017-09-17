const mongoose = require('mongoose')

// project schema
let projectSchema = mongoose.Schema({
  projectName: {
    type: String
  },
  Technologies: {
    type: String
  },
  picturePath: {
    type: String
  },
  projectUrl: {
    type: String
  },
  Description: {
    type: String
  }
});


module.exports = mongoose.model('projects', projectSchema);
