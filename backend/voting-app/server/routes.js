const index = require('../controllers/index');

module.exports.initialize = (app) => {
  app.get('/', index.main);
  app.get('/login', index.login);
  app.get('/register', index.register);
  app.get('/logout', index.logout);
  app.get('/newpoll', index.newPoll);
  app.get('/poll/:id', index.poll);
  app.get('/poll/:id/results', index.results);
  
  app.post('/register', index.postRegister);
  app.post('/login', index.postLogin);
  app.post('/newpoll', index.postNewPoll);
  app.post('/poll/:id', index.vote);
  // app.post('/', index.newPoll);

}