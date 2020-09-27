// setup
require('dotenv').config();
const Express = require('express');
const App = Express();
const BodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const PORT = 8081;
const cors = require('cors');
const db = require('./db/connect');
const user = require('./routes/user');

// configuration
App.use(BodyParser.urlencoded({ extended: true }));
App.use(BodyParser.json());
App.use(Express.static('public'));
App.use(cors({credentials: true, origin: 'http://localhost:3002'}));
App.use(cookieSession({
  name: 'session',
  keys: ['XhsbWeGlW0Nqe8kQmYTjZqTHns600afu']
}));

// routes
App.use('/user', user(db));

App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});
