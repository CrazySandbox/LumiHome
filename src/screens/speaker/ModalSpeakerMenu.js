import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import imgs from '../../config/theme';
import langs from '../../config/langs';
import Switch from '../../components/base/Switch';
import SliderLevel from '../../components/base/SliderLevel';
import WifiAudio from '../../actions/speaker/wifiaudio';

const {width, height} = Dimensions.get('window');

class ModalSpeakerMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hide: props.hide,
      sleepTimer: 0,
      chooseTimer: false,
      hideTimer: true,
      onSwitch: false,
    }
    this.dismissModal = this.dismissModal.bind(this)
  }

  dismissModal() {
    this.setState({
      hide: false,
    })
    Actions.pop()
  }

  onSetTimer() {
    this.setState({
      chooseTimer: false
    })
    if(this.state.sleepTimer == 0) {
      this.setState({
        hideTimer: true,
      })
    } else {
      WifiAudio.setShutdown(this.props.speaker.ip, this.state.sleepTimer*60, (json) => {
        console.log('settimer', json)
        this.setState({
          hideTimer: false,
          onSwitch: true,
        })
      })
    }
  }

  sleepTimer() {
    this.setState({
      chooseTimer: true
    })
  }

  onSwitchOff() {
    WifiAudio.setShutdown(this.props.speaker.ip, 0, (json) => {
      this.setState({
        hideTimer: true
      })
    })
  }

  render() {
    const RightTimer = (
      <View style={styles.rightTimer}>
      {
        this.state.hideTimer ? (<View />) : (
        <View style={styles.timeout}>
          <View style={styles.timer}>
            <Text style={styles.textTimer}>
              timeout
            </Text>
          </View>
          <Switch
            initialState={this.props.onSwitch}
            style={styles.switchStyle}
            onSwitchOff={this.onSwitchOff.bind(this)}
          />
        </View>)
      }

        <View style={styles.direction}>
          <Image
            style={styles.imgDirection}
            source={imgs.base.right}
          />
        </View>
      </View>
    )

    const Close = (
      <TouchableOpacity
        style={styles.viewClosedTimer}
        onPress={this.onSetTimer.bind(this)}
      >
        <Text style={styles.titleClosed}>
          {langs.closedTimer}
        </Text>
      </TouchableOpacity>
    )

    const Footer = (
      <TouchableOpacity
        style={styles.footer}
        onPress={this.dismissModal}
      >
        <Text style={styles.titleFooter}>
          {langs.backSpeaker}
        </Text>
      </TouchableOpacity>
    )

    const ViewChooseTimer = (
      <SliderLevel
        onSlidingComplete={(value) => this.setState({
          sleepTimer: value,
        })}
      />
    )

    if(this.state.hide) {
      return (
        <View />
      )
    } else {
      return (
        <View style={styles.container} >
          <TouchableOpacity
            onPress={this.dismissModal}
            style={styles.dismiss}
          />
          <View style={styles.modal} >
            <View style={styles.header}>
                <Text style={styles.textTitle}>
                  {this.props.speaker.device.DeviceName}
                </Text>
            </View>

            <View style={styles.body}>
              <TouchableOpacity
                style={styles.row}
                onPress={this.onRename}
              >
                <Image
                  style={styles.imgRow}
                  source={imgs.iconSpeaker.rename}
                  resizeMode="stretch"
                />
                <Text style={styles.textRow}>
                  {langs.renameSpeaker}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.row}
                onPress={this.joinSpeaker}
              >
                <Image
                  style={styles.imgRow}
                  source={imgs.iconSpeaker.join}
                  resizeMode="stretch"
                />
                <Text style={styles.textRow}>
                  {langs.joinSpeaker}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.row}
                onPress={this.speakerInfo}
              >
                <Image
                  style={styles.imgRow}
                  source={imgs.iconSpeaker.info}
                  resizeMode="stretch"
                />
                <Text style={styles.textRow}>
                  {langs.infoSpeaker}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.row}
                onPress={this.alarmClock}
              >
                <Image
                  style={styles.imgRow}
                  source={imgs.iconSpeaker.alarm}
                  resizeMode="stretch"
                />
                <Text style={styles.textRow}>
                  {langs.alarmSpeaker}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.rowTimer}
                onPress={this.sleepTimer.bind(this)}
              >
                <View style={styles.viewTimer}>
                  <Image
                    style={styles.imgRow}
                    source={imgs.iconSpeaker.timer}
                    resizeMode="stretch"
                  />
                  <Text style={styles.textRow}>
                    {langs.sleepTimerSpeaker}
                  </Text>
                </View>
                {this.state.chooseTimer ? Close : RightTimer}
              </TouchableOpacity>
              <View style={styles.viewFooter}>
                {this.state.chooseTimer ? ViewChooseTimer : Footer}
              </View>
            </View>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    width: width,
    height: height,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    height: 330,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  dismiss: {
    width: width,
    height: height-330,
    marginBottom: 330,
  },
  header: {
    height: 50,
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#7e92a8',
    marginLeft: 30,
    marginRight: 8,
  },
  textTitle: {
    fontSize: 18,
    fontWeight: '500',
    backgroundColor: 'transparent',
    color: '#19c1ff'
  },
  body: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 8,
    paddingBottom: 8,
  },
  row: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    paddingLeft: 30,
    paddingRight: 8,
  },
  imgRow: {
    height: 24,
    width: 24,
  },
  textRow: {
    fontSize: 15,
    fontWeight: '400',
    backgroundColor: 'transparent',
    color: '#7e92a8',
    paddingLeft: 18
  },
  rowTimer: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 30,
    paddingRight: 8,
  },
  viewTimer: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
  },
  rightTimer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  switchStyle: {
    marginRight: 13,
  },
  direction: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  imgDirection: {

  },
  viewClosedTimer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8
  },
  titleClosed: {
    fontSize: 17,
    fontWeight: '500',
    backgroundColor: 'transparent',
    color: '#19c1ff',
  },
  viewFooter: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5
  },
  footer: {
    paddingBottom: 8
  },
  titleFooter: {
    fontSize: 20,
    fontWeight: '500',
    backgroundColor: 'transparent',
    color: '#19c1ff',
  },
  timeout: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timer: {
    marginRight: 8
  },
  textTimer: {
    fontSize: 20,
    fontWeight: '500',
    backgroundColor: 'transparent',
    color: '#19c1ff',
  }
})

export default ModalSpeakerMenu;
