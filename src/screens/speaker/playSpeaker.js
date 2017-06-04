import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';

import Body from '../../config/body';
import { Actions } from 'react-native-router-flux';
import imgs from '../../config/theme';
import commonStyle from '../../config/theme/theme1';
import langs from '../../config/langs';
import NavBar from '../../components/navBar';
import SliderBase from '../../components/base/Slider';
import Toast from '@remobile/react-native-toast';
import WifiAudio from '../../actions/speaker/wifiaudio';
import { Utf8ArrayToStr } from '../../actions/speaker/convertData';
import { parseTime } from '../../components/until';

const { height, width } = Dimensions.get('window');
const TIME_UPDATE = 1000;

class PlaySpeaker extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showVolume: false,
      speaker: this.props.speaker,
      totalPos: parseInt(this.props.speaker.player.totlen),
      currPos: parseInt(this.props.speaker.player.curpos)
    }
    this.intervalUpdate = null;
    this.VolumeControllerValueUpdatedEvent = null;
  }

  componentDidMount() {
    this.update();
		this.reg();
  }

  update() {
		WifiAudio.getPlayerStatus(this.state.speaker.ip, (json) => {
			if(!this.intervalUpdate)
				return;
			let speaker = this.state.speaker
			speaker.player = json;
			this.setState({
				speaker : speaker,
				totalPos: parseInt(speaker.player.totlen),
				currPos : parseInt(speaker.player.curpos),
			})
		});
	}

  reg() {
    if(this.intervalUpdate) {
      clearInterval(this.intervalUpdate)
    }

    this.intervalUpdate = setInterval(this.update.bind(this), TIME_UPDATE);
  }

  componentWillUnmount() {
		if(this.intervalUpdate) {
			clearInterval(this.intervalUpdate)
		}
		this.intervalUpdate = null

		if(this.VolumeControllerValueUpdatedEvent) {
			this.VolumeControllerValueUpdatedEvent.remove()
		}
	}

  onRight() {
    Actions.speaker({type: 'reset'})
  }

  onLeft() {
    this.props.toggleSideMenu()
  }

  onSetVol = (value) => {
    WifiAudio.setVol(this.props.speaker.ip, value, (json) => {
      Toast.showShortCenter('Set volume ' + parseInt(value));
    });
  }

  onRepeat() {
    let device = this.state.speaker
    let mode = parseInt(this.state.speaker.player.loop);
    mode ++;
    if(mode > 3) {
      mode = 0;
    }
    device.player.loop = mode
    this.setState({
      speaker : device
    })
    WifiAudio.setMode(this.state.speaker.ip, mode, (json)=>{
      console.log(json);
    })
  }

  onPrew() {
    WifiAudio.setPlay(this.state.speaker.ip, 'prev', (txt)=>{
      console.log('prev', txt);
    })
  }

  onNext() {
    WifiAudio.setPlay(this.state.speaker.ip, 'next', (txt)=>{
      console.log('next', txt);
    })
  }

  onPlay() {
    if(this.state.speaker.player.status == "play") {
      WifiAudio.setPlay(this.state.speaker.ip, 'pause', (txt)=>{
        console.log('pause', txt);
      })
    } else {
      WifiAudio.setPlay(this.state.speaker.ip, 'play', (txt)=>{
        console.log('play', txt);
      })
    }
  }

  render() {
    console.log('this.state', this.state.speaker)
    const { speaker } = this.state;
    const navBar = (
      <NavBar
        leftImage={imgs.iconSetting.hidemenu}
        rightTitle={this.props.speaker.device.DeviceName}
        onRight={this.onRight.bind(this)}
        onLeft={this.onLeft.bind(this)}
      />
    )

    return (
      <Body>
        {navBar}
        <View style={styles.container}>
          <View style={styles.top}>

          </View>
          <View style={styles.bottom}>
            <View style={styles.Slider}>
              <SliderBase
                style={styles.SliderBase}
                thumbImage={imgs.iconSpeaker.thumb2}
                value={this.state.currPos}
                minimumValue={0}
                maximumValue={this.state.totalPos}
                step={1}
                onSlidingComplete={(value)=>{
    							WifiAudio.seek(this.state.speaker.ip, parseInt(value*1000), (txt)=>{
    								console.log('seek', txt);
    							})
    						}}
              />
              <View style={styles.timeless}>
                <View style={styles.leftSlider}>
                  <Text style={styles.textLeftSlider}>
                    {parseTime(this.state.currPos)}
                  </Text>
                </View>
                <View style={styles.rightSlider}>
                  <Text style={styles.textRightSlider}>
                    {parseTime(this.state.totalPos-this.state.currPos)}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.center}>
              <TouchableOpacity style={styles.favouriteButton}>
                <Image style={styles.imgFavourite} source={imgs.iconSpeaker.favouriteBlack} />
              </TouchableOpacity>
              <View style={styles.titleMusic}>
                <Text style={styles.textTitle} numberOfLines={1}>
                  {Utf8ArrayToStr(speaker.Title)}
                </Text>
                <Text style={styles.textDentail} numberOfLines={1}>
                  {Utf8ArrayToStr(speaker.player.Artist)} - {Utf8ArrayToStr(speaker.player.Album)}
                </Text>
              </View>
              <TouchableOpacity style={styles.listMusicButton}>
                <Image style={styles.imgListMusic} source={imgs.iconSpeaker.listMusic} />
              </TouchableOpacity>
            </View>

            <View style={styles.player}>
              <View style={styles.repeat}>
                <TouchableOpacity style={styles.repeatButton}
                  onPress={this.onRepeat.bind(this)}
                >
                  <Image style={styles.imgRepeat} source={this.state.speaker.player.loop == 0 ? imgs.iconSpeaker.repeat.noloop : this.state.speaker.player.loop == 1 ? imgs.iconSpeaker.repeat.single_loop : this.state.speaker.player.loop == 2 ? imgs.iconSpeaker.repeat.shuffle_all : imgs.iconSpeaker.repeat.loop } />
                </TouchableOpacity>
              </View>
              <View style={styles.buttonPlayer}>
                <TouchableOpacity
                  style={styles.iconPlayer}
                  onPress={this.onPrew.bind(this)}
                >
                  <Image
                    style={styles.imgPrew}
                    source={imgs.iconSpeaker.prew}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.iconPlayer}
                  onPress={this.onPlay.bind(this)}
                >
                  <Image
                    style={styles.imgPlay}
                    source={this.state.speaker.player.status == 'play' ? imgs.iconSpeaker.pause : imgs.iconSpeaker.play}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.iconPlayer}
                  onPress={this.onNext.bind(this)}
                >
                  <Image
                    style={styles.imgNext}
                    source={imgs.iconSpeaker.next}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.volume}>
                <TouchableOpacity style={styles.volumeButton}
                  onPress={() => this.setState({ showVolume : !this.state.showVolume
                  })}
                >
                  <Image style={styles.imgVolume} source={imgs.iconSpeaker.volBlue} />
                </TouchableOpacity>
              </View>
            </View>
            {
              this.state.showVolume ? (<View style={styles.changeVolume}>
                <SliderBase
                  style={styles.changeVolumeValue}
                  value={parseInt(speaker.player.vol)}
                  onSlidingComplete={(value) => this.onSetVol(value)}
                />
              </View>) : <View />
            }
          </View>
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
  },
  top: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    borderBottomWidth: 0.5,
    borderBottomColor: '#2b3848'
  },
  bottom: {
    flex: 4,
    backgroundColor: 'rgba(43, 56, 72, 0.3)',
    width: width,
    paddingTop: 13,
    paddingBottom: 13,
    justifyContent: 'space-between',
  },
  Slider: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  SliderBase: {
    width: width - 16,
  },
  timeless: {
    flexDirection: 'row',
    width: width - 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftSlider: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightSlider: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textLeftSlider: {
    fontSize: 13,
    fontWeight: '400',
    backgroundColor: 'transparent',
    color: '#7e92a8',
  },
  textRightSlider: {
    fontSize: 13,
    fontWeight: '400',
    backgroundColor: 'transparent',
    color: '#7e92a8',
  },
  center: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 13
  },
  favouriteButton: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgFavourite: {
    height: 24,
    width: 24,
  },
  listMusicButton: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgListMusic: {
    height: 17,
    width: 17,
  },
  textTitle: {
    fontSize: 17,
    fontWeight: '500',
    backgroundColor: 'transparent',
    color: '#19c1ff',
    marginBottom: 3
  },
  textDentail: {
    fontSize: 13,
    fontWeight: '400',
    backgroundColor: 'transparent',
    color: '#7e92a8',
  },
  player: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 13
  },
  repeat: {
    height: 30,
    width: 30,
  },
  repeatButton: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgRepeat: {
    height: 22,
    width: 22,
  },
  buttonPlayer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconPlayer: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15
  },
  imgPrew: {
    height: 26,
    width: 26,
  },
  imgPlay: {
    height: 36,
    width: 36,
  },
  imgNext: {
    height: 26,
    width: 26,
  },
  volume: {
    height: 30,
    width: 30,
  },
  volumeButton: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgVolume: {
    height: 22,
    width: 22,
  },
  changeVolume: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  changeVolumeValue: {
    width: width - 40
  }
})

export default PlaySpeaker;
