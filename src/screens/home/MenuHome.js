import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';

import Body from '../../config/body';
import NavMenu from '../../components/navMenu';
import langs from '../../config/langs';
import { Actions } from 'react-native-router-flux';
import imgs from '../../config/theme';
import Row from '../../components/base/Row';
import { connect } from 'react-redux';
import { goListHome, logOut } from '../../actions';

class MenuHome extends Component {

  onChooseHome() {
    this.props.goListHome()
    Actions.menuhome({type: 'reset'})
  }

  onTypeConnect() {

  }

  onSettingApp() {
    Actions.settingapp({type: 'reset'})
  }

  onSignOut() {
    this.props.logOut()
  }

  render() {
    return (
      <View style={styles.container}>
        <NavMenu title="Menu" />
        <ScrollView style={styles.body}>
          <Row
            type="iconLeft"
            leftTitle={langs.chooseHC}
            imageLeft={imgs.iconSetting.home}
            onPress={this.onChooseHome.bind(this)}
          />
          <Row
            type="iconLeft"
            leftTitle={langs.connection}
            imageLeft={imgs.iconSetting.connected}
            onPress={this.onTypeConnect.bind(this)}
          />
          <Row
            type="iconLeft"
            leftTitle={langs.infoHC}
            imageLeft={imgs.iconSetting.info}
            onPress={this.onTypeConnect.bind(this)}
          />
          <Row
            type="iconLeft"
            leftTitle={langs.myAccount}
            imageLeft={imgs.iconSetting.iconLocal}
            onPress={this.onTypeConnect.bind(this)}
          />
          <Row
            type="iconLeft"
            leftTitle={langs.settingApp}
            imageLeft={imgs.iconSetting.settingBlue}
            onPress={this.onSettingApp.bind(this)}
          />
          <Row
            type="iconLeft"
            leftTitle={langs.signOut}
            imageLeft={imgs.iconSetting.exit}
            onPress={this.onSignOut.bind(this)}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(43, 56, 72, 0.5)',
  },
  body: {
    flex: 1,
  },
  row: {
    height: 54,
    backgroundColor: 'rgba(43, 56, 72, 0.3)',
  },
});

const mapStateToProps = (state) => {
  return {
    state,
  }
}

export default connect(mapStateToProps, {goListHome, logOut})(MenuHome);
