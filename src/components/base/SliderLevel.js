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

class SliderLevel extends Component {

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
    levels: PropTypes.array,
    valueText: PropTypes.array,
    width: PropTypes.number,
    height: PropTypes.number,
  }

  static defaultProps = {
    disabled: false,
    maximumTrackTintColor: "#7e92a8",
    minimumTrackTintColor: "#19c1ff",
    thumbTintColor: "#19c1ff",
    thumbImage: imgs.iconSpeaker.thumb,
    width: 330,
    height: 60,
    levels: [0, 5, 10, 20, 30, 60, 120, 300],
    valueText: ['0m','5m','10m','20m','30m','1h','2h','5h'],
  }

  constructor(props) {
    super(props);
    this.state = {
      w: this.props.width,
      h: this.props.height,
      level: this.props.levels.length,
    }
  }

  _onValueChange(value) {
    let data = this.props.levels[value];
    if(this.props.onValueChange) {
      this.props.onValueChange(data);
    }
  }

  _onSlidingComplete(value) {
    let data = this.props.levels[value];
    if(this.props.onSlidingComplete) {
      this.props.onSlidingComplete(data);
    }
  }

  render() {
    let { w, h, level } = this.state;
    let s = w/(level - 1);
    let width = w + s;
    return (
      <View style={[{width: width, height: h},styles.container]}>
        <View style={[{width: width, height: 40}, styles.top]}>
          <View style={[{width: w - 8, height: 40},styles.underlay]}>
            {
              this.props.levels.map(function(item,i){
    						return(
    							<View key={i} style={styles.item} />
    						)
    					}.bind(this))
            }
          </View>
          <View style={[{width: w, height: 40, top: 0, left: s/2}, styles.viewSlider]}>
            <Slider
            disabled={this.props.disabled}
            maximumTrackTintColor={this.props.maximumTrackTintColor}
            minimumTrackTintColor={this.props.minimumTrackTintColor}
            maximumValue={level-1}
            minimumValue={0}
            onSlidingComplete={(value) => this._onSlidingComplete(value)}
            onValueChange={(value) => this._onValueChange(value)}
            step={1}
            style={this.props.style || styles.slider}
            value={this.props.value}
            thumbTintColor={this.props.thumbTintColor}
            thumbImage={this.props.thumbImage}
            />
          </View>
        </View>

        <View style={[{width: width, height: h - 40}, styles.bottom]}>
        {
          this.props.valueText.map(function(item,i){
            return(
              <View key={i} style={[{width: s, height: h-40}, styles.textView]} >
                <Text style={styles.text}>
                  {item}
                </Text>
              </View>
            )
          }.bind(this))
        }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  top: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottom: {
    flexDirection: 'row',
    paddingHorizontal: 3,
  },
  viewSlider: {
    position: 'absolute',
  },
  slider: {
    justifyContent: 'center',
  },
  underlay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  item: {
    borderRightWidth: 1,
    borderRightColor: 'grey',
    height: 8,
  },
  textView: {
    alignItems: 'center',
  },
  text: {
    color: '#7e92a8',
    fontSize: 17,
    fontWeight: '400',
    backgroundColor: 'transparent',
    textAlign: 'center',
    paddingBottom: 5
  }
})

export default SliderLevel;
