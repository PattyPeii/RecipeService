const connection = require('../database');


exports.getUnit = async (req, res) => {
  try {
    const results = await query('SELECT * FROM units');
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUnitByID = async (req, res) => {
  try {
    const results = await query('SELECT * FROM units WHERE id = ?', [req.params.id]);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createUnit = async (req, res) => {
  if (!req.body) return next(new AppError("No form data found", 404));
  var datenow = new Date();
  var values = [
      req.body.id, 
      req.body.name,
      datenow, 
      datenow
      ];
  try {
    const results = await query('INSERT INTO units (id, name, createdAt, updatedAt) VALUES(?)', [values]);
    res.json({ id: results.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateUnit = async (req, res) => {
  if (!req.body) return next(new AppError("No form data found", 404));
  var datenow = new Date();
  try {
    const val = [req.body.id, req.body.name, datenow, req.params.id]
    await query('UPDATE units SET id = ?, name = ?, updatedAt = ? WHERE id = ?', val);
    res.json({ id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteUnit = async (req, res) => {
  try {
    await query('DELETE FROM units WHERE id = ?', [req.params.id]);
    res.json({ id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};