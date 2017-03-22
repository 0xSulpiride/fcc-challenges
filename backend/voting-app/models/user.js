var mongoose  = require('mongoose'),
    Schema    = mongoose.Schema;

var userSchema = new Schema({
  username: { type: String, unique: true },
  password: { type: String },
  email:    { type: String, unique: true },
  cookie:   { type: String}
});

module.exports = mongoose.model('user', userSchema);