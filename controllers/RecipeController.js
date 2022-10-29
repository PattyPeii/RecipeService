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
  const text = req.query.text
  const categoryId = req.query.category_id
  const ingrediantId = req.query.ingrediant_id
  const toolId = req.query.tool_id

  let condition = []
  let params = []
  let where = ''
  if (text) {
    condition.push('r.name like ?')
    params.push(`%${text}%`)
  }
  if (categoryId) {
    condition.push('rc.category_id in (?)')
    params.push(categoryId)
  }
  if (ingrediantId) {
    condition.push('ri.ingrediant_id in (?)')
    params.push(ingrediantId)
  }
  if (toolId) {
    condition.push('rt.tool_id in (?)')
    params.push(toolId)
  }
  if (condition.length) {
    where = 'where ' + condition.join(' and ')
  }

  try {
    const results = await query(`SELECT distinct r.*
    from recipes r 
    left join recipe_categories rc on rc.recipe_id = r.id 
    left join recipe_ingrediants ri on ri.recipe_id = r.id 
    left join recipe_tools rt on rt.recipe_id  = r.id 
    ${where}
    order by r.id`, params);
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

      const ingrediantsResults = await query(
        '	SELECT ingrediants.name as name, recipe_ingrediants.amount, units.name as unit FROM (((recipes \
          LEFT JOIN recipe_ingrediants ON recipes.id = recipe_ingrediants.recipe_id) \
          LEFT JOIN ingrediants ON recipe_ingrediants.ingrediant_id = ingrediants.id) \
          LEFT JOIN units ON recipe_ingrediants.unit_id = units.id) \
          WHERE recipes.id = ?; ', [recipe.id]);
          console.log(ingrediantsResults);
      recipe.ingrediants = []
      for (const ingrediant of ingrediantsResults) {
        let ingrediantResult = {
          name: ingrediant.name, 
          amount: ingrediant.amount, 
          unit: ingrediant.unit
        }
        recipe.ingrediants.push(ingrediantResult)
      }

      const instructionsResults = await query('SELECT * FROM recipe_instructions WHERE recipe_id = ?', [recipe.id]);
      recipe.instructions = []
      for (const instruction of instructionsResults) {
        let instructionResult = {
          instruction: instruction.instruction,
          image_url: instruction.image_url,
          video_url: instruction.video_url
        }
        recipe.instructions.push(instructionResult)
      }

      const toolResults = await query(
      '	SELECT tools.name FROM ((recipes \
        LEFT JOIN recipe_tools ON recipes.id = recipe_tools.recipe_id) \
        LEFT JOIN tools ON recipe_tools.tool_id = tools.id) \
        WHERE recipes.id = ?; ', [recipe.id]);
      recipe.tools = []
      for (const tool of toolResults) {
        let toolResult = {
          tool_id: tool.name,
        }
        recipe.tools.push(toolResult)
      }

    }
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createRecipe = async (req, res) => {
  if (!req.body) return next(new AppError("No form data found", 404));
  var datenow = new Date();
  var values = [
    req.body.name, 
    req.body.description, 
    req.body.image_url, 
    datenow, 
    datenow, 
    req.body.user_id
  ];

  try {
    const results = await query('INSERT INTO recipes (name, description, image_url, createdAt, updatedAt, user_id) VALUES(?)', [values]);
    
    var recipeCategoryValues = [
      results.insertId, 
      req.body.category_id
    ];

    const resultsRecipeCategory = await query('INSERT INTO recipe_categories (recipe_id, category_id) VALUES(?)', [recipeCategoryValues]);

    for (const ingrediant of req.body.ingrediants) {
      var recipeIngrediantValues = [
        results.insertId,
        ingrediant.ingrediant_id,
        ingrediant.amount,
        ingrediant.unit_id
      ];
  
      const resultsRecipeIngrediant = await query('INSERT INTO recipe_ingrediants (recipe_id, ingrediant_id, amount, unit_id) VALUES(?)', [recipeIngrediantValues]);
    }

    for (const instruction of req.body.instructions) {
      var recipeInstructionValues = [
        results.insertId,
        instruction.instruction,
        instruction.image_url,
        instruction.video_url
      ];
  
      const resultsRecipeInstruction = await query('INSERT INTO recipe_instructions (recipe_id, instruction, image_url, video_url) VALUES(?)', [recipeInstructionValues]);
    }

    for (const tool of req.body.tools) {
      var recipeToolValues = [
        results.insertId,
        tool.tool_id
      ];
  
      const resultsRecipeInstruction = await query('INSERT INTO recipe_tools (recipe_id, tool_id) VALUES(?)', [recipeToolValues]);
    }

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