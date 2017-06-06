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
import NavMenu from '../../components/navMenu';

class MenuListHome extends Component {
  render() {
    return (
      <View style={styles.container}>
        <NavMenu title={langs.menu} />
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
    backgroundColor: 'rgba(43, 56, 72, 0.5)'
  },
  row: {
    height: 54,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(43, 56, 72, 0.3)',
    marginBottom: 1,
  },
  text: {
    color: '#7e92a8',
    fontSize: 17
  }
});

const mapStateToProp = (state) => {
  return {
    state
  }
}

export default connect(mapStateToProp,{ logOut, ResetFactory })(MenuListHome);
