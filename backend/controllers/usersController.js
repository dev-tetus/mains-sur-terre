const pool = require("../config/Db/DBConfig");

//* Get all users
const getUsers = async (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) console.log(err);
    connection.query("SELECT * FROM users", (e, results) => {
      res.send(results);
    });
  });
};

//*Get user profile
const getUserProfile = (req, res) => {
  res.send(req.session.name).status(200);
};

module.exports = {
  getUsers,
  getUserProfile,
};
