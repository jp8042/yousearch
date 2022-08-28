const _ = require('lodash');
const nlp = require('compromise');
const { youtube } = require('../config/youtube');
const youtubeClient = require('../clients/youtubeClient');
const videosRepository = require('../repositories/videosRepository');
// TODO: logic to update workingApiKeyIndex, need to exhaust limit of youtube data api.
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
  try {
    const youtubeResults = await youtubeClient.searchVideos(youtubeVideoQuery);
    const DBStorableVideos = getDBStorableVideos(youtubeResults.items);
    await videosRepository.saveVideos(DBStorableVideos);
    console.log(`Saved ${DBStorableVideos.length} videos to the database`);
  } catch (err) {
    console.log(`Error in searchVideos api: ${JSON.stringify(err)}`);
  }
};

const getDBQuery = (keywords, lastPublishedAt) => {
  const keywordRegex = `.*(${keywords.replaceAll(' ', '|')}).*`;
  console.log(`keywordRegex: ${keywordRegex}`);
  const queryObj = {
    $or: [
      { title: { $regex: keywordRegex, $options: 'i' } },
      { description: { $regex: keywordRegex, $options: 'i' } },
    ],
    ...(lastPublishedAt ? { published_at: { $gte: lastPublishedAt } } : {}),
    // thought about using tags, but decided to use title
    // and description instead as it derived from the title.
  };

  return queryObj;
};

const getClientPresentableVideos = (videos) => {
  const clientPresentableVideos = [];
  _.forEach(videos, (video) => {
    const videoObj = {
      // eslint-disable-next-line no-underscore-dangle
      id: video._id,
      title: video.title,
      description: video.description,
      publishedAt: video.published_at,
      channelId: video.channel_id,
      channelTitle: video.channel_title,
      tags: video.tags,
      thumbnails: video.thumbnails,
    };
    clientPresentableVideos.push(videoObj);
  });
  return clientPresentableVideos;
};

const getVideosByKeywords = async (query) => {
  const {
    keywords, size, page, sort,
  } = query;
  const dbQuery = getDBQuery(keywords);
  try {
    const [totalCount, queryResult] = await Promise.all([
      videosRepository.getVideosCount(dbQuery),
      videosRepository.getVideosByKeywords(dbQuery, size, page, sort),
    ]);
    const clientRepresentableVideos = getClientPresentableVideos(queryResult);
    return {
      totalCount,
      page,
      size,
      videos: clientRepresentableVideos,
    };
  } catch (err) {
    console.log(`Error in getVideosByKeywords api: ${JSON.stringify(err)}`);
    throw err;
  }
};

const getVideosByKeywordsV2 = async (query) => {
  const {
    keywords, size, lastPublishedAt, sort,
  } = query;
  const dbQuery = getDBQuery(keywords, lastPublishedAt);
  try {
    const [totalCount, queryResult] = await Promise.all([
      videosRepository.getVideosCount(dbQuery),
      videosRepository.getVideosByKeywordsV2(dbQuery, size, 0, sort),
    ]);
    const clientRepresentableVideos = getClientPresentableVideos(queryResult);
    return {
      totalCount,
      size,
      videos: clientRepresentableVideos,
    };
    // maybe should have kept page here
  } catch (err) {
    console.log(`Error in getVideosByKeywords api: ${JSON.stringify(err)}`);
    throw err;
  }
};

module.exports = {
  searchVideos,
  getVideosByKeywords,
  getVideosByKeywordsV2,
};
