const { Joi } = require('celebrate');

const envVarsSchema = Joi.object({
  MONGODB_URI: Joi.string()
    .required(),
}).unknown()
  .required();

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Common config validation error: ${error.message}`);
}

const config = {
  mongo: {
    uri: envVars.PORT,
  },
};

module.exports = config;
