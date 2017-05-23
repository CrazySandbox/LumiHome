import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Image
} from 'react-native';

import { connect } from 'react-redux';
import { CheckConnect, loadInitial } from '../../actions';

import Body from '../../config/body';
import imgs from '../../config/theme';
import langs from '../../config/langs';
import LoginForm from './loginForm';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  render() {
    return (
      <Body>
          <View style={styles.container}>
            <ScrollView>
              <KeyboardAvoidingView behavior="padding">
                <View style={styles.logo}>
                  <Image source={imgs.logo.logoLumi} />
                </View>
                <LoginForm />
                <View style={styles.forgot}>
                  <Text style={styles.forgotText}>{langs.forgotpass}</Text>
                </View>
              </KeyboardAvoidingView>
            </ScrollView>
            <View style={styles.footer} >
              <Text style={styles.footerText} >
                {langs.footer}
              </Text>
            </View>
          </View>
      </Body>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  logo: {
    marginTop: 100,
    alignItems: 'center'
  },
  forgot: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgotText: {
    color: 'white',
    fontSize: 13,
    backgroundColor: 'transparent'
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    right: 0,
    bottom: 0,
  },
  footerText: {
    color: 'white',
    fontSize: 13,
    marginBottom: 15,
    marginTop: 5,
    backgroundColor: 'transparent',
    opacity: 0.6
  },
});

const mapStateToProp = (state) => {
  console.log(state)
  return {
    state
  }
}
export default connect(mapStateToProp, { CheckConnect, loadInitial })(Login);
