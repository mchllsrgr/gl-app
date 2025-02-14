const router = require("express").Router();
const bcrypt = require('bcrypt');

module.exports = (db) => {

  router.post('/signup', (req, res) => {
    db.query(`
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING *;
    `, [req.body.name, req.body.email, bcrypt.hashSync(req.body.password, 10)])
    .then(response => {
      const user = response.rows[0];
      req.session.userId = user.id;
      res.send(user);
    })
    .catch(err => console.error(err));
  });

  router.post('/login', (req, res) => {
    db.query(`
    SELECT * FROM users
    WHERE email = $1;
    `, [req.body.email])
    .then(response => {
      const user = response.rows[0];
      const inputPassword = req.body.password;
      const dbPassword = response.rows[0].password;
      // check if email/password combo matches and send error if not
      if (bcrypt.compareSync(inputPassword, dbPassword)) {
        req.session.userId = user.id;
        res.send(user);
      } else {
        res.send({error: 'Incorrect email/password combination'});
      }
    })
    .catch(err => console.error(err));
  });

  router.post('/logout', (req, res) => {
    res.clearCookie('session');
    res.clearCookie('session.sig');
    res.send({});
  });

  return router;
}