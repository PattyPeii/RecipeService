const connection = require('../database');

exports.getRecipe = async (req, res) => {
  try {
    connection.query(
      "SELECT * FROM `recipes`",
      function (error, results, fields) {
        if (error) throw error;
        res.json(results);
      }
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getRecipeByID = async (req, res) => {
  try {
    connection.query(
      `SELECT * FROM recipes WHERE id = ${req.params.id}`,
      function (error, results, fields) {
        if (error) throw error;
        res.json(results);
      }
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createRecipe = async (req, res) => {
  if (!req.body) return next(new AppError("No form data found", 404));
  var datenow = new Date().toISOString().slice(0, 19).replace('T', ' ');
  var sql = "INSERT INTO recipes (name, description, image_url, createdAt, updatedAt) VALUES(?)";
  var values = [req.body.name, req.body.description, req.body.image_url, datenow, datenow];
  try {
    connection.query(
      sql,
      [values],
      function (error, results, fields) {
        if (error) throw error;
        res.json(results);
      }
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateRecipe = async (req, res) => {
  if (!req.body) return next(new AppError("No form data found", 404));
  var datenow = new Date().toISOString().slice(0, 19).replace('T', ' ');
  var sql = `UPDATE recipes SET name = "${req.body.name}", description = "${req.body.description}", image_url = "${req.body.image_url}", updatedAt = "${datenow}" WHERE id = ${req.params.id}`;
  try {
    connection.query(
      sql,
      function (error, results, fields) {
        if (error) throw error;
        res.json(results);
      }
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteRecipe = async (req, res) => {
  var sql = `DELETE FROM recipes WHERE id = ${req.params.id}`;
  try {
    connection.query(
      sql,
      function (error, results, fields) {
        if (error) throw error;
        res.json(results);
      }
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};