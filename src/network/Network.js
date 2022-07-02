// const DE_URL = 'https://invidio.xamh.de';
// const US_URL = 'https://vid.puffyan.us';
import {readSubscription} from '../database/Database';
import {getGlobalUrl} from './global';

// const US2_URL = 'https://inv.riverside.rocks';
// const NL_URL = 'https://invidious.osi.kr';
const YOUTUBE_MAIN = 'https://www.youtube.com/';
// const YOUTUBE_TRENDING_PAGE = 'https://www.youtube.com/feed/trending';

// const MAIN_URL = getBaseUrl();
// const TRENDING_FEED = MAIN_URL + '/api/v1/trending';
// const POPULAR_FEED = MAIN_URL + '/api/v1/popular';
// const SEARCH_SUGGESTIONS = MAIN_URL + '/api/v1/search/suggestions';
// const SEARCH_VIDEOS = MAIN_URL + '/api/v1/search';
// const VIDEO_INFO_BY_ID = MAIN_URL + '/api/v1/videos/';
// const COMMENTS_BY_ID = MAIN_URL + '/api/v1/comments/';
// const VIDEOS_BY_CHANNEL_ID = MAIN_URL + '/api/v1/channels/videos/';
const FEED_REQUIRED_FIELDS =
  '?fields=title,videoId,videoThumbnails,lengthSeconds,viewCount,author,authorUrl,publishedText';

const VIDEO_INFO_REQUIRED_FIELDS =
  '?fields=title,videoId,videoThumbnails,lengthSeconds,viewCount,author,authorUrl,publishedText,description,likeCount,dislikeCount,isFamilyFriendly,authorThumbnails,authorId,subCountText,hlsUrl,formatStreams,adaptiveFormats,recommendedVideos';
const axios = require('axios').default;

const makeRequest = async ({method, url}) => {
  return axios({
    method,
    url,
  })
    .then(response => {
      //console.log(response);
      if (response.status == 200 || response.status == 201) {
        // console.log(' heyeyy', url, response.data);
        return response.data;
      }
    })
    .catch(e => {
      console.log(e);
      return new Promise.reject(e);
    });
};

export const parseYoutubeHomePage = () => {
  return makeRequest({
    method: 'GET',
    url: YOUTUBE_MAIN,
  });
};
export const fetchTrendingVideos = () => {
  const TRENDING_FEED = getGlobalUrl() + '/api/v1/trending';

  return makeRequest({
    method: 'GET',
    url: TRENDING_FEED + FEED_REQUIRED_FIELDS,
  });
};
export const fetchPopularVideos = () => {
  const POPULAR_FEED = getGlobalUrl() + '/api/v1/popular';

  return makeRequest({
    method: 'GET',
    url: POPULAR_FEED + FEED_REQUIRED_FIELDS,
  });
};
export const fetchSearchSuggestions = searchTerm => {
  const SEARCH_SUGGESTIONS = getGlobalUrl() + '/api/v1/search/suggestions';

  return makeRequest({
    method: 'GET',
    url: SEARCH_SUGGESTIONS + '?q=' + searchTerm,
  });
};
export const fetchVideosByText = searchTerm => {
  const SEARCH_VIDEOS = getGlobalUrl() + '/api/v1/search';

  return makeRequest({
    method: 'GET',
    url: SEARCH_VIDEOS + '?q=' + searchTerm,
  });
};
export const fetchVideoInfoById = videoId => {
  const VIDEO_INFO_BY_ID = getGlobalUrl() + '/api/v1/videos/';

  return makeRequest({
    method: 'GET',
    url: VIDEO_INFO_BY_ID + videoId + VIDEO_INFO_REQUIRED_FIELDS,
  });
};
export const fetchVideoCommentsById = videoId => {
  const COMMENTS_BY_ID = getGlobalUrl() + '/api/v1/comments/';

  return makeRequest({
    method: 'GET',
    url: COMMENTS_BY_ID + videoId,
  });
};
export const getYoutubeHomePage = () => {
  return makeRequest({
    method: 'GET',
    url: 'https://www.youtube.com/',
  });
};

export const getVideosOfSubscribedChannels = async () => {
  const VIDEOS_BY_CHANNEL_ID = getGlobalUrl() + '/api/v1/channels/videos/';

  let videos = [];

  const val = await readSubscription();

  if (val != null) {
    const parsed = JSON.parse(val);
    // console.log('parsed', parsed);
    for (const channelObj of parsed) {
      const response = await makeRequest({
        method: 'GET',
        url: VIDEOS_BY_CHANNEL_ID + channelObj,
      });
      // console.log('response', response);
      videos = [...videos, ...response];
    }
  }

  return videos;
};
export const getOneSubVideos = () => {
  return makeRequest({
    method: 'GET',
    url: 'https://vid.puffyan.us/api/v1/channels/UClyAEXaq3wBj060XaHxbGmw',
  });
};
