import React from 'react';
import {Dimensions} from 'react-native';
import {DataProvider, LayoutProvider, RecyclerListView} from 'recyclerlistview';
import StickyContainer from 'recyclerlistview/sticky';
import {
  DATA_TYPE,
  getPercentageHeight,
  getPercentageWidth,
} from '../utils/Constants';
import FeedView from '../ui/itemviews/FeedView';
import ParsedFeedView from '../ui/itemviews/ParsedFeedView';
import RecommendedFeed from '../ui/itemviews/RecommendedVideos';
import SearchSuggestions from '../ui/itemviews/Suggestions';
import Settings from '../ui/itemviews/Settings';
import Comments from '../ui/itemviews/Comments';
import Resolutions from '../ui/itemviews/Resolutions';

export default class RecyclerListComponent extends React.Component {
  constructor(args) {
    super(args);

    let {width} = Dimensions.get('window');
    let {height} = Dimensions.get('window');

    this.dataProvider = new DataProvider((r1, r2) => {
      return r1 !== r2;
    });

    this._layoutProvider = new LayoutProvider(
      index => {
        if (
          (index == 0 || index == 1) &&
          this.props.dataType == DATA_TYPE.RECOMMENDED_FEED
        ) {
          return index + 'recommended-videos';
        } else {
          return this.props.dataType;
        }
      },

      (type, dim) => {
        switch (type) {
          case '0recommended-videos':
            dim.width = getPercentageWidth(1);
            dim.height = getPercentageHeight(0.4);
            break;
          case '1recommended-videos':
            dim.width = getPercentageWidth(1);
            dim.height = 215;
            break;
          case DATA_TYPE.RECOMMENDED_FEED:
            dim.width = getPercentageWidth(1);
            dim.height = 260;
            break;
          case DATA_TYPE.TRENDING_FEED:
            dim.width = getPercentageWidth(1);
            dim.height = 260;
            break;
          case DATA_TYPE.PARSED_FEED:
            dim.width = getPercentageWidth(1);
            dim.height = 260;
            break;

          case DATA_TYPE.SEARCH_SUGGESTIONS:
            dim.width = getPercentageWidth(1);
            dim.height = 60;
            break;
          case DATA_TYPE.COMMENTS:
            dim.width = getPercentageWidth(1);
            dim.height = 100;
            break;
          case DATA_TYPE.VIDEO_RESOLUTIONS:
            dim.width = getPercentageWidth(1);
            dim.height = 60;
            break;
          case DATA_TYPE.SETTINGS:
            dim.width = getPercentageWidth(1);
            dim.height = 60;
            break;
          default:
            dim.width = 0;
            dim.height = 0;
        }
      },
    );

    this._rowRenderer = this._rowRenderer.bind(this);
  }

  _rowRenderer(type, data, index) {
    switch (this.props.dataType) {
      case '0recommended-videos':
        return (
          <RecommendedFeed
            data={data}
            onClick={this.props.onFeedClick}
            index={index}
            theme={this.props.theme}
          />
        );
      case '1recommended-videos':
        return (
          <RecommendedFeed
            data={data}
            onClick={this.props.onFeedClick}
            index={index}
            theme={this.props.theme}
          />
        );
      case DATA_TYPE.TRENDING_FEED:
        return (
          <FeedView
            data={data}
            onClick={this.props.onFeedClick}
            index={index}
            theme={this.props.theme}
          />
        );
      case DATA_TYPE.PARSED_FEED:
        return (
          <ParsedFeedView
            data={data}
            onClick={this.props.onFeedClick}
            index={index}
            theme={this.props.theme}
          />
        );
      case DATA_TYPE.VIDEO_RESOLUTIONS:
        return (
          <Resolutions
            data={data}
            onClick={this.props.onResolutionClick}
            index={index}
            theme={this.props.theme}
          />
        );

      case DATA_TYPE.RECOMMENDED_FEED:
        return (
          <RecommendedFeed
            data={data}
            onClick={this.props.onFeedClick}
            index={index}
            theme={this.props.theme}
          />
        );
      case DATA_TYPE.SEARCH_SUGGESTIONS:
        return (
          <SearchSuggestions
            data={data}
            onSuggestionClick={this.props.onSuggestionClick}
            index={index}
            theme={this.props.theme}
          />
        );
      case DATA_TYPE.COMMENTS:
        return (
          <Comments
            data={data}
            onCommentCLick={this.props.onCommentCLick}
            index={index}
            theme={this.props.theme}
          />
        );
      case DATA_TYPE.SETTINGS:
        return (
          <Settings
            data={data}
            onFeedClick={this.props.onFeedClick}
            index={index}
            theme={this.props.theme}
          />
        );
      default:
        return null;
    }
  }

  render() {
    return (
      <StickyContainer
        style={this.props.stickyContainerStyle}
        stickyHeaderIndices={this.props.stickyItemViewIndexes}>
        <RecyclerListView
          layoutProvider={this._layoutProvider}
          dataProvider={this.dataProvider.cloneWithRows(this.props.data)}
          rowRenderer={this._rowRenderer}
          keyboardShouldPersistTaps={'handled'}
          extendedState={this.props.theme}
          {...this.props}
        />
      </StickyContainer>
    );
  }
}
