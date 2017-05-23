import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator
} from 'react-native';

class Loading extends Component {
  static propTypes = {
    animating: PropTypes.bool,
    size: PropTypes.string,
    style: View.propTypes.style,
    color: PropTypes.string,
  }

  static defaultProps = {
    size: 'large',
    animating: true,
    color: 'white'
  }

  render() {
    const {
      animating,
      size,
      style,
      color
    } = this.props;
    return (
      <View style={[style, styles.container]}>
        <ActivityIndicator
          animating={animating}
          size={size}
          color={color}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: 80,
    borderRadius: 7,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default Loading;
