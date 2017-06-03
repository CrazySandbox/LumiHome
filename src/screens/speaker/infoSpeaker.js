import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import Body from '../../config/body';
import langs from '../../config/langs';
import imgs from '../../config/theme';

class SpeakerInfo extends Component {

  componentWillMount() {
    Actions.refresh({onLeft: this.onLeft, leftButtonImage: imgs.base.leftWhite})
  }

  onLeft = () => {
    Actions.speaker({type: 'reset'})
  }

  render() {
    return (
      <Body>
        <Text style={{color: 'white'}}>
          this is components infoSpeaker
        </Text>
      </Body>
    );
  }
}

const styles = StyleSheet.create({
  container: {

  }
});

export default SpeakerInfo;
