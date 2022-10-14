const connection = require('../database');

exports.getCategory = async (req, res) => {
  try {
    connection.query(
      "SELECT * FROM `categories`",
      function (error, results, fields) {
        if (error) throw error;
        res.json(results);
      }
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
