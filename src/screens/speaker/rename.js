import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SectionList
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
    var DATA = [ speaker.device.DeviceName,'Custom','Livingroom','Bedroom','Master Room','Kitchen','Dinning Room','Metting Room','Hallway','Bathroom','Garden'];
    this.state = {
      data: DATA,
    }
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
        {item.data}
      </Text>
    )
  }

  render() {
    let speaker = this.props.data;
    return (
      <Body>
      <SectionList
        renderItem={this._renderItem}
        sections={[
          {data: speaker.device.DeviceName, key: 0},
          {data: 'Custom', key: 1},
          {data: 'Livingroom', key: 2},
          {data: 'Bedroom', key: 3},
          {data: 'Master Room', key: 4},
          {data: 'Kitchen', key: 5},
          {data: 'Dinning Room', key: 6},
          {data: 'Metting Room', key: 7},
          {data: 'Hallway', key: 8},
          {data: 'Bathroom', key: 9},
          {data: 'Garden', key: 10},
        ]}
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
