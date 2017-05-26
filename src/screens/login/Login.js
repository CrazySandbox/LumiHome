import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';

import { connect } from 'react-redux';
import { CheckConnect, loadInitial } from '../../actions';
import { Actions } from 'react-native-router-flux';
import { LoadDataFromStore } from '../../actions';
import Loading from '../../components/base/loading';

import Body from '../../config/body';
import imgs from '../../config/theme';
import langs from '../../config/langs';
import LoginForm from './loginForm';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      Data: this.props.Data
    }
  }

  componentWillMount() {
    this.props.LoadDataFromStore()
  }

  doForgot() {
    Actions.forgotpass()
  }

  render() {
    var dismissKeyboard = require('dismissKeyboard');
    if(this.props.DataReducer.loadingData) {
      return (
        <Body>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} >
            <Loading />
          </View>
        </Body>
      );
    } else {
      return (
        <Body>
          <View style={styles.container}>
            <ScrollView keyboardShouldPersistTaps="always">
              <TouchableWithoutFeedback onPress={dismissKeyboard}>
                <KeyboardAvoidingView behavior="padding">
                  <View style={styles.logo}>
                    <Image source={imgs.logo.logoLumi} />
                  </View>
                  <LoginForm />
                  <View style={styles.forgot}>
                    <TouchableOpacity
                      onPress={this.doForgot}>
                      <Text style={styles.forgotText}>
                        {langs.forgotpass}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </KeyboardAvoidingView>
              </TouchableWithoutFeedback>
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
  return {
    DataReducer: state.authen
  }
}
export default connect(mapStateToProp, { LoadDataFromStore })(Login);
