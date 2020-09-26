require('dotenv').config();

const Express = require('express');
const App = Express();
const BodyParser = require('body-parser');
const PORT = 8081;
const cors = require('cors');
const db = require('./db/connect');
const user = require('./routes/user');


// Express Configuration
App.use(BodyParser.urlencoded({ extended: false }));
App.use(Express.static('public'));
App.use(cors({credentials: true, origin: 'http://localhost:3002'}));
App.use('/user', user(db));

// routes
App.get('/api/data', (req, res) => res.json({
  message: "Seems to work!",
}));

App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});
