import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback
} from 'react-native';

import Body from '../../config/body';
import Input from '../../components/base';
import Button from '../../components/base/button';
import langs from '../../config/langs';

class SettingLocal extends Component {

  ipChangeText(value) {
    console.log(value)
  }

  portChangeText(value) {
    console.log(value)
  }

  onSave() {
    console.log('click me')
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
                onChangeText={this.ipChangeText}
                textInputRef="ip"
                ref="ip"
                onSubmitEditing={() => this.focusNextField("port")}
              />
            </View>
            <View>
              <Input
                placeholder={langs.port}
                onChangeText={this.portChangeText}
                returnKeyType="done"
                textInputRef="port"
                ref="port"
              />
            </View>
            <Button
              gradient
              title={langs.save}
              onPress={this.onSave.bind(this)}
            />
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

export default SettingLocal;
