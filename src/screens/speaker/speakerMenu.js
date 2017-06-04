import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

import Body from '../../config/body';

class SpeakerMenu extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          this is components playSpeaker
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: 'white'
  }
})

export default SpeakerMenu;
