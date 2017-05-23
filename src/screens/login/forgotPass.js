import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';

import Body from '../../config/body';

class ForgotPassword extends Component {
  render() {
    return (
      <Body>
        <View style={styles.container}>
          <Text style={styles.text}>This is components ForgotPassword</Text>
        </View>
      </Body>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    backgroundColor: 'transparent'
  }
});

export default ForgotPassword;
