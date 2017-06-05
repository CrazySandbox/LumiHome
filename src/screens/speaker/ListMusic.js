import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
  Dimensions
} from 'react-native';


import { Actions } from 'react-native-router-flux';
import Body from '../../config/body';
import langs from '../../config/langs';
import imgs from '../../config/theme';
import WifiAudio from '../../actions/speaker/wifiaudio';
import { Utf8Decode, hex2a } from '../../actions/speaker/convertData';

const { width, height } = Dimensions.get('window');

class ListMusicUSB extends Component {
  constructor(props) {
    super(props);
    let speaker = this.props.speaker;
    if(!speaker.musics) {
      speaker.musics = []
    }
    this.state = {
      speaker: speaker,
      select: -1,
    }
  }

  componentWillMount() {
    Actions.refresh({onLeft: this.onLeft, leftButtonImage: imgs.base.leftWhite})

    if(this.state.speaker.musics.length == 0) {
      WifiAudio.getListMusics(this.state.speaker.ip, (musics) => {
        let speaker = this.state.speaker
        speaker.musics = musics.locallist
        this.setState({
          speaker: speaker
        })
      })
    }
  }

  onLeft = () => {
    Actions.slideMenuSpeaker({type: 'replace', speaker: this.state.speaker})
  }

  _onPressItem(item) {
    this.setState({
      select: item.file
    })
    WifiAudio.playLocalList(this.state.speaker.ip, this.state.speaker.musics.indexOf(item), (json) => {
      Actions.slideMenuSpeaker({type: 'replace', speaker: this.state.speaker})
    })
  }

  _renderItem = ({item}) => {
    return (
      <View style={styles.rowContainer}>
        <TouchableOpacity
          style={styles.row}
          onPress={() => this._onPressItem(item)}
        >
          <View style={styles.music}>
            <Image style={styles.imgMusic}
              source={imgs.iconSpeaker.music} />
            <View style={styles.titleView}>
              <Text style={styles.title} numberOfLines={2}>
                {Utf8Decode(hex2a(item.file))}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    const { speaker } = this.state
    return (
      <Body>
        <ScrollView style={styles.container}>
          <FlatList
            data={speaker.musics}
            renderItem={this._renderItem}
            keyExtractor={(item, index) => index}
            extraData={this.state.select}
            enableEmptySections
          />
        </ScrollView>
      </Body>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  rowContainer: {
    height: 60,
    justifyContent: 'center',
    marginHorizontal: 13,
    borderBottomWidth: 0.5,
    borderBottomColor: '#2b3848',
  },
  row: {
    height: 60,
    justifyContent: 'center',
  },
  music: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgMusic: {
    height: 32,
    width: 32,
  },
  titleView: {
    justifyContent: 'center',
    width: width - 55
  },
  title: {
    fontSize: 15,
    fontWeight: '400',
    color: '#7e92a8',
    backgroundColor: 'transparent',
    marginLeft: 8,
  },
  rightImage: {
    height: 60,
    width: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    height: 13,
    width: 13
  },
});

export default ListMusicUSB;
