'use strict';

import React, { Component } from 'react';
import{
	StyleSheet,
	View,
} from 'react-native';

import Slider from '../../components/base';

class Volume extends Component {
	constructor(props){
		super(props)
		var vol = 0
		if(this.props.value != null)
			vol = this.props.value
		this.state = {
			vol: vol
		}
	}

	componentWillReceiveProps(nextProps)
	{
		if(this.props.value != nextProps.value)
		{
			this.setState({
				vol : nextProps.value
			})
		}
	}

	valueChange(value){
		if(this.props.onValueChange)
			this.props.onValueChange(value)
			this.setState({
				vol : value
			})
	}

	slidingComplete(value){
		if(this.props.onSlidingComplete)
			this.props.onSlidingComplete(value)
	}

	render(){
		var vol = this.state.vol
		return(

			<Slider
				minimumValue={0}
				maximumValue={100}
				step={1}
				disabled={this.props.disabled}
				style={styles.container}
				value={vol}
				minimumTrackTintColor={'#19c1ff'}
				trackStyle={styles.trackStyle}
				thumbStyle={styles.thumbStyle}
				onValueChange={(value) => this.valueChange(value)}
				onSlidingComplete={(value) => this.slidingComplete(value)}
			/>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex:1,
		marginLeft:5
	},
	trackStyle: {
		height: 2,
		borderRadius: 1
	},
	thumbStyle: {
		width: 16,
		height: 16,
		borderRadius: 8,
		backgroundColor: 'white',
		shadowColor: 'black',
		shadowOffset: {width: 0, height: 2},
		shadowRadius: 2,
		shadowOpacity: 0.35,
	}
})

module.exports = Volume
