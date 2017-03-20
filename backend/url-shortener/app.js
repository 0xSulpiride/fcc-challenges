const express = require('express'),
      fs  = require('fs');

var app = express();

app.get('/', (req, res) => {
  var usage = 'Usage:' +
              '\n /new/[url] creates a short link to [url]' +
              '\n /[shortlink] redirects to [url]';
  res.write(usage);
  res.end();
})

app.get('/new/:url*', (req, res) => {
    var url = req.params.url + req.params[0];

    var db = JSON.parse(fs.readFileSync('local-db.json'));
    db[++db.count] = url;

    fs.writeFileSync('local-db.json', JSON.stringify(db));

    res.json({
      "original_url": url,
      "short_url": db.count
    });
});

app.get('/:shorturl', (req, res) => {
  var shortlink = req.params.shorturl;

  var db = JSON.parse(fs.readFileSync('local-db.json'));
  if(db[shortlink] && shortlink !== 'count') {
    res.redirect(db[shortlink]);
  }
  else {
    var msg = 'Invalid URL. Try one of these: ' + JSON.stringify(db,undefined,2);
    res.write(msg);
    res.end();
  }
})

app.listen(3000);