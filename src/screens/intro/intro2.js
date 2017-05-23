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
import langs from '../../config/langs';
import { Actions } from 'react-native-router-flux';

class Intro2 extends Component {
  render() {
    return (
      <Body>
        <View style={styles.container}>
          <Text style={styles.title}>
            Man hinh dau tien
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => Actions.intro3()}
          >
            <Text style={styles.title}>
              Next
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottom}>
          <View style={styles.ovan} />
          <View style={[styles.ovan, styles.active]} />
          <View style={styles.ovan} />
        </View>
      </Body>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    backgroundColor: 'transparent',
    fontSize: 17,
    color: 'white'
  },
  button: {
    width: 80,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  bottom: {
    position: 'absolute',
    bottom: 20,
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ovan: {
    width: 9,
    height: 9,
    borderRadius: 9/2,
    borderWidth: 0.5,
    borderColor: 'white',
    marginHorizontal: 5,
  },
  active: {
    backgroundColor: 'grey'
  }
});

export default Intro2;
