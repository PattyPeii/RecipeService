const connection = require("../database");
const util = require("util");
const query = util.promisify(connection.query).bind(connection);

exports.getCategory = async (req, res) => {
  console.log("get category");
  try {
    const results = await query("SELECT * FROM categories");
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCategoryByID = async (req, res) => {
  try {
    const results = await query("SELECT * FROM categories WHERE id = ?", [
      req.params.id,
    ]);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createCategory = async (req, res) => {
  if (!req.body) return next(new AppError("No form data found", 404));
  var datenow = new Date();
  var values = [req.body.id, req.body.name, datenow, datenow];
  try {
    const results = await query(
      "INSERT INTO categories (id, name, createdAt, updatedAt) VALUES(?)",
      [values]
    );
    res.json({ id: results.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateCategory = async (req, res) => {
  if (!req.body) return next(new AppError("No form data found", 404));
  var datenow = new Date();
  try {
    const val = [req.body.id, req.body.name, datenow, req.params.id];
    await query(
      "UPDATE categories SET id = ?, name = ?, updatedAt = ? WHERE id = ?",
      val
    );
    res.json({ id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    await query("DELETE FROM categories WHERE id = ?", [req.params.id]);
    res.json({ id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
