const Models = require('../models'),
  validator = require('validator'),
  md5 = require('js-md5');

module.exports = {
  main: (req, res) => {
    if (req.cookies.showDashboard) {
      Models.User.findOne({ cookie: req.cookies.user }, (err, user) => {
        if (err) {
          //TODO Show flash-message
        } else {
          return res.render('index.hbs', { layout: 'dashboard', username: user.username });
        }
      });
    } else {
      return res.render('index.hbs');
    }
  },
  login: (req, res) => {
    return res.render('login.hbs');
  },
  register: (req, res) => {
    return res.render('register.hbs');
  },
  logout: (req, res) => {
    res.clearCookie('user');
    res.clearCookie('showDashboard');
    return res.redirect('/');
  },
  newPoll: (req, res) => {
    if (req.cookies.showDashboard) {
      Models.User.findOne({ cookie: req.cookies.user }, (err, user) => {
        if (err) {
          //TODO Show flash-message
        } else {
          return res.render('newpoll.hbs', { layout: 'dashboard', username: user.username });
        }
      });
    } else {
      return res.render('index.hbs');
    }
  },
  postNewPoll: (req, res) => {
    var title = req.body.title,
      options = [req.body.option1, req.body.option2];
    var poll = new Models.Poll({
      title,
      options,
      author: req.cookies.user
    });

    if (!poll.author) {
      return res.render('/');
    }

    poll.save().then((p) => {
      res.redirect('/poll/' + p._id);
    }).catch(err => {
      res.redirect('/');
    });
  },
  poll: (req, res) => {
    var pollId = req.params.id;
    if (req.cookies.showDashboard) {
      Models.Poll.findById(pollId).then(poll => {
        Models.User.findOne({ cookie: poll.author }).then((user) => {
          return res.render('poll.hbs', {
            layout: 'dashboard',
            title: poll.title,
            optionA: poll.options[0],
            optionB: poll.options[1],
            author: user.username
          });
        });
      }).catch(err => {
        res.redirect('/nosuchpoll');
      });
    } else {
      return res.render('poll.hbs', { title: poll.title, options: poll.options });
    }
  },
  postRegister: (req, res) => {
    var username = req.body.username,
      password = req.body.password,
      email = req.body.email;

    if (password.length < 6) {
      return res.redirect('/register');
      //TODO Show flash-message 'password should be at least of 6 characters'
    }
    if (!validator.isEmail(email)) {
      return res.redirect('/register');
      //TODO Show flash-message 'Invalid email'
    }

    password = md5(password);
    var cookie = md5(username + password);
    var user = new Models.User({ username, password, email, cookie });
    user.save().then(doc => {
      res.cookie('user', cookie);
      res.cookie('showDashboard', 'true');
      return res.redirect('/');
    }).catch(err => {
      return res.redirect('/register');
      //TODO Show flash-message
    })
  },
  postLogin: (req, res) => {
    var username = req.body.username,
      password = req.body.password;

    if (password.length < 6) {
      return res.redirect('/login');
      //TODO Show flash-message 'password too short'
    }
    password = md5(password);
    Models.User.findOne({ username }, (err, user) => {
      if (err) {
        return res.redirect('/login');
        //TODO Show flash-message 'wrong username'
      }

      if (user.password == password) {
        res.cookie('user', md5(username + password));
        res.cookie('showDashboard', 'true');
        return res.redirect('/');
      } else {
        return res.redirect('/login');
        //TODO Show flash-message 'wrong password'
      }
    })
  },
  vote: (req, res) => {
    var id = req.params.id;
    var option = +req.body.vote;

    console.log(id, option);

    // Models.Poll
    //   .where({ _id: id })
    //   .update({ $inc: update });
    if(option)
      Models.Poll.findByIdAndUpdate(id, { $inc: { voteB: 1 }}, () => {});
    else 
      Models.Poll.findByIdAndUpdate(id, { $inc: { voteB: 1 }}, () => {});
    res.send('');
  },
  results: (req, res) => {
    var id = req.params.id;
    Models.Poll.findById(id).then(poll => {
      layout = req.cookies.showDashboard ? 'dashboard' : 'main';
      res.render('results.hbs', {layout: layout, optionA: {votes: poll.voteA, body: poll.options[0] }, optionB:  {votes: poll.voteB, body: poll.options[1]}});
    });
  }
}