const router = require("express").Router();

module.exports = (db) => {

  router.get('/signup', (req, res) => {
    db.query(`
    SELECT * FROM users;
    `)
    .then(response => {
      res.send(response.rows[0]);
    })
    .catch(err => console.log(err));
  });

  return router;
}