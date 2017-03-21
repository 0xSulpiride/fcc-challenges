const imageSearch = require('google-images'),
      client      = new imageSearch('003153763050486721090:wltreipwprg', 'AIzaSyDaUk1rl9K_Xl-5UQuG09jJZmuixS-vUVw'),
      app         = require('express')(),
      fs          = require('fs'),
      localDb     = 'local-db.json';

app.get('/latest', (req, res) => {
  try {
    var latest = JSON.parse(fs.readFileSync(localDb));
  } catch(err) {
    fs.appendFileSync(localDb, JSON.stringify([]));
  }

  if(latest.length == 0) {
    res.send('No queries');
  } else {
    res.json(latest);
  }

});

app.get('/:query', (req, res) => {
  var query = req.params.query;
  var offset = 10;
  if(query.indexOf('?offset') > -1) {
    offset = query.split('?offset=')[1];
    query = query.split('?offset=')[0];

    if(offset > 100)
      offset = 10;
  }
  
  fs.readFile(localDb, (err, data) => {
    if(!err) {
      data = JSON.parse(data);
      data.push({
        "term": query,
        "when": (new Date()).toLocaleString()
      })
      fs.writeFile(localDb, JSON.stringify(data));
    } else {
      fs.appendFile(localDb, JSON.stringify([]));
    }
  })
  
  var response = [];
  client.search(query).then(images => {
    images.splice(0, offset).forEach(image => {
      response.push({
        url: image.url,
        thumbnail: image.thumbnail.url,
        description: image.description
      });
    });
    res.json(response);
  });
})

app.listen(3000);