const swaggerAutogen = require('swagger-autogen')()

const outputCategoryRoutesFile = './swagger_output_CategoryRoutes.json'
const endpointsCategoryRoutesFiles = ['./routes/CategoryRoutes.js']

swaggerAutogen(outputCategoryRoutesFile, endpointsCategoryRoutesFiles)

const outputFeedRoutesFile = './swagger_output_FeedRoutes.json'
const endpointsFeedRoutesFiles = ['./routes/FeedRoutes.js']

swaggerAutogen(outputFeedRoutesFile, endpointsFeedRoutesFiles)

const outputIngrediantRoutesFile = './swagger_output_IngrediantRoutes.json'
const endpointsIngrediantRoutesFiles = ['./routes/IngrediantRoutes.js']

swaggerAutogen(outputIngrediantRoutesFile, endpointsIngrediantRoutesFiles)

const outputRecipeRoutesFile = './swagger_output_RecipeRoutes.json'
const endpointsRecipeRoutesFiles = ['./routes/RecipeRoutes.js']

swaggerAutogen(outputRecipeRoutesFile, endpointsRecipeRoutesFiles)