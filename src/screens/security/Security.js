import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import Body from '../../config/body';

class Security extends Component {
  render() {
    return (
      <Body >
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text style={styles.text}>
            This is component Security
          </Text>
        </View>
      </Body>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'skyblue',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 17,
    backgroundColor: 'transparent'
  }
});

export default Security;
