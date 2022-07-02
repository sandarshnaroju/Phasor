import * as React from 'react';
import {Surface} from 'react-native-paper';

const MyComponent = props => <Surface {...props}>{props.children}</Surface>;

export default MyComponent;
