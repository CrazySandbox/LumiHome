'use strick';

import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Slider,
  View,
  Dimensions,
  Image,
  Text
} from 'react-native';
import imgs from '../../config/theme';

var { width, height} = Dimensions.get('window');

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
    thumbImage: Image.propTypes.source,
    type: PropTypes.string,
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
    if(this.props.type == 'volume') {
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
    } else if (this.props.type == 'chooseTimer') {
      return (
        <View style={styles.container}>
          <View style={styles.underlay}>
            <View style={styles.node}>
              <Text style={styles.text}>
                1
              </Text>
              <Text style={styles.text}>
                2
              </Text>
              <Text style={styles.text}>
                3
              </Text>
              <Text style={styles.text}>
                4
              </Text>
            </View>
          </View>
          <Slider
          disabled={this.props.disabled}
          maximumTrackTintColor={this.props.maximumTrackTintColor}
          minimumTrackTintColor={this.props.minimumTrackTintColor}
          maximumValue={this.props.maximumValue}
          minimumValue={this.props.minimumValue}
          onSlidingComplete={this.props.onSlidingComplete}
          onValueChange={this.props.onValueChange}
          step={this.props.step}
          style={[this.props.style || styles.sliderChooseTimer]}
          value={this.props.value}
          thumbTintColor={this.props.thumbTintColor}
          thumbImage={this.props.thumbImage}
          />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
  },
  slider: {
    width: width - 180,
    marginLeft: 5,
    justifyContent: 'center',
  },
  sliderChooseTimer: {
    width: width - 60,
    justifyContent: 'center',
  },
  underlay: {
    position: 'absolute',
    backgroundColor: 'yellow'
  },
  node: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    width: width - 60,
  },
  text: {
    color: 'white',
    fontSize: 17
  }
})

export default SliderBase;
