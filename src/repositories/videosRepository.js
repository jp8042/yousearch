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

module.exports = {
  saveVideos,
};
