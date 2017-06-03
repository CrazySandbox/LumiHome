import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import Body from '../../config/body';
import langs from '../../config/langs';
import imgs from '../../config/theme';
import Switch from '../../components/base/Switch';
import WifiAudio from '../../actions/speaker/wifiaudio';

class SpeakerInfo extends Component {

  componentWillMount() {
    Actions.refresh({onLeft: this.onLeft, leftButtonImage: imgs.base.leftWhite})
  }

  onLeft = () => {
    Actions.speaker({type: 'reset'})
  }

  onSwitchOn() {

  }

  onSwitchOff() {

  }

  render() {
    const { speaker } = this.props
    return (
      <Body>
        <ScrollView>
          <View style={styles.row}>
            <Text style={styles.textLeft}>
              {langs.speakerName}
            </Text>
            <Text style={styles.textRight}>
              {speaker.device.DeviceName}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.textLeft}>
              {langs.ipSpeaker}
            </Text>
            <Text style={styles.textRight}>
              {speaker.ip}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.textLeft}>
              {langs.macSpeaker}
            </Text>
            <Text style={styles.textRight}>
              {speaker.device.MAC}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.textLeft}>
              {langs.ssid}
            </Text>
            <Text style={styles.textRight}>
              {speaker.device.ssid}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.textLeft}>
              {langs.hideSSID}
            </Text>
            <Switch
              initialState={speaker.device.hideSSID = 0 ? false : true }
              onSwitchOff={this.onSwitchOff.bind(this)}
              onSwitchOn={this.onSwitchOn.bind(this)}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.textLeft}>
              {langs.filmwareSpeaker}
            </Text>
            <Text style={styles.textRight}>
              {speaker.device.firmware}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.textLeft}>
              {langs.buildDateSpeaker}
            </Text>
            <Text style={styles.textRight}>
              {speaker.device.Release}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.textLeft}>
              {langs.uuid}
            </Text>
            <Text style={styles.textRight}>
              {speaker.device.uuid}
            </Text>
          </View>
        </ScrollView>
      </Body>
    );
  }
}

const styles = StyleSheet.create({
  container: {

  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 13,
    paddingRight: 13,
    borderBottomWidth: 0.5,
    borderBottomColor: '#2b3848',
    height: 50,
  },
  textRight: {
    color: '#7e92a8',
    fontSize: 16,
    fontWeight: '400',
    backgroundColor: 'transparent',
    textAlign: 'right'
  },
  textLeft: {
    color: '#19c1ff',
    fontSize: 16,
    fontWeight: '500',
    backgroundColor: 'transparent',
  }
});

export default SpeakerInfo;
