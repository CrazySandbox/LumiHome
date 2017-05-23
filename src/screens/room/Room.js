import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import { ChangeData } from '../../actions';
import Body from '../../config/body';
import LinearGradient from 'react-native-linear-gradient';

class Room extends Component {
  onPress = () => {
    this.props.ChangeData();
  }

  componentWillMount() {
    this.context.routes.refresh()
  }

  static contextTypes = {
    routes: PropTypes.object.isRequired,
  };

  render() {
    const {routes} = this.context;
    console.log('room context',this.context)
    return (
      <Body>
        <View style={styles.container} >
          <Text style={styles.text}>
            This is component Room
          </Text>
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
