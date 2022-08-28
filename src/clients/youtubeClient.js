const axios = require('axios');

const searchVideos = async (query) => {
  const url = `https://youtube.googleapis.com/youtube/v3/search?${query}`;
  const options = {
    headers: {
      Accept: 'application/json',
    },
    timeout: 10000,
    responseType: 'json',
    responseEncoding: 'utf8',
  };
  try {
    const axiosResponse = await axios.get(url, options);
    console.log(`Response code searchVideos api: ${axiosResponse.status}`);
    return axiosResponse.data;
  } catch (error) {
    if (error.response) {
      const errorResponse = error.response;
      console.log(`Error code searchVideos api: ${errorResponse.status}`);
      console.log(`Error response searchVideos api: ${JSON.stringify(error)}`);
      throw error;
    } else {
      console.log(`Error in searchVideos api: ${JSON.stringify(error.message)}`);
      throw error;
    }
  }
};

module.exports = {
  searchVideos,
};
