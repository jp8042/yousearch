const { Joi } = require('celebrate');

const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid(['development', 'staging', 'production'])
    .required(),
}).unknown()
  .required();

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Common config validation error: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
};

module.exports = config;
