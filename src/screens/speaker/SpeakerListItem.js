'use strick';

import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import langs from '../../config/langs';
import imgs from '../../config/theme';

var { width, height} = Dimensions.get('window');
var Slider = require('react-native-slider');
import WifiAudio from '../../actions/speaker/wifiaudio';
import { connect } from 'react-redux';
import { upDateSpeaker } from '../../actions';
import Toast from '@remobile/react-native-toast';
import { Utf8ArrayToStr } from '../../actions/speaker/convertData';

class SpeakerListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      speaker: this.props.speaker,
      ismute: 0,
      disabled: false,
      value: parseInt(this.props.speaker.player.vol)
    }
  }

  componentDidMount() {
    this.props.upDateSpeaker(this.state.speaker.ip, this.props.dataSpeaker)
  }

  componentWillReceiveProps(nextProps) {
    if(this.state.speaker.ip !== nextProps.speaker.ip) {
      this.setState({
        speaker: nextProps.speaker
      })
    }
    console.log('state', this.state.speaker.player)
    console.log('nextProps', nextProps.speaker.player)
    if(this.state.speaker.player !== nextProps.speaker.player) {
      console.log('setState', nextProps.speaker.player)
      this.setState({
        speaker: nextProps.speaker
      })
    }
  }

  onSetVol = () => {
    WifiAudio.setVol(this.state.speaker.ip, this.state.value, (json) => {
      Toast.showShortCenter('Set volume ' + this.state.value);
    });
  }

  onSetMute() {
    this.setState({
      ismute: !this.state.ismute
    })
    WifiAudio.mute(this.state.speaker.ip, this.state.ismute);
  }

  onSetChannel() {
    let channel = parseInt(this.state.speaker.player.ch) + 1
    if(channel > 2)
    {
      channel = 0
    }
    WifiAudio.setChannel(this.state.speaker.ip, this.state.speaker.player.type, channel, (json)=>{

    })
  }

  render() {
    const {
      onPressItem,
      speaker
    } = this.props

    const leftRightChannel =
      (
        <TouchableOpacity activeOpacity={0.7}
          onPress={this.onSetChannel.bind(this)}
        >
          <Text style={styles.textLeftRight}>
            {this.state.speaker.player.ch == "0" ? "LR" : this.state.speaker.player.ch == "1" ? "L" : "R"}
          </Text>
        </TouchableOpacity>
      )


    return (
      <TouchableOpacity
        onPress={onPressItem}
        style={styles.container}
      >
        <View style={styles.imgage}>
          <Image
            style={styles.img}
            source={imgs.iconTabBar.speaker.active}
          />
        </View>
        <View style={styles.rightContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>
              {speaker.device.DeviceName}
            </Text>
            <TouchableOpacity
              style={styles.iconSetting}
              onPress={() => {}}
            >
              <Image
                style={styles.imgSetting}
                source={imgs.iconSetting.setting}
                resizeMode="stretch"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.stateMusic}>
            <Image
              style={styles.imgaeStateMusic}
              source={imgs.iconSpeaker.status}
              resizeMode="stretch"
            />
            <Text style={styles.status} >
              {speaker.player.status == "play" ? langs.playing : (speaker.player.Title.toLowerCase() !== "unknown" ? langs.pause : langs.stop)}
            </Text>
            <View style={{flex: 1}}>
              <Text style={styles.titleMusic} numberOfLines={1}>
                {speaker.player.Title == "Unknown" ? "No song" : Utf8ArrayToStr(speaker.player.Title)}
              </Text>
            </View>
          </View>
          <View style={styles.bottomView}>
            <TouchableOpacity
              style={styles.volMute}
              onPress={this.onSetMute.bind(this)}
            >
              <Image
                source={speaker.player.mute == "0" ? imgs.iconSpeaker.volBlue : imgs.iconSpeaker.muteBlue}
                style={styles.imageVol}
                resizeMode="stretch"
              />
            </TouchableOpacity>
            <Slider
              value={this.state.value}
              onValueChange={(value) => this.setState({
                value: value
              })}
              style={styles.slider}
              minimumValue={0}
              maximumValue={100}
              step={1}
              disabled={this.state.disabled}
              trackStyle={styles.trackSlider}
              thumbStyle={styles.thumbSlider}
              minimumTrackTintColor="#19c1ff"
              maximumTrackTintColor="#7e92a8"
              thumbTintColor="#19c1ff"
              thumbTouchSize={{width: 30, height: 30}}
              onSlidingComplete={(value) => this.onSetVol(value)}
            />
            <View style={styles.leftRight}>
                {leftRightChannel}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 110,
    width: width-16,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(43, 56, 72, 0.3)',
    marginHorizontal: 8,
    borderRadius: 8,
    marginTop: 8,
  },
  imgage: {
    height: 110,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 60,
    height: 60,
    backgroundColor: 'transparent'
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingRight: 3
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 5,
    paddingRight: 5,
  },
  title: {
    fontSize: 17,
    fontWeight: '500',
    textAlign: 'left',
    color: '#19c1ff',
    backgroundColor: 'transparent',
  },
  iconSetting: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 3,
  },
  imgSetting: {
    width: 24,
    height: 24,
    backgroundColor: 'transparent'
  },
  stateMusic: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgaeStateMusic: {
    width: 22,
    height: 22,
    backgroundColor: 'transparent'
  },
  status: {
    fontSize: 13,
    fontWeight: '400',
    color: '#7e92a8',
    backgroundColor: 'transparent',
    marginLeft: 5,
  },
  titleMusic: {
    fontSize: 13,
    fontWeight: '400',
    color: '#7e92a8',
    backgroundColor: 'transparent',
    marginLeft: 5,
  },
  bottomView: {
    flexDirection: 'row',
    //justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 8,
    paddingRight: 5,
  },
  imageVol: {
    width: 24,
    height: 24,
    backgroundColor: 'transparent',
  },
  leftRight: {
    position: 'absolute',
    width: 28,
    height: 28,
    backgroundColor: 'transparent',
    borderRadius: 14,
    borderWidth: 0.8,
    borderColor: '#7e92a8',
    justifyContent: 'center',
    alignItems: 'center',
    right: 5,
    bottom: 8,
    backgroundColor: 'rgba(43, 56, 72, 0.5)'
  },
  textLeftRight: {
    fontSize: 15,
    fontWeight: '500',
    color: 'white',
    backgroundColor: 'transparent',
    textAlign: 'justify',
  },
  slider: {
    width: width - 180,
    marginLeft: 5,
    justifyContent: 'center',
  },
  trackSlider: {
    height: 2,
    backgroundColor: '#7e92a8',
    borderRadius: 1
  },
  thumbSlider: {
    width: 10,
    height: 10,
    borderRadius: 10 / 2,
    shadowColor: '#31a4db',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 2,
    shadowOpacity: 0.35,
    backgroundColor: '#19c1ff',
  }
});

const mapStateToProps = (state) => {
  return {
    dataSpeaker: state.wifiaudio.listSpeaker,
  }
}

export default connect(mapStateToProps, { upDateSpeaker })(SpeakerListItem);
