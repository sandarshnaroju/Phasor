import {Dimensions} from 'react-native';
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
export const DATA_TYPE = {
  TRENDING_FEED: 'trending-feed',
  SEARCH_SUGGESTIONS: 'search-suggestions',
  COMMENTS: 'comments',
  RECOMMENDED_FEED: 'recommended-feed',
  PARSED_FEED: 'parsed-feed',
  VIDEO_RESOLUTIONS: 'video-resolutions',
  SETTINGS: 'settings',
};
export const HOME_FEED_TYPE = {
  PARSED: 'parsed',
  INVIDIOUS: 'invidious',
};
export const PANEL_INFO = {
  COMMENTS: 'comments',
  DESCRIPTION: 'description',
};
export const getPercentageHeight = percentage => {
  if (percentage != null && percentage != 0) {
    return HEIGHT * percentage;
  } else {
    return HEIGHT;
  }
};
function getIndicesOf(searchStr, str, caseSensitive) {
  var searchStrLen = searchStr.length;
  if (searchStrLen == 0) {
    return [];
  }
  var startIndex = 0,
    index,
    indices = [];
  if (!caseSensitive) {
    str = str.toLowerCase();
    searchStr = searchStr.toLowerCase();
  }
  while ((index = str.indexOf(searchStr, startIndex)) > -1) {
    indices.push(index);
    startIndex = index + searchStrLen;
  }
  return indices;
}

export const getYoutubeDataObject = ytResponseData => {
  const ytinitialIndex =
    JSON.stringify(ytResponseData).indexOf('ytInitialData =');

  const scriptIndices = getIndicesOf('<script', ytResponseData, true);
  const requiredEndScriptIndex = scriptIndices.findIndex(
    (str, index) => str > ytinitialIndex,
  );
  const endScriptIndex = scriptIndices[requiredEndScriptIndex];
  const startScriptIndex = scriptIndices[requiredEndScriptIndex - 1];

  const substrindWithVar = ytResponseData.substring(
    startScriptIndex,
    endScriptIndex,
  );
  const parenthesisOpenIndex = substrindWithVar.indexOf('ytInitialData =');

  const DATA = substrindWithVar.slice(
    parenthesisOpenIndex + 15,
    substrindWithVar.length - 10,
  );
  const parsed = JSON.parse(DATA);
  if (typeof parsed === 'object') {
    return parsed;
  } else {
    return null;
  }
};
export const removeSectionRender = data => {
  return data.filter(obj => obj.richItemRenderer != null);
};
export const getPercentageWidth = percentage => {
  if (percentage != null && percentage != 0) {
    return WIDTH * percentage;
  } else {
    return WIDTH;
  }
};

export const secondsToHms = d => {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor((d % 3600) / 60);
  var s = Math.floor((d % 3600) % 60);
  m = m < 10 ? '0' + m : m;
  h = h < 10 ? '0' + h : h;
  s = s < 10 ? '0' + s : s;
  let finalString = '';
  if (s > 0) {
    finalString = finalString + s;
  }
  if (m > 0) {
    finalString = m + ' : ' + finalString;
  }
  if (h > 0) {
    finalString = h + ' : ' + finalString;
  }
  return finalString;
};
export const nFormatter = (num, digits) => {
  const lookup = [
    {value: 1, symbol: ''},
    {value: 1e3, symbol: 'k'},
    {value: 1e6, symbol: 'M'},
    {value: 1e9, symbol: 'G'},
    {value: 1e12, symbol: 'T'},
    {value: 1e15, symbol: 'P'},
    {value: 1e18, symbol: 'E'},
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol
    : '0';
};
