import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

import imgs from '../../config/theme';

class Switch extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    initialState: PropTypes.bool,
    style: View.propTypes.style,
    onSwitchOn: PropTypes.func,
    onSwitchOff: PropTypes.func,
    imageSwitchOn: Image.propTypes.source,
    imageSwitchOff: Image.propTypes.source,
    onChangeValue: PropTypes.func,
    value: PropTypes.bool
  }

  static defaultProps = {
    disabled: false,
    initialState: true,
    imageSwitchOn: imgs.base.switchOn,
    imageSwitchOff: imgs.base.switchOff,
  }

  constructor(props) {
    super(props);
    this.state = {
      isSwitchOn: this.props.initialState,
    }
  }

  onChangeValue() {
    this.setState({
      isSwitchOn: this.props.value,
    })
  }

  onPress() {
    if(this.state.isSwitchOn) {
      if(this.props.onSwitchOff) {
        this.props.onSwitchOff()
      }
      this.setState({
        isSwitchOn: false,
      })
    } else {
      if(this.props.onSwitchOn) {
        this.props.onSwitchOn()
      }
      this.setState({
        isSwitchOn: true,
      })
    }
  }

  render() {
    if(this.props.disabled) {
      return (
        <TouchableOpacity
          style={[this.props.style, styles.container, styles.disabled]}
        >
          <Image
            style={styles.img}
            source={this.state.isSwitchOn ? this.props.imageSwitchOn : this.props.imageSwitchOff}
            resizeMode="stretch"
          />
        </TouchableOpacity>
      )
    } else {
      return (
        <TouchableOpacity
          style={[this.props.style, styles.container]}
          onPress={this.onPress.bind(this)}
        >
          <Image
            style={styles.img}
            source={this.state.isSwitchOn ? imgs.base.switchOn : imgs.base.switchOff}
            resizeMode="contain"
          />
        </TouchableOpacity>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 49,
    height: 26,
  },
  disabled: {
    opacity: 0.8
  }
})

export default Switch;
