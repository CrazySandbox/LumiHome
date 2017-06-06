import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import Body from '../../config/body';
import langs from '../../config/langs';
import imgs from '../../config/theme';
import WifiAudio from '../../actions/speaker/wifiaudio';
import Modal from 'react-native-modalbox';
import Input from '../../components/base/TextInput';

class MyListItem extends Component {
  render() {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => console.log(this.props)}
        style={{justifyContent: 'center', alignItems: 'center'}}
      >
      <Text style={{color: 'white'}}>OnPress</Text>
    </TouchableOpacity>
    );
  }
}

class RenameSpeaker extends Component {

  constructor(props) {
    super(props);
    var speaker = this.props.data;
    var DATA = [
      {title: speaker.device.DeviceName, key: 0},
      {title: 'Custom', key: 1},
      {title: 'Livingroom', key: 2},
      {title: 'Bedroom', key: 3},
      {title: 'Master Room', key: 4},
      {title: 'Kitchen', key: 5},
      {title: 'Dinning Room', key: 6},
      {title: 'Metting Room', key: 7},
      {title: 'Hallway', key: 8},
      {title: 'Bathroom', key: 9},
      {title: 'Garden', key: 10},
    ];
    this.state = {
      data: DATA,
      select: 0,
      error: false,
      textInput: ''
    }
  }

  componentWillMount() {
    Actions.refresh({onRight: this.onRight, rightTitle: "Done", onLeft: this.onLeft, leftButtonImage: imgs.base.leftWhite})
  }

  onRight = () => {
    if(this.state.select > 1) {
      WifiAudio.rename(this.props.data.ip, this.state.data[this.state.select].title, (json) => {
        Actions.speaker({type: 'reset'})
      })
    }

    if(this.state.select == 0) {
      Actions.speaker({type: 'reset'})
    }

    if(this.state.select == 1) {
      this.setState({
        error: false
      })
      this.refs.modal.open()
    }
  }

  onLeft = () => {
    Actions.speaker({type: 'reset'})
  }

  _onPressItem(item) {
    this.setState({
      select: item.key
    })
  }

  _onChangeText(value) {
    this.setState({
      textInput: value,
    })
    if(this.state.textInput.length > 0) {
      this.setState({
        error: false,
      })
    }
  }

  onCancel() {
    this.refs.modal.close()
  }

  onDone() {
    if(this.state.textInput.length == 0) {
      this.setState({
        error: true
      })
    } else {
      this.setState({
        error: false
      })
      WifiAudio.rename(this.props.data.ip, this.state.textInput, (json) => {
        Actions.speaker({type: 'reset'})
      })
    }
  }

  _renderItem = ({item}) => {
    return (
      <View style={styles.rowContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.row}
          onPress={() => this._onPressItem(item)}
        >
          <Text style={[styles.title, item.key<1 ? styles.firstTitle : styles.notRender]}>
            {item.title}
          </Text>
          <View style={styles.rightImage}>
            {this.state.select !== item.key ? <View /> : <Image style={styles.image} source={imgs.base.check} />}
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    let speaker = this.props.data;
    return (
      <Body>
      <FlatList
        data={this.state.data}
        renderItem={this._renderItem}
        keyExtractor={item => item.key}
        extraData={this.state.select}
      />
      <Modal
        style={styles.modal}
        position={"center"}
        ref={"modal"}
        onClosed={this.onClose}
        onOpened={this.onOpen}
      >
        <View style={styles.body}>
          <Input
            placeholder={langs.enterNameSpeaker}
            onChangeText={this._onChangeText.bind(this)}
            style={styles.textInput}
            error={this.state.error}
          />
        </View>
        <View style={styles.bottom}>
          <View style={styles.cancel}>
            <TouchableOpacity
              style={styles.Button}
              onPress={this.onCancel.bind(this)}
            >
              <Text style={styles.textCancel}>
                {langs.cancelSpeaker}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.done}>
            <TouchableOpacity
              style={styles.Button}
              onPress={this.onDone.bind(this)}
            >
              <Text style={styles.textDone}>
                {langs.doneSpeaker}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      </Body>
    );
  }
}

const styles = StyleSheet.create({
  rowContainer: {
    height: 50,
    justifyContent: 'center',
    marginHorizontal: 13,
    borderBottomWidth: 0.5,
    borderBottomColor: '#2b3848',
  },
  row: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 17,
    fontWeight: '500',
    color: '#7e92a8',
    backgroundColor: 'transparent',
  },
  firstTitle: {
    color: '#19c1ff',
  },
  rightImage: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    height: 13,
    width: 13
  },
  modal: {
    height: 150,
    width: 300,
    marginBottom: 64,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: '#2b3848',
  },
  body: {
    width: 300,
    height: 150-54,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5
  },
  textInput: {
    width: 280,
    height: 40
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 54,
    width: 300,
    flexDirection: 'row',
    borderTopWidth: 0.5,
    borderTopColor: '#2b3848',
  },
  cancel: {
    width: 300/2,
    height: 54,
    borderRightWidth: 0.5,
    borderRightColor: '#2b3848',
  },
  Button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textCancel: {
    fontSize: 17,
    fontWeight: '500',
    backgroundColor: 'transparent',
    color: '#7e92a8',
    textAlign: 'center',
  },
  done: {
    width: 300/2,
    height: 54,
  },
  textDone: {
    fontSize: 17,
    fontWeight: '500',
    backgroundColor: 'transparent',
    color: '#19c1ff',
    textAlign: 'center',
  }
});

export default RenameSpeaker;
