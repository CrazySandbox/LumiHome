import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity
} from 'react-native';

import commonStyle from '../../config/theme/theme1';
import langs from '../../config/langs';
import { Actions } from 'react-native-router-flux';

class MenuListHome extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={commonStyle.navMenu}>
          <Text style={commonStyle.navTitle}>
            {langs.menu}
          </Text>
        </View>
        <ScrollView>
          <TouchableOpacity
            style={styles.row}
            onPress={() => {}}
          >
            <Text style={styles.text}>
              Mot
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.row}
            onPress={() => {}}
          >
            <Text style={styles.text}>
              hai
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.row}
            onPress={() => {}}
          >
            <Text style={styles.text}>
              ba
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.row}
            onPress={() => Actions.login({type: 'reset'})}
          >
            <Text style={styles.text}>
              Thoat
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#29323c'
  },
  row: {
    height: 54,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    marginBottom: 1,
  },
  text: {
    color: 'white',
    fontSize: 17
  }
});

export default MenuListHome;
