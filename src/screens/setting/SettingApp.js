import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  NativeModules
} from 'react-native';

import langs from '../../config/langs';
import Body from '../../config/body';
import Button from '../../components/base/button';
import imgs from '../../config/theme';
import { Actions } from 'react-native-router-flux';
import ListSelect from '../../components/base/ListSelect';
import { connect } from 'react-redux';
import { setLanguage } from '../../actions';

class SettingApp extends Component {
  static contextTypes = {
    routes: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    DATA = [
      {
        title: langs.en,
        key: 0,
      },
      {
        title: langs.vn,
        key: 1,
      },
    ]
    this.state = {
      DATA: DATA,
      isSelect: '',
      language: this.props.data.language || 'en',
    }
  }

  componentWillMount() {
    this.context.routes.refresh()
    Actions.refresh({onLeft: this.onLeft, leftButtonImage: imgs.base.leftWhite})
  }

  onLeft = () => {
    this.context.routes.tabbar({type: 'reset'})
  }

  onChangeLanguage(value) {
    if(value == 'English') {
      this.setState({language: 'en'})
    } else if (value == 'Vietnamese') {
      this.setState({language: 'vn'})
    } else {
      this.setState({language: 'en'})
    }
  }

  onSave() {
    setLanguage(this.state.language);
    Actions.refresh()
  }

  onHeader(header) {
    this.setState({
      isSelect: header
    })
  }

  render() {
    return (
      <Body>
        <ScrollView style={styles.body}>
          <ListSelect
            headerTitle={langs.language}
            onHeader={this.onHeader.bind(this)}
            isSelect={this.state.isSelect}
            initialTitleRightHeader={this.state.language=="en" ? langs.en : langs.vn}
            item={this.state.DATA}
            onValueChange={this.onChangeLanguage.bind(this)}
          />
          <ListSelect
            headerTitle={langs.setupRing}
            onHeader={this.onHeader.bind(this)}
            isSelect={this.state.isSelect}
            initialTitleRightHeader="Enable"
          />
          <ListSelect
            headerTitle={langs.notification}
            onHeader={this.onHeader.bind(this)}
            isSelect={this.state.isSelect}
            initialTitleRightHeader="Disable"
          />
          <ListSelect
            headerTitle={langs.homeDisplay}
          />
        </ScrollView>
        <View style={styles.button}>
          <Button
            title={langs.save}
            gradient
            onPress={this.onSave.bind(this)}
          />
        </View>
        <View style={styles.bottom}>
          <Text style={styles.textBottom}>
            Version {this.props.data.gohome.version}
          </Text>
        </View>
      </Body>
    );
  }
}

const styles = StyleSheet.create({
  body: {

  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginBottom: 50
  },
  bottom: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  textBottom: {
    fontSize: 13,
    fontWeight: '400',
    color: '#2b3848',
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginBottom: 13
  }
});

const mapStateToProps = (state) => {
  return {
    data: state.authen,
  }
}

export default connect(mapStateToProps)(SettingApp);
