'use strick';

import React, { Component } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text
} from 'react-native';

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { LoginAction } from '../../actions';

import langs from '../../config/langs';
import LinearGradient from 'react-native-linear-gradient';
import Input from '../../components/base';
import Button from '../../components/base/button';

class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: this.props.DataReducer.user || '',
      pass: this.props.DataReducer.pass || '',
    }
  }

  componentWillMount() {
    let DataLogin = this.state
    if(this.props.DataReducer.autoLogin == "1") {
      this.props.LoginAction(DataLogin);
    }
  }

  doLogin() {
    let DataLogin = this.state
    this.props.LoginAction(DataLogin)
  }

  userChangeText(value) {
    this.setState({
      user: value
    })
  }

  passChangeText(value) {
    this.setState({
      pass: value
    })
  }

  focusNextField = (nextField) => {
    this.refs[nextField].focus();
  };

  doSetting() {
    Actions.settinglocal()
  }

  render() {
    return (
      <View style={styles.container}>
      <View>
        <Input
          type="user"
          placeholder={langs.loginUsername}
          onChangeText={this.userChangeText.bind(this)}
          textInputRef="user"
          ref="user"
          value={this.state.user}
          onSubmitEditing={() => this.focusNextField("pass")}
          doSetting={this.doSetting.bind(this)}
        />
      </View>
      <View>
        <Input
          type="pass"
          placeholder={langs.loginPass}
          onChangeText={this.passChangeText.bind(this)}
          returnKeyType="done"
          textInputRef="pass"
          value={this.state.pass}
          ref="pass"
        />
      </View>
      <Button
        gradient
        style={styles.btnLogin}
        title={langs.loginLogin}
        onPress={this.doLogin.bind(this)}
      />
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
  btnLogin: {
    marginBottom: 8
  },
});

const mapStateToProp = (state) => {
  return {
    DataReducer: state.authen
  }
}
export default connect(mapStateToProp, { LoginAction })(LoginForm);
