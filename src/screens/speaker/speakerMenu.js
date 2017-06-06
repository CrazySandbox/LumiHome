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

class SpeakerMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    }
  }

  localMusic() {

  }

  onUSB() {
    Actions.listMusicUSB({type: 'reset', speaker: this.props.speaker})
  }

  render() {
    console.log('speaker', this.props)
    return (
      <View style={styles.container}>
        <NavMenu title="Menu" />
        <ScrollView style={styles.body}>
          <View style={styles.row}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.button}
              onPress={this.localMusic.bind(this)}
            >
              <Image style={styles.img} source={imgs.iconSetting.iconLocal} />
              <Text style={styles.text}>
                {langs.localMusic}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.button}
              onPress={this.onUSB.bind(this)}
            >
              <Image style={styles.img}
                resizeMode='contain'
                source={imgs.iconSpeaker.usb} />
              <Text style={styles.text}>
                {langs.usb}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.button}
              onPress={this.localMusic.bind(this)}
            >
              <Image style={styles.imgShare}
                resizeMode='contain'
                source={imgs.iconSpeaker.share} />
              <Text style={styles.textShare}>
                {langs.shareMusic}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.button}
              onPress={this.localMusic.bind(this)}
            >
              <Image style={styles.img} source={imgs.iconSpeaker.favouriteBlue} />
              <Text style={styles.text}>
                {langs.favourite}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.buttonHomeDisplay}
              onPress={this.localMusic.bind(this)}
            >
              <View style={styles.leftHomeDisplay}>
                <Image style={styles.img} source={imgs.iconSpeaker.homeMusic} />
                <Text style={styles.text}>
                  {langs.homeDisplay}
                </Text>
              </View>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => this.setState({isOpen: !this.state.isOpen})}
                style={styles.rightHomeDisplay}
              >
                <Image
                  style={styles.imgDisplay}
                  source={this.state.isOpen ? imgs.base.down : imgs.base.right}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
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
  button: {
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 13,
    borderBottomWidth: 0.5,
    borderBottomColor: '#2b3848',
  },
  img: {
    height: 28,
    width: 28,
  },
  imgShare: {
    height: 32,
    width: 32,
  },
  text: {
    fontSize: 17,
    fontWeight: '500',
    backgroundColor: 'transparent',
    color: '#7e92a8',
    marginLeft: 13,
  },
  textShare: {
    fontSize: 17,
    fontWeight: '500',
    backgroundColor: 'transparent',
    color: '#7e92a8',
    marginLeft: 9,
  },
  buttonHomeDisplay: {
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 13,
    borderBottomWidth: 0.5,
    borderBottomColor: '#2b3848',
  },
  leftHomeDisplay: {
    height: 54,
    flexDirection: 'row',
    alignItems: 'center'
  },
  rightHomeDisplay: {
    height: 54,
    width: 54,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgDisplay: {
    height: 12,
    width: 12
  }
})

export default SpeakerMenu;
