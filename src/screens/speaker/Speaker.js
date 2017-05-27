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
  clearIntervalSpeaker
} from '../../actions'
import { connect } from 'react-redux';
import SpeakerListItem from './SpeakerListItem';

class Speaker extends Component {

  constructor(props) {
    super(props);
    this.state = {
      listSpeaker: this.props.data.listSpeaker || [],
      loading: true,
      ip: this.props.data.ip || []
    }
  }

  componentWillMount() {
    // this.props.listenUPNPSpeaker(this.state.loading)
  }

  componentDidMount() {
    this.props.clearIntervalSpeaker()
    this.props.upDateSpeaker()
  }

  componentWillUnmount() {
    this.props.clearIntervalSpeaker()
  }

  componentWillReceiveProps(nextProps) {
    let seft = this
    if(this.state.ip !== nextProps.data.ip) {
      // console.log('state',this.state.ip)
      // console.log('props',nextProps.data.ip)
      this.setState({
        listSpeaker: nextProps.data.listSpeaker,
        loading: nextProps.data.loading,
        ip: nextProps.data.ip
      })
    }
  }

  onPressItem = () => {
    console.log('click me');
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
          data={listSpeaker}
          keyExtractor={item => item.MAC}
          renderItem={this._renderItem}
        />
    )

    const NoSpeaker = (
      <View style={styles.container}>
        <Text style={styles.text}>
          {langs.noSpeaker}
        </Text>
        <Button
          title={langs.addSpeaker}
          gradient
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
            listSpeaker.length > 0 ? ListSpeaker : NoSpeaker
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
  }
});

const mapStateToProps = (state) => {
  return {
    data: state.wifiaudio
  }
}

export default connect(mapStateToProps, { listenUPNPSpeaker, upDateSpeaker, clearIntervalSpeaker })(Speaker);
