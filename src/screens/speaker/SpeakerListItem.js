'use strick';

import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet
} from 'react-native';
import langs from '../../config/langs';
import imgs from '../../config/theme';

class SpeakerListItem extends Component {
  render() {
    const {
      onPressItem,
      speaker
    } = this.props
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
              {speaker.DeviceName}
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
              {speaker.player.status == "stop" ? "Stop" : "Pause"}
            </Text>
            <Text style={styles.titleMusic} numberOfLines={1}>
              {speaker.player.Title == "Unknown" ? "No song" : speaker.player.Title}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 110,
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    marginBottom: 0.5
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 3,
  },
  title: {
    fontSize: 17,
    fontWeight: '500',
    textAlign: 'left',
    color: 'white',
    backgroundColor: 'transparent',
  },
  iconSetting: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 3,
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
    width: 24,
    height: 24,
    backgroundColor: 'transparent'
  },
  status: {
    fontSize: 15,
    fontWeight: '400',
    color: 'white',
    backgroundColor: 'transparent',
    marginLeft: 5,
  },
  titleMusic: {
    fontSize: 15,
    fontWeight: '400',
    color: 'white',
    backgroundColor: 'transparent',
    marginLeft: 5,
  }
});

export default SpeakerListItem;
