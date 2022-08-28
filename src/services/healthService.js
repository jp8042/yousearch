const healthRepository = require('../repositories/healthRepository');

const healthCheck = async () => {
  await healthRepository.healthCheck();
};

module.exports = {
  healthCheck,
};
