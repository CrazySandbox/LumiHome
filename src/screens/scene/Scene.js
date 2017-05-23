import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import Body from '../../config/body';

class Scenes extends Component {
  render() {
    return (
      <Body>
        <View style={styles.container} >
          <Text style={styles.text} >
            This is component scene
          </Text>
        </View>
      </Body>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 17,
    backgroundColor: 'transparent'
  }
});

export default Scenes;
