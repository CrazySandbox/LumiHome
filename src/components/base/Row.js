import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

class Row extends Component {
  static propTypes = {
    type: PropTypes.string,
    style: View.propTypes.style,
    onPress: PropTypes.func,
    leftTitle: PropTypes.string,
    alignLeftTitle: PropTypes.string,
    styleLeftTitle: View.propTypes.style,
    imageLeft: Image.propTypes.source,
    styleImageLeft: View.propTypes.style,
    rightTitle: PropTypes.string,
    styleRightTitle: View.propTypes.style,
    imageRight: Image.propTypes.source,
    styleImageRight: View.propTypes.style,
    styleSeparator: View.propTypes.style,
  }

  static defaultProps = {
    type: "normal",
    alignLeftTitle: "left",
  }

  render() {
    const {
      type,
      style,
      onPress,
      leftTitle,
      styleLeftTitle,
      imageLeft,
      styleImageLeft,
      rightTitle,
      styleRightTitle,
      imageRight,
      styleImageRight,
      styleSeparator,
      alignLeftTitle
    } = this.props

    if(type == "normal") {
      leftRow = (
        <Text style={[styles.textLeft, styleLeftTitle]} numberOfLines={1}>
          {leftTitle}
        </Text>
      )

      rightRow = null
    }

    if(type == "iconLeft") {
      leftRow = (
        <View style={styles.leftRow}>
          <View style={styles.viewImgLeft}>
            <Image
              style={[styles.imgLeft, styleImageLeft]}
              source={imageLeft}
              resizeMode="stretch"
            />
          </View>
          <View style={styles.titleLeft}>
            <Text style={[styles.textLeft, styleLeftTitle]} numberOfLines={1}>
              {leftTitle}
            </Text>
          </View>
        </View>
      )

      rightRow = null
    }

    return (
      <View style={[styles.container, style]}>
        <View style={[styles.RowSeparator, styleSeparator]}>
          <TouchableOpacity
            style={[
              styles.RowContainer,
              type == "normal" ? alignLeftTitle == "center" ? {justifyContent: 'center'} : {} : {}
            ]}
            onPress={onPress}
            activeOpacity={0.7}
          >
            <View style={styles.leftRow}>
              {
                leftRow
              }
            </View>
            <View style={styles.rightRow}>
              {
                rightRow
              }
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    paddingLeft: 13,
    backgroundColor: 'rgba(43, 56, 72, 0.3)',
  },
  RowSeparator: {
    flex: 1,
    paddingRight: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: '#2b3848',
  },
  RowContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftRow: {
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
  },
  rightRow: {
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
  },
  textLeft: {
    fontSize: 17,
    fontWeight: '500',
    color: '#7e92a8',
    backgroundColor: 'transparent',
  },
  viewImgLeft: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    width: 36,
    marginRight: 3,
  },
  imgLeft: {
    height: 30,
    width: 30,
  },
  titleLeft: {
    justifyContent: 'center',
  }
});

export default Row;
