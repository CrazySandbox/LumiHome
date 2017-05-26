import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
  ScrollView,
  Dimensions,
  TextInput
} from 'react-native';
import Body from '../../config/body';

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

var { height, width } = Dimensions.get('window');

class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dulieu: this.props.data,
      scroll: false,
    }
  }

  static contextTypes = {
    routes: PropTypes.object.isRequired,
  };

  renderNavigationBar(props){
    return(
      <Text>Render</Text>
    )
  }

  renderRightButton = () => {
    console.log('props la: ',this.props)
    return (
      <TouchableOpacity onPress={this._onSave}>
        <Text style={styles.text} >Luu</Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <Body>
        <View style={styles.container}>
          <View>
            <TextInput />
          </View>
        </View>
      </Body>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    height: 60,
    width: 300,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 5,
  },
  text: {
    fontSize: 17,
    color: 'white',
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
  cell: {
    height: 50,
    width: 10,
    backgroundColor: 'orange'
  },
  box: {
    height: 50,
    width: (width-10-10)/4,
    backgroundColor: 'red',
    borderWidth: 1,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

const mapStateToProps = (state) => {
  return { data: state.routerReducer }
}

export default connect(mapStateToProps)(Event);
