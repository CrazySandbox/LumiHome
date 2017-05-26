import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity
} from 'react-native';

import { connect } from 'react-redux';
import { logOut, ResetFactory } from '../../actions';
import commonStyle from '../../config/theme/theme1';
import langs from '../../config/langs';
import { Actions } from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';

class MenuListHome extends Component {
  render() {
    return (
      <View style={styles.container}>
        <LinearGradient
          style={commonStyle.navMenu}
          start={{x: 0.0, y: 0.0}} end={{x: 0.0, y: 1.0}}
          locations={[0,0.3,1]}
          colors={['#000', '#00000F', '#000']}>
          <Text style={commonStyle.navTitle}>
            {langs.menu}
          </Text>
        </LinearGradient>
        <ScrollView>
          <TouchableOpacity
            style={styles.row}
            onPress={() => {}}
          >
            <Text style={styles.text}>
              Tai khoan
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.row}
            onPress={() => {}}
          >
            <Text style={styles.text}>
              Ngon ngu
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.row}
            onPress={() => {}}
          >
            <Text style={styles.text}>
              Theme
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.row}
            onPress={() => this.props.logOut()}
          >
            <Text style={styles.text}>
              Thoat
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.row}
            onPress={() => this.props.ResetFactory()}
          >
            <Text style={styles.text}>
              ResetFactory
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

const mapStateToProp = (state) => {
  return {
    state
  }
}

export default connect(mapStateToProp,{ logOut, ResetFactory })(MenuListHome);
