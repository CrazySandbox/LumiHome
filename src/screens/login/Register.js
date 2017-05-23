import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView
} from 'react-native';

import LoginForm from './loginForm';

class Register extends Component {
  constructor(props, context) {
   super(props, context)
   this.state = { isFocused: false }
 }

 _onBlur(e) {
   this.setState({ isFocused: false })
 }

 _onFocus(e) {
   this.setState({ isFocused: true })
 }
  render() {
    return (
      <ScrollView style={{flex: 1}}>
      <View style={styles.container}>
      <LoginForm />
      </View>
      </ScrollView>
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
    fontSize: 17
  },
  default: {
    borderColor: 'gray',
    borderBottomWidth: 2,
    backgroundColor: 'skyblue',
  },
  focused: {
    borderColor: 'blue'
  }
});

export default Register;
