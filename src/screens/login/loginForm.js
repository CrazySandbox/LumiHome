'use strick';

import React, { Component } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
  AsyncStorage
} from 'react-native';

import { connect } from 'react-redux';

import langs from '../../config/langs';
import LinearGradient from 'react-native-linear-gradient';
import TextInputBase from '../../components/base';

class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: '',
      pass: '',
    }
  }

  doLogin() {
    var a = langs.getLanguage()
    console.log('langs',a)
  }

  userChangeText(value) {
    console.log(value)
  }

  passChangeText(value) {
    console.log(value)
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <TextInputBase
            type="user"
            placeholder={langs.loginUsername}
          />
        </View>

        <View>
        <TextInputBase
          type="user"
          placeholder={langs.loginPass}
        />
        </View>

        <TouchableOpacity style={styles.btnLogin}
          onPress={this.doLogin.bind(this)}
        >
          <LinearGradient
            style={styles.buttonContainer}
            start={{x: 1, y: 0}} end={{x: 0, y: 0.5}}
            locations={[0,0.5,1]}
            colors={['#192f6a', '#3b5998', '#192f6a']}>
            <Text style={styles.buttonText}>{langs.loginLogin}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    marginTop: 100,
    alignItems: 'center',
  },
  input:{
    height: 40,
    width: 350,
    backgroundColor: 'rgba(255,255,255,0.2)',
    color: 'white',
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 3,
  },
  btnLogin: {
    marginTop: 5,
    marginBottom: 5
  },
  buttonContainer:{
    height: 50,
    width: 350,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText:{
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
    backgroundColor: 'transparent'
  },
});

const mapStateToProp = (state) => {
  //console.log(state);
  return {
    data: state
  }
}
export default connect(mapStateToProp)(LoginForm);
