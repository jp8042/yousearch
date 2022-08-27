// const { celebrate } = require('celebrate');
const healthController = require('../controller/healthController');

module.exports = (app) => {
  //= ===================================================================================
  // Health routes
  //= ===================================================================================

  app.get('/health', healthController.getHealthStatus);
};
