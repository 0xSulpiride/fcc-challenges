const mongoose = require('mongoose'),
      Schema  = mongoose.Schema;

var pollSchema = new Schema({
  title: { type: String },
  options: [String],
  author: { type: String },
  voteA: { type: Number, default: 0 },
  voteB: { type: Number, default: 0}
});

module.exports = mongoose.model('poll', pollSchema);