const path          = require('path'),
      hbs           = require('express-handlebars'),
      bodyParser    = require('body-parser'),
      routes        = require('./routes'),
      express       = require('express'),
      cookieParser  = require('cookie-parser');

module.exports = (app) => {
  app.engine('hbs', hbs({
    defaultLayout: 'main',
    layoutsDir: app.get('views') + '/layouts',
    partialsDir: app.get('views') + '/partials',
    helpers: {},
    extname: 'hbs'
  }));
  app.set('view engine', 'hbs');
  app.use(bodyParser());
  app.use('/public', express.static(app.get('public-dir')));

  app.use(cookieParser('mysecret'));

  routes.initialize(app);

  return app;
}