const connection = require('../database');
const util = require('util');
const query = util.promisify(connection.query).bind(connection);

exports.getIngrediant = async (req, res) => {
    try {
      const results = await query('SELECT * FROM ingrediants');
      res.json(results);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  exports.getIngrediantByID = async (req, res) => {
    try {
      const results = await query('SELECT * FROM ingrediants WHERE id = ?', [req.params.id]);
      res.json(results);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  exports.createIngrediant = async (req, res) => {
    if (!req.body) return next(new AppError("No form data found", 404));
    var datenow = new Date();
    var values = [
        req.body.name
        ];
    try {
      const results = await query('INSERT INTO ingrediants (name) VALUES(?)', [values]);
      res.json({ id: results.insertId });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  exports.updateIngrediant = async (req, res) => {
    if (!req.body) return next(new AppError("No form data found", 404));
    var datenow = new Date();
    try {
      const val = [req.body.id, req.body.name, datenow, req.params.id]
      await query('UPDATE ingrediants SET id = ?, name = ? WHERE id = ?', val);
      res.json({ id: req.params.id });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  exports.deleteIngrediant = async (req, res) => {
    try {
      await query('DELETE FROM ingrediants WHERE id = ?', [req.params.id]);
      res.json({ id: req.params.id });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };