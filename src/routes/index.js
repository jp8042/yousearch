const { celebrate } = require('celebrate');
const schemas = require('../schemas/dto');
const healthController = require('../controller/healthController');
const videoController = require('../controller/videoController');

module.exports = (app) => {
  //= ===================================================================================
  // Health routes
  //= ===================================================================================

  app.get('/health', healthController.getHealthStatus);

  //= ===================================================================================
  // Youtube routes
  //= ===================================================================================

  app.get('/v1/search', celebrate(schemas.videoSchema.getVideosByKeywords), videoController.getVideosByKeywords);

  app.get('/v2/search', celebrate(schemas.videoSchema.getVideosByKeywordsV2), videoController.getVideosByKeywordsV2);
};
