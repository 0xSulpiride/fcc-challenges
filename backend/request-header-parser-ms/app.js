const express = require('express');

var app = express();

app.get('/', (req, res) => {
  res.json({
    "ipaddress": req.ip,
    "language": req.acceptsLanguages()[0],
    "software": req.headers['user-agent'].split('(')[1].split(')')[0]
  });
  // console.log(res);
}).listen(3000);