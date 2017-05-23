import React, { Component } from 'react';
import {
  AppRegistry,
  StatusBar,
  View
} from 'react-native';

import App from './src/App';

export default class LumiHome extends Component {
  render() {
    return (
      <View style={{flex: 1}} >
        <StatusBar barStyle="light-content" />
        <App />
      </View>
    );
  }
}

AppRegistry.registerComponent('LumiHome', () => LumiHome);
