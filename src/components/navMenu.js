import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Platform,
} from 'react-native';

//import LinearGradient from 'react-native-linear-gradient';

const { height, width } = Dimensions.get('window');

class NavMenu extends Component {

  static propTypes = {
    title: PropTypes.string,
    hideNav: PropTypes.bool
  }

  static defaultProps = {
    hideNav: false
  }

  render() {
    const {
      title,
      hideNav
    } = this.props

    if(hideNav) {
      return <View />
    } else {
      return (
        <View style={styles.top}>
        <View style={styles.cotainer}>
          <View style={styles.statusBar}>
          </View>
          <View style={styles.mainBar}>
            {title ? <Text style={styles.title}>{title}</Text> : <View />}
          </View>
        </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  top: {
    height: Platform.OS == 'ios' ? 64 : 54,
    backgroundColor: 'transparent',
    borderBottomWidth: 0.5,
    borderBottomColor: '#2b3848',
  },
  statusBar: {
    height: 20,
    backgroundColor: 'transparent',
  },
  mainBar: {
    height: Platform.OS == 'ios' ? 44 : 34,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    backgroundColor: 'transparent'
  },
  title: {
    color: '#7e92a8',
    fontSize: 17,
    fontWeight: '500',
    textAlign: 'center',
  }
});

export default NavMenu;
