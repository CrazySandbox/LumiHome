import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import Body from '../../config/body';
import Input from '../../components/base';
import Button from '../../components/base/button';
import langs from '../../config/langs';
import { backLogin } from '../../actions';
import { connect } from 'react-redux';

class SettingLocal extends Component {

  ipChangeText(value) {
    console.log(value)
  }

  portChangeText(value) {
    console.log(value)
  }

  onSave() {
    this.props.backLogin()
  }

  backLogin() {
    this.props.backLogin()
  }

  focusNextField = (nextField) => {
    this.refs[nextField].focus();
  };

  render() {
    var dismissKeyboard = require('dismissKeyboard');
    return (
      <Body>
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
          <View style={styles.container}>
            <View>
              <Input
                placeholder={langs.ip}
                onChangeText={this.ipChangeText.bind(this)}
                keyboardType="numeric"
                textInputRef="ip"
                ref="ip"
                onSubmitEditing={() => this.focusNextField("port")}
              />
            </View>
            <View>
              <Input
                placeholder={langs.port}
                onChangeText={this.portChangeText.bind(this)}
                returnKeyType="done"
                keyboardType="number-pad"
                textInputRef="port"
                ref="port"
              />
            </View>
            <Button
              gradient
              title={langs.save}
              onPress={this.onSave.bind(this)}
              style={styles.button}
            />
            <TouchableOpacity
              onPress={this.backLogin.bind(this)}
            >
              <View style={styles.titleBackLogin}>
                <Text style={styles.textBackLogin}>
                  {langs.backlogin}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.footer} >
          <Text style={styles.footerText} >
            {langs.footer}
          </Text>
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
    marginBottom: 40,
  },
  text: {
    color: 'white',
    backgroundColor: 'transparent'
  },
  button: {
    marginTop: 8,
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
  titleBackLogin: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBackLogin: {
    color: 'white',
    fontSize: 15,
    marginTop: 13,
    backgroundColor: 'transparent',
    opacity: 0.8
  }
});

const mapStateToProps = (state) => {
  return {
    state
  }
}

export default connect(mapStateToProps, { backLogin })(SettingLocal);
