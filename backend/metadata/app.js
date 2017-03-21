const express     = require('express'),
      multer      = require('multer')({dest: 'uploads/'}),
      app         = express(),
      path        = require('path');

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/', multer.any(), (req, res) => {
  res.json({"size": req.files[0].size});
});

app.listen(3000);