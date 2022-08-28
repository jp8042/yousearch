const { Joi } = require('celebrate');

const getVideosByKeywords = {
  query: Joi.object({
    keywords: Joi.string().required(),
    page: Joi.number().default(1),
    size: Joi.number().default(10),
    sort: Joi.string().valid(['asc', 'desc']).default('desc'),
  }).unknown().required(),
};

const getVideosByKeywordsV2 = {
  query: Joi.object({
    keywords: Joi.string().required(),
    lastPublishedAt: Joi.string().required(),
    size: Joi.number().default(10),
    sort: Joi.string().valid(['asc', 'desc']).default('desc'),
  }).unknown().required(),
};

module.exports = {
  getVideosByKeywords,
  getVideosByKeywordsV2,
};
