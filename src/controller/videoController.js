const { OK } = require('http-status-codes');

const videoService = require('../services/videoService');

const getVideosByKeywords = async (req, res) => {
  try {
    const {
      keywords, size, page, sort,
    } = req.query;
    console.log(`getVideosByKeywords: keywords: ${keywords}, size: ${size}, page: ${page}, sortBy: ${sort}`);
    const result = await videoService.getVideosByKeywords(req.query);
    res.status(OK).json(result);
  } catch (err) {
    console.log(`Error in getVideosByKeywords api: ${JSON.stringify(err)}`);
  }
};

const getVideosByKeywordsV2 = async (req, res) => {
  try {
    const {
      keywords, lastPublishedAt, size, sort,
    } = req.query;
    console.log(`getVideosByKeywordsV2: keywords: ${keywords}, lastPublishedAt: ${lastPublishedAt}, size: ${size}, sortBy: ${sort}`);
    const result = await videoService.getVideosByKeywordsV2(req.query);
    res.status(OK).json(result);
  } catch (err) {
    console.log(`Error in getVideosByKeywordsV2 api: ${JSON.stringify(err)}`);
  }
};

module.exports = {
  getVideosByKeywords,
  getVideosByKeywordsV2,
};
