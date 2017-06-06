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
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { getMasterSlave, delMasterSlave } from '../../actions';

import SliderBase from '../../components/base/Slider';
import WifiAudio from '../../actions/speaker/wifiaudio';
import Toast from '@remobile/react-native-toast';
import { Utf8Decode } from '../../actions/speaker/convertData';
import { getDateTimeSpeaker } from '../../components/until';

var { width, height} = Dimensions.get('window');
const TIME_UPDATE = 2000;

class SpeakerListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ip: this.props.ip,
      speaker: {},
      ismute: 0,
      disabled: false,
      isMaster: false,
      isSlave: false,
      masterSlave: {}
    }
    this.intervalUpdate = null
    this.mounted = false;
  }

  componentWillMount() {
    WifiAudio.getStatus(this.props.ip, (json) => {
      let speaker = this.state.speaker
      speaker.ip = this.state.ip
      speaker.device = json
      if(!this.mounted) return
      this.setState({
        speaker: speaker
      })
    })
  }

  componentDidMount() {
    this.mounted = true;
    WifiAudio.synchClock(this.props.ip, getDateTimeSpeaker(), (json) => {});

    this.update();
    this.reg();
  }

  reg() {
    if(this.intervalUpdate) {
      clearInterval(this.intervalUpdate)
    }

    this.intervalUpdate = setInterval(this.update.bind(this), TIME_UPDATE);
  }

  update() {
		WifiAudio.getPlayerStatus(this.state.ip, (json2) => {
			if(!this.intervalUpdate)
				return;
			let speaker = this.state.speaker
			speaker.player = json2;
			this.setState({
				speaker : speaker
			})

      // WifiAudio.getSlaves(this.state.ip, (json3) => {
      //
      //   if(json3.slaves > 0) {
      //     this.setState({
      //       isMaster: true,
      //       isSlave: false,
      //     })
      //     this.props.getMasterSlave(this.state.ip, json3)
      //   } else {
      //     if(this.state.masterSlave.ip) {
      //       for(var i=0; i<this.state.masterSlave.slave_list.slave_list.length; i++) {
      //         if(this.state.speaker.device.apcli0 == this.state.masterSlave.slave_list.slave_list[i].ip) {
      //           this.setState({
      //             isMaster: false,
      //             isSlave: true
      //           })
      //         }
      //       }
      //     } else {
      //       this.setState({
      //         isMaster: false,
      //         isSlave: false
      //       })
      //     }
      //   }
      // })
		});
	}

  componentWillReceiveProps(nextProps) {
    if(this.props.ip != nextProps.ip) {
      this.setState({
				ip : nextProps.ip
			})

      WifiAudio.getStatus(nextProps.ip, (json) => {
        let speaker = this.state.speaker
        speaker.ip = this.state.ip
        speaker.device = json

        this.setState({
          speaker: speaker
        })
      })
    }

    if(this.state.masterSlave !== nextProps.masterSlave) {
      this.setState({
        masterSlave: nextProps.masterSlave
      })
    }
  }

  componentWillUnmount() {
    this.mounted = false;
    if(this.intervalUpdate) {
			clearInterval(this.intervalUpdate)
		}
		this.intervalUpdate = null
	}

  onSetVol = (value) => {
    WifiAudio.setVol(this.state.speaker.ip, value, (json) => {
      Toast.showShortCenter('Set volume ' + parseInt(value));
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

  onSetting() {
    this.props.onSettingItem(this.state.speaker)
  }

  onSelect() {
    this.props.onPressItem(this.state.speaker)
  }

  render() {
    let {speaker} = this.state

    if(!speaker.player || !speaker.device)
		{
			return null
		}

    const leftRightChannel =
      (
        <TouchableOpacity activeOpacity={0.8}
          onPress={this.onSetChannel.bind(this)}
        >
          <Text style={styles.textLeftRight}>
            {speaker.player.ch == "0" ? "LR" : speaker.player.ch == "1" ? "L" : "R"}
          </Text>
        </TouchableOpacity>
      )

    const renderMasterSlave = (
      <Text style={styles.textMaterSlave}>
        {this.state.isMaster ? "M" : this.state.isSlave ? "S" : ""}
      </Text>
    )

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={this.onSelect.bind(this)}
        style={styles.container}
      >
        <View style={styles.imgage}>
          <Image
            style={styles.img}
            source={imgs.iconTabBar.speaker.active}
          />
          {renderMasterSlave}
        </View>
        <View style={styles.rightContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>
              {speaker.device.DeviceName}
            </Text>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.iconSetting}
              onPress={this.onSetting.bind(this)}
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
                {speaker.player.Title == "Unknown" ? "No song" : Utf8Decode(speaker.player.Title)}
              </Text>
            </View>
          </View>
          <View style={styles.bottomView}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.volMute}
              onPress={this.onSetMute.bind(this)}
            >
              <Image
                source={speaker.player.mute == "0" ? imgs.iconSpeaker.volBlue : imgs.iconSpeaker.muteBlue}
                style={styles.imageVol}
                resizeMode="stretch"
              />
            </TouchableOpacity>
            <SliderBase
              value={parseInt(speaker.player.vol)}
              disabled={this.state.disabled}
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
    width: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 60,
    height: 60,
    backgroundColor: 'transparent'
  },
  textMaterSlave: {
    color: '#7e92a8',
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 10,
    right: 10,
    fontSize: 13,
    fontWeight: '600',
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 2,
    paddingRight: 5,
  },
  imageVol: {
    width: 24,
    height: 24,
    backgroundColor: 'transparent',
  },
  leftRight: {
    width: 28,
    height: 28,
    backgroundColor: 'transparent',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#7e92a8',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(43, 56, 72, 0.5)'
  },
  textLeftRight: {
    fontSize: 15,
    fontWeight: '500',
    color: 'white',
    backgroundColor: 'transparent',
    textAlign: 'justify',
  },
});

const mapStateToProps = (state) => {
  return {
    masterSlave: state.wifiaudio.listSlave
  }
}

export default connect(mapStateToProps,{ getMasterSlave, delMasterSlave })(SpeakerListItem);
