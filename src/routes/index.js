// const { celebrate } = require('celebrate');
// const { celebrate } = require('celebrate');
const healthController = require('../controller/healthController');

module.exports = (app) => {
  //= ===================================================================================
  // Health routes
  //= ===================================================================================

  app.get('/health', healthController.getHealthStatus);

  //= ===================================================================================
  // Youtube routes
  //= ===================================================================================

  // app.get('/search', celebrate(schemas.))
};
