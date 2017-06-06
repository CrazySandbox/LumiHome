import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
} from 'react-native';

import imgs from '../config/theme';
import LinearGradient from 'react-native-linear-gradient';

const { height, width } = Dimensions.get('window');

class NavBar extends Component {

  static propTypes = {
    title: PropTypes.string,
    leftImage: Image.propTypes.source,
    onLeft: PropTypes.func,
    leftTitle: PropTypes.string,
    rightImage: Image.propTypes.source,
    onRight: PropTypes.func,
    rightTitle: PropTypes.string,
    hideNav: PropTypes.bool
  }

  static defaultProps = {
    hideNav: false
  }

  render() {
    const {
      title,
      leftTitle,
      leftImage,
      rightTitle,
      rightImage,
      hideNav
    } = this.props

    const renderLeft = (
      <TouchableOpacity
        style={styles.buttonLeft}
        onPress={() => this.props.onLeft()}
      >
        <Image style={styles.img} source={leftImage} />
      </TouchableOpacity>
    )

    const renderLeftTitle = (
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.buttonleftTitle}
        onPress={() => this.props.onLeft()}
      >
        <Text style={styles.leftTitle}>
          {leftTitle}
        </Text>
      </TouchableOpacity>
    )

    const renderRight = (
      <TouchableOpacity
        style={styles.buttonRight}
        onPress={() => this.props.onRight()}
      >
        <Image style={styles.img} source={rightImage} />
      </TouchableOpacity>
    )

    const renderRightTitle = (
      <TouchableOpacity
        style={styles.buttonRightTitle}
        onPress={() => this.props.onRight()}
      >
        <Text style={styles.rightTitle}>
          {rightTitle}
        </Text>
      </TouchableOpacity>
    )

    if(hideNav) {
      return <View />
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.statusBar}>
          </View>
          <View style={styles.mainBar}>
            {
              leftImage ? renderLeft : leftTitle ? renderLeftTitle : <View />
            }
            {
              title ? <Text style={styles.title}>{title}</Text> : <View />
            }
            {
              rightImage ? renderRight : rightTitle ? renderRightTitle : <View />
            }
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    height: Platform.OS == 'ios' ? 64 : 54,
    backgroundColor: 'transparent',
    borderBottomWidth: 0.5,
    borderBottomColor: '#2b3848',
  },
  statusBar: {
    height: 20,
    width: width,
    backgroundColor: 'transparent',
  },
  mainBar: {
    width: width,
    height: Platform.OS == 'ios' ? 44 : 34,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    backgroundColor: 'transparent'
  },
  buttonRight: {
    width: 34,
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonRightTitle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLeft: {
    width: 34,
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  buttonleftTitle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 19,
    height: 19,
  },
  leftTitle: {
    color: '#7e92a8',
    fontSize: 17,
    fontWeight: '500',
  },
  rightTitle: {
    color: '#7e92a8',
    fontSize: 17,
    fontWeight: '500',
    textAlign: 'right',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
  }
});

export default NavBar;
