import * as React from 'react';
import {StyleSheet, Text, Linking, View} from 'react-native';
import {useLinkTo} from '@react-navigation/native';
import ParsedText from 'react-native-parsed-text';
import {urlRegex, getPercentageWidth} from '../../../utils/constants';
import MySubHeading from '../../atoms/typography/SubHeading';

import rnTextSize, {TSFontSpecs} from 'react-native-text-size';
import {theme} from '../../../navigation/RootNavigation';

const MyComponent = props => {
  const linkto = useLinkTo();
  // const [renderedHeight, setRenderedHeight] = React.useState(0);
  // const [renderWidth, setRenderWidth] = React.useState(0);
  // const [usedLines, setUsedLines] = React.useState(0);
  const [showReadMore, setShowReadMore] = React.useState(false);
  const onLinkPress = (url, matchIndex) => {
    // console.log('ssuusus', url);
    if (url.indexOf('https://www.fiscean.com') == 0) {
      const path = url.slice(23, url.length);

      linkto(path);
    } else if (url.indexOf('http://www.fiscean.com') == 0) {
      const path = url.slice(22, url.length);

      linkto(path);
    } else {
      if (url.indexOf('https://') == 0 || url.indexOf('http://') == 0) {
        Linking.openURL(url);
      } else {
        Linking.openURL('http://' + url);
      }
    }
  };
  const onEmailPress = (email, matchIndex) => {
    Linking.openURL('mailto: ' + email);
  };
  // const onTextLayout = e => {
  //   console.log('e', e.nativeEvent);
  //   // // the height increased therefore we also increase the usedLine counter
  //   if (renderedHeight < e.nativeEvent.layout.height) {
  //     setUsedLines(prev => prev + 1);
  //   }
  //   // the height decreased, we subtract a line from the line counter
  //   if (renderedHeight > e.nativeEvent.layout.height) {
  //     setUsedLines(prev => prev - 1);
  //   }
  //   // update height if necessary
  //   if (renderedHeight != e.nativeEvent.layout.height) {
  //     setRenderedHeight(e.nativeEvent.layout.height);
  //   }
  //   setRenderWidth(e.nativeEvent.layout.width);
  // };

  const measureStuff = async () => {
    const size = await rnTextSize.measure({
      text: props.text,
      ...props.style,
      usePreciseWidth: true,
      width: getPercentageWidth(1) - 40,
    });
    // console.log('ssss', size, props.numberOfLines);
    if (size != null && size.lineCount != null && props.numberOfLines != null) {
      if (size.lineCount > props.numberOfLines) {
        setShowReadMore(true);
      } else if (size.lineCount == props.numberOfLines) {
        if (size.lastLineWidth < size.width) {
          setShowReadMore(false);
        } else {
          setShowReadMore(true);
        }
      } else {
        setShowReadMore(false);
      }
    } else {
      setShowReadMore(false);
    }
  };

  React.useEffect(() => {
    if (props.text != null && props.numberOfLines != null) {
      measureStuff();
    }
  }, [props.text]);
  // console.log('showree', showReadMore);

  return (
    <View>
      <ParsedText
        {...props}
        style={[
          props.style,

          {color: props.theme.colors.text, fontWeight: 'normal'},
        ]}
        parse={[
          // {
          //   type: 'url',
          //   style: [styles.url, {color: props.theme.colors.primary}],
          //   onPress: onLinkPress,
          // },
          // {type: 'phone', style: styles.phone, onPress: this.handlePhonePress},
          {
            type: 'email',
            style: [styles.email, {color: props.theme.colors.primary}],
            onPress: onEmailPress,
          },
          // {
          //   pattern: /Bob|David/,
          //   style: styles.name,
          //   onPress: this.handleNamePress,
          // },
          {
            pattern: urlRegex,
            style: [styles.url, {color: props.theme.colors.primary}],
            onPress: onLinkPress,
          },
          // {pattern: /42/, style: styles.magicNumber},
          // {pattern: /#(\w+)/, style: styles.hashTag},
        ]}
        // onLayout={onTextLayout}
        childrenProps={{allowFontScaling: false}}>
        {props.text}
      </ParsedText>
      {showReadMore && (
        <MySubHeading
          text={' read more'}
          theme={props.theme}
          onPress={props.onReadMorePress}
          style={[
            {
              color: props.theme.colors.primary,

              backgroundColor: props.theme.colors.background,
              lineHeight: props.style.lineHeight,
            },
            styles.readMoreTextStyle,
          ]}
        />
      )}
    </View>
  );
};

export default MyComponent;
const styles = StyleSheet.create({
  readMoreTextStyle: {
    fontSize: 14,
    paddingHorizontal: 5,
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});
