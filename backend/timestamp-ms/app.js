const express = require('express'),
  moment = require('moment');

var app = express();

app.get('/', (req, res) => {
  req.render('index.html');
})

app.get('/:date', (req, res) => {
  var date = getTimestamp(req.params.date);
  res.json(date);
});

app.listen(3000, () => {
  console.log('Listeting on localhost:3000');
});

getTimestamp = d => {
  var date = new Date(d);
  if(date === 'Invalid Date')
    return date;
  
  var timestamp = moment(d.split('%20').join('-'), 'MMMM-DD-YYYY');

  return {
    unix: timestamp.format('X'),
    natural: timestamp.format('MMMM-DD-YYYY')
  };
}