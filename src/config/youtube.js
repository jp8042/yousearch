const { Joi } = require('celebrate');

const envVarsSchema = Joi.object({
  API_KEYS: Joi.string()
    .required(),
  SEARCH_QUERY: Joi.string()
    .required(),
}).unknown()
  .required();

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Common config validation error: ${error.message}`);
}

const config = {
  youtube: {
    apiKeys: envVars.API_KEYS,
    data: {
      searchQuery: envVars.SEARCH_QUERY,
    },
  },
};

module.exports = config;
