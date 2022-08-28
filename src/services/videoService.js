const _ = require('lodash');
const nlp = require('compromise');
const { youtube } = require('../config/youtube');
const youtubeClient = require('../clients/youtubeClient');
const videosRepository = require('../repositories/videosRepository');

const workingApiKeyIndex = 0;

const getYoutubeVideoQuery = (query) => `part=snippet&q=${query.replaceAll('#', '%7C')}&type=video&key=${_.split(youtube.apiKeys, ',')[workingApiKeyIndex]}&order=date&publishedAfter=${new Date(Date.now() - (20 * 1002)).toISOString()}`;

const getDBStorableVideos = (youtubeVideos) => {
  const videos = [];
  _.forEach(youtubeVideos, (video) => {
    const videoObj = {
      external_video_id: video.id.videoId,
      title: video.snippet.title,
      description: video.snippet.description,
      published_at: video.snippet.publishedAt,
      channel_id: video.snippet.channelId,
      channel_title: video.snippet.channelTitle,
      tags: [],
      thumbnails: {
        default: {
          url: video.snippet.thumbnails.default.url,
          width: video.snippet.thumbnails.default.width,
          height: video.snippet.thumbnails.default.height,
        },
        medium: {
          url: video.snippet.thumbnails.medium.url,
          width: video.snippet.thumbnails.medium.width,
          height: video.snippet.thumbnails.medium.height,
        },
        high: {
          url: video.snippet.thumbnails.high.url,
          width: video.snippet.thumbnails.high.width,
          height: video.snippet.thumbnails.high.height,
        },
      },
    };
    const tags = nlp(videoObj.title).topics().out('array');
    _.forEach(tags, (tag) => {
      videoObj.tags.push(tag);
    });
    videos.push(videoObj);
  });
  return videos;
};

const searchVideos = async (query) => {
  const doc = nlp(query);
  const queryNouns = doc.topics().text();
  const youtubeVideoQuery = getYoutubeVideoQuery(`${query}#${queryNouns}`);
  console.log(youtubeVideoQuery);
  try {
    const youtubeResults = await youtubeClient.searchVideos(youtubeVideoQuery);
    const DBStorableVideos = getDBStorableVideos(youtubeResults.items);
    await videosRepository.saveVideos(DBStorableVideos);
    // console.log(DBStorableVideos);
  } catch (err) {
    console.log(`Error in searchVideos api: ${JSON.stringify(err.message)}`);
    // throw err;
  }
};

module.exports = {
  searchVideos,
};
