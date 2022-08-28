const Videos = require('../schemas/dao/video');

const saveVideos = async (videos) => {
  try {
    const savedVideos = await Videos.insertMany(videos);
    return savedVideos;
  } catch (err) {
    console.log(`Error in saveVideos api: ${JSON.stringify(err.message)}`);
    throw err;
  }
};

const getVideosCount = async (query) => {
  try {
    const count = await Videos.countDocuments(query);
    return count;
  } catch (err) {
    console.log(`Error in getVideosCount api: ${JSON.stringify(err.message)}`);
    throw err;
  }
};

const getVideosByKeywords = async (query, size, page, sort) => {
  try {
    const videos = await Videos.find(query)
      .skip(size * (page - 1))
      .limit(size)
      .sort([['publishedAt', sort === 'desc' ? -1 : 1]])
      .lean()
      .exec();
    return videos;
  } catch (err) {
    console.log(`Error in getVideosByKeywords api: ${JSON.stringify(err.message)}`);
    throw err;
  }
};

const getVideosByKeywordsV2 = async (query, size, sort) => {
  try {
    const videos = await Videos.find(query)
      .limit(size)
      .sort([['publishedAt', sort === 'desc' ? -1 : 1]])
      .lean()
      .exec();
    return videos;
  } catch (err) {
    console.log(`Error in getVideosByKeywordsV2 api: ${JSON.stringify(err.message)}`);
    throw err;
  }
};

module.exports = {
  saveVideos,
  getVideosCount,
  getVideosByKeywords,
  getVideosByKeywordsV2,
};
