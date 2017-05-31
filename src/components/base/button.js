import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

const propTypes = {
  style: View.propTypes.style,
  styleTitle: View.propTypes.style,
  onPress: PropTypes.func,
  title: PropTypes.string,
  gradient: PropTypes.bool,
  start: PropTypes.obj,
  end: PropTypes.obj,
  locations: PropTypes.array,
  colors: PropTypes.array,
}

class Button extends Component {
  render() {
    const {
      style,
      styleTitle,
      onPress,
      title,
      gradient,
      start,
      end,
      locations,
      colors,
    } = this.props;

    const content = (
      gradient ? (
        <LinearGradient
          style={styles.button}
          start={start}
          end={end}
          locations={locations}
          colors={colors}
        >
          <Text style={[styleTitle, styles.title]}>{title}</Text>
        </LinearGradient>
      ) : (
        <View style={styles.button}>
          <Text style={[styleTitle, styles.title]}>{title}</Text>
        </View>
      )
    );

    return (
      <TouchableOpacity
        style={[style, styles.container]}
        onPress={() => onPress()}
      >
        {content}
      </TouchableOpacity>
    );
  }
}

Button.defaultProps = {
  gradient: false,
  start: {x: 1, y: 0},
  end: {x: 0, y: 0},
  locations: [0,0.5,1],
  colors: ['#19c1fa', '#19c1ff', '#19c1fa']
}

const styles = StyleSheet.create({
  container: {
    width: 320,
    height: 50,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  title: {
    color: 'white',
    fontSize: 17,
    fontWeight: '500',
    textAlign: 'center',
    backgroundColor: 'transparent'
  }
});

export default Button;
