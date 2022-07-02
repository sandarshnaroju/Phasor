import * as React from 'react';
import FastImage from 'react-native-fast-image';
import {Avatar} from 'react-native-paper';
const MyComponent = props => {
  const getSource = () => {
    const source =
      props.imageSource != null && props.imageSource != ''
        ? typeof props.imageSource == 'object'
          ? (props.imageSource['uri'] != null &&
              props.imageSource['uri'].length > 0 &&
              props.imageSource['uri'].includes('https://')) ||
            props.imageSource['uri'].includes('http://') ||
            props.imageSource['uri'].includes('file://')
            ? props.imageSource
            : null
          : typeof props.imageSource == 'number'
          ? props.imageSource
          : null
        : null;

    return source;
  };
  const source = getSource();

  if (source != null) {
    return (
      <FastImage
        source={source}
        resizeMode={FastImage.resizeMode.contain}
        {...props}
        style={{
          width: props.size,
          height: props.size,
          ...props.style,
        }}
        // onError={e => {
        //   console.log('ssjjsjsj', source);
        // }}
      />
    );
  } else {
    return <Avatar.Image {...props} source={{uri: 'a'}} />;
  }
};

export default MyComponent;
