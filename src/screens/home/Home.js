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
import { LoginAction } from '../../actions';
import { Actions } from 'react-native-router-flux';

var { height, width } = Dimensions.get('window');

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dulieu: this.props.data,
      scroll: false,
      user: '',
      pass: '',
      isLogin: false,
      isOpen: false,
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

  _onSave = () => {
    console.log('luu user: ',this.state.user);
    this.context.routes.tab2();
    console.log('routers', this.context.routes)
  }

  componentWillMount() {
    this.props.LoginAction();
    a = this.props.data;
  }

  componentWillUnmount() {

  }

  componentDidMount() {
    Actions.refresh({renderRightButton: this.renderRightButton});
  }

  onPress = () => {
    console.log('khi nhan login ',this.props.data);
  }

  componentWillReceiveProps(nextProps) {
    //console.log('sau khi update ',nextProps.data);
  }

  _changeTextUser(value) {
    this.setState({
      user: value
    })
    console.log(this.state.user)
  }

  render() {
    return (
      <Body>
        <View style={styles.container}>
        <View>
          <TextInput
            style={styles.textInput}
            placeholder="Nhap vao day"
            placeholderTextColor="rgba(255,255,255,0.2)"
            onChangeText={(value) => this._changeTextUser(value)}
          />
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

export default connect(mapStateToProps, { LoginAction })(Home);
