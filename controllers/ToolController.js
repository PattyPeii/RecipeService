const connection = require('../database');


exports.getTool = async (req, res) => {
  try {
    const results = await query('SELECT * FROM tools');
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getToolByID = async (req, res) => {
  try {
    const results = await query('SELECT * FROM tools WHERE id = ?', [req.params.id]);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createTool = async (req, res) => {
  if (!req.body) return next(new AppError("No form data found", 404));
  var datenow = new Date();
  var values = [
      req.body.id, 
      req.body.name,
      datenow, 
      datenow
      ];
  try {
    const results = await query('INSERT INTO tools (id, name) VALUES(?)', [values]);
    res.json({ id: results.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateTool = async (req, res) => {
  if (!req.body) return next(new AppError("No form data found", 404));
  var datenow = new Date();
  try {
    const val = [req.body.id, req.body.name, datenow, req.params.id]
    await query('UPDATE tools SET id = ?, name = ?WHERE id = ?', val);
    res.json({ id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteTool = async (req, res) => {
  try {
    await query('DELETE FROM tools WHERE id = ?', [req.params.id]);
    res.json({ id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};