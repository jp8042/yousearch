const { Joi } = require('celebrate');

const envVarsSchema = Joi.object({
  PORT: Joi.number()
    .required(),
}).unknown()
  .required();

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Common config validation error: ${error.message}`);
}

const config = {
  server: {
    port: envVars.PORT,
  },
};

module.exports = config;
