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

exports.getFeed = async (req, res) => {
  let userId = ''
  let follows = []
  try {
    const results = await query(`select * from recipes r order by createdAt desc limit 10`);
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
