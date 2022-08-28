const mongoose = require('mongoose');

const healthCheck = async () => {
  if (mongoose.connection.readyState !== 1) {
    throw (new Error(`Mongoose connection State ${mongoose.STATES[mongoose.connection.readyState]}`));
  }
};

module.exports = {
  healthCheck,
};
