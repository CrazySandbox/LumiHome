import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { ChangeData } from '../../actions';
import Body from '../../config/body';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modalbox';
import Button from '../../components/base/button';
import { Actions } from 'react-native-router-flux';
import { getDate, getDateTimeSpeaker } from '../../components/until';

class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1
    }
  }

  onPress = () => {
    this.props.ChangeData();
  }

  componentWillMount() {
    this.context.routes.refresh()
  }

  static contextTypes = {
    routes: PropTypes.object.isRequired,
  };

  onPressOpen() {
    Actions.refresh({ hideTabBar: true})
    getDate()
    getDateTimeSpeaker()
    this.refs.modal4.open()
  }

  onOpen() {
    console.log('onOpen')
  }

  onClose() {
    Actions.refresh({ hideTabBar: false})
  }

  render() {
    const {routes} = this.context;
    return (
      <Body>
        <View style={styles.container} >
          <Button
            title="Open modalBox"
            gradient
            onPress={this.onPressOpen.bind(this)}
          />

          <Modal
            style={[styles.modal, styles.modal4]}
            position={"bottom"}
            ref={"modal4"}
            onClosed={this.onClose}
            onOpened={this.onOpen}
          >
            <Button
              title="olala"
              gradient
              onPress={this.onPressOpen.bind(this)}
            />
        </Modal>
        </View>
      </Body>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal: {
  justifyContent: 'center',
  alignItems: 'center'
  },
  modal4: {
    height: 300
  },
  text: {
    fontSize: 17,
    backgroundColor: 'transparent'
  },
  btn: {
    height: 50,
    backgroundColor: 'green',
    paddingHorizontal: 100,
    marginBottom: 10,
    borderRadius: 5,
  },
  btnView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 350,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  textBtn: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 17,
    fontWeight: '500',
  }
});

const mapStateToProps = (state) => {
  return {
    data: state
  }
}
export default connect(mapStateToProps, { ChangeData })(Room);
