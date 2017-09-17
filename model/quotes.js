const mongoose = require('mongoose')

// project schema
let quoteSchema = mongoose.Schema({
  quotesBody: {
    type: String
  },
  author: {
    type: String
  }
});


module.exports = mongoose.model('quotes', quoteSchema);
