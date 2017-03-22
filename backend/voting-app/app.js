const express = require('express'),
      config  = require('./server/configure'),
      app     = express(),
      mongoose = require('mongoose');

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('public-dir', __dirname + '/public');
config(app);

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/voting-app');
mongoose.connection.on('open', () => {
  console.log('Mongoose connected');
});

app.listen(app.get('port'), () => {
  console.log('Server started. Listening on port', app.get('port'));
})