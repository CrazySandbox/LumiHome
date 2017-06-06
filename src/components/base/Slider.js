'use strick';

import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Slider,
  View,
  Dimensions,
  Image
} from 'react-native';
import imgs from '../../config/theme';

var { width, height } = Dimensions.get('window');

class SliderBase extends Component {

  static propTypes = {
    disabled: PropTypes.bool,
    maximumTrackTintColor: PropTypes.string,
    minimumTrackTintColor: PropTypes.string,
    maximumValue: PropTypes.number,
    minimumValue: PropTypes.number,
    onSlidingComplete: PropTypes.func,
    onValueChange: PropTypes.func,
    step: PropTypes.number,
    style: View.propTypes.style,
    value: PropTypes.number,
    thumbTintColor: PropTypes.string,
    thumbImage: Image.propTypes.source
  }

  static defaultProps = {
    disabled: false,
    maximumTrackTintColor: "#7e92a8",
    minimumTrackTintColor: "#19c1ff",
    maximumValue: 100,
    minimumValue: 0,
    step: 1,
    thumbTintColor: "#19c1ff",
    thumbImage: imgs.iconSpeaker.thumb
  }

  render() {
    return (
        <Slider
        disabled={this.props.disabled}
        maximumTrackTintColor={this.props.maximumTrackTintColor}
        minimumTrackTintColor={this.props.minimumTrackTintColor}
        maximumValue={this.props.maximumValue}
        minimumValue={this.props.minimumValue}
        onSlidingComplete={this.props.onSlidingComplete}
        onValueChange={this.props.onValueChange}
        step={this.props.step}
        style={[this.props.style || styles.slider]}
        value={this.props.value}
        thumbTintColor={this.props.thumbTintColor}
        thumbImage={this.props.thumbImage}
        />
    );
  }
}

const styles = StyleSheet.create({
  slider: {
    width: width - 180,
    marginLeft: 5,
    justifyContent: 'center',
  }
})

export default SliderBase;
