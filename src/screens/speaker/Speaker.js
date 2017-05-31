import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList
} from 'react-native';
import Body from '../../config/body';
import Button from '../../components/base/button';
import langs from '../../config/langs';
import Loading from '../../components/base/loading';
import {
  listenUPNPSpeaker,
  upDateSpeaker,
  clearIntervalSpeaker,
  searchUPNP
} from '../../actions'
import { connect } from 'react-redux';
import SpeakerListItem from './SpeakerListItem';
import { Actions } from 'react-native-router-flux';
import imgs from '../../config/theme';

class Speaker extends Component {

  constructor(props) {
    super(props);
    this.state = {
       listSpeaker: [],
       loading: true,
       refreshing: false
    }
  }

  componentWillMount() {
    this.props.listenUPNPSpeaker(this.state.loading)
    Actions.refresh({onRight: this.onRight, rightButtonImage: imgs.iconSpeaker.add})
  }

  onRight = () => {
    this.props.listenUPNPSpeaker(this.state.loading)
  }

  componentDidMount() {
    // this.props.upDateSpeaker()
    // if(!this.timeoutSearch) {
    //   return
    // } else {
      this.timeoutSearch = null
      this.timeoutSearch = setTimeout(() => {
        this.setState({
        loading: false
        })
       }, 12000);
    // }
  }

  componentWillUnmount() {

  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps',nextProps)
    if(nextProps.data.length > 0) {
      this.setState({
        loading: nextProps.loading
      })
    }
  }

  onPressItem = () => {
    console.log('click me');
  }

  onRefresh() {
    this.props.listenUPNPSpeaker()
    this.timeoutSearch = setTimeout(()=> {
			this.setState({
				refreshing : false
			})
			this.timeoutSearch = null
		}, 60000);
  }

  _renderItem = ({item}) => {
    return (
      <SpeakerListItem
        onPressItem={this._onPressItem}
        speaker={item}
      />
    );
  }

  render() {
    const { listSpeaker, loading } = this.state
    const ListSpeaker = (
        <FlatList
          data={this.props.data}
          keyExtractor={item => item.device.MAC}
          renderItem={this._renderItem}
          onRefresh={this.onRefresh.bind(this)}
          refreshing={this.state.refreshing}
          enableEmptySections={true}
        />
    )

    const NoSpeaker = (
      <View style={styles.container}>
        <Text style={styles.text}>
          {langs.noSpeaker}
        </Text>
        <Button
          title={langs.addSpeaker}
          style={styles.button}
          onPress={() => this.props.listenUPNPSpeaker()}
        />
      </View>
    )
    if(loading) {
      return (
        <Body>
          <View style={styles.container}>
            <Loading />
          </View>
        </Body>
      );
    } else {
      return (
        <Body>
          {
            this.props.data.length > 0 ? ListSpeaker : NoSpeaker
          }
        </Body>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 17,
    backgroundColor: 'transparent',
    marginBottom: 13,
    color: 'white'
  },
  button: {
    backgroundColor: 'rgba(25, 193, 255, 0.9)',
    borderRadius: 5,
  }
});

const mapStateToProps = (state) => {
  //console.log('data = ',state.wifiaudio)
  return {
    data: state.wifiaudio.listSpeaker,
  }
}

export default connect(mapStateToProps, { listenUPNPSpeaker, upDateSpeaker, clearIntervalSpeaker, searchUPNP })(Speaker);
