const { OK } = require('http-status-codes');

const healthService = require('../services/healthService');

const getHealthStatus = async (req, res, next) => {
  try {
    await healthService.healthCheck();
    res.status(OK).json({});
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getHealthStatus,
};
