const router = require("express").Router();

module.exports = (db) => {

  router.post('/signup', (req, res) => {
    db.query(`
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING *;
    `, [req.body.name, req.body.email, req.body.password])
    .then(response => {
      res.send(response.rows[0]);
    })
    .catch(err => console.error(err));
  });

  return router;
}