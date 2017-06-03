import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import Body from '../../config/body';
import langs from '../../config/langs';
import imgs from '../../config/theme';

class MyListItem extends Component {
  render() {
    return (
      <TouchableOpacity
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
    var DATA = [speaker.device.name,'Custom','Livingroom','Bedroom','Master Room','Kitchen','Dinning Room','Metting Room','Hallway','Bathroom','Garden'];
  }

  componentWillMount() {
    Actions.refresh({onRight: this.onRight, rightTitle: "Done", onLeft: this.onLeft, leftButtonImage: imgs.base.leftWhite})
  }

  onRight = () => {
    console.log('data', this.props)
  }

  onLeft = () => {
    Actions.speaker({type: 'reset'})
  }

  _keyExtractor = (item, index) => item.id;

  _renderItem = ({item}) => {
    console.log('item = ',item)
    return (
      <Text style={{color: 'white'}}>
        {item}
      </Text>
    )
  }

  render() {
    return (
      <Body>
      <FlatList
        data={this.DATA}
        extraData={this.state}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
      </Body>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default RenameSpeaker;
