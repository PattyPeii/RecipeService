const connection = require('../database');
const util = require('util');
const query = util.promisify(connection.query).bind(connection);
const { userClient } = require('../grpc-client');

function getUserInformation(obj) {
  return new Promise((resolve, reject) => userClient.GetUserInformation(obj, (err, response) => {
    if (err) {
      return reject(err)
    }
    resolve(response)        
  }))
}

exports.getRecipe = async (req, res) => {
  try {
    const results = await query('SELECT * FROM recipes');
    for (const recipe of results) {
      const user = await getUserInformation({ user_id: recipe.user_id })
      recipe.user = { user_id: user.user_id, fullname: user.fullname }
      delete recipe.user_id
    }
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getRecipeByID = async (req, res) => {
  try {
    const results = await query('SELECT * FROM recipes WHERE id = ?', [req.params.id]);
    for (const recipe of results) {
      const user = await getUserInformation({ user_id: recipe.user_id })
      recipe.user = { user_id: user.user_id, fullname: user.fullname }
      delete recipe.user_id
    }
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createRecipe = async (req, res) => {
  if (!req.body) return next(new AppError("No form data found", 404));
  var datenow = new Date();
  var values = [req.body.name, req.body.description, req.body.image_url, datenow, datenow, 1];
  try {
    const results = await query('INSERT INTO recipes (name, description, image_url, createdAt, updatedAt, user_id) VALUES(?)', [values]);
    res.json({ id: results.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateRecipe = async (req, res) => {
  if (!req.body) return next(new AppError("No form data found", 404));
  var datenow = new Date();
  try {
    const val = [req.body.name, req.body.description, req.body.image_url, datenow, req.params.id]
    await query('UPDATE recipes SET name = ?, description = ?, image_url = ?, updatedAt = ? WHERE id = ?', val);
    res.json({ id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteRecipe = async (req, res) => {
  try {
    await query('DELETE FROM recipes WHERE id = ?', [req.params.id]);
    res.json({ id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};