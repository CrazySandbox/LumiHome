import React, { Component } from 'react';
import { View, AsyncStorage, ActivityIndicator, Text } from 'react-native';
import { Provider } from 'react-redux';
import store from './store';
import Body from './config/body';
import langs from './config/langs';
import Loading from './components/base/loading';

import RouterComponent from './Router';
import SocketClient from './config/socket/socket-client';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initInstall: 0,
    }
  }

  componentWillMount() {
    SocketClient.getInstance().connect();
    AsyncStorage.getItem("initInstall")
    .then((value) => {
      if(value !== null) {
        this.setState({
          initInstall: value + 1
        })
      } else {
        this.setState({
          initInstall: 1,
        })
      }
    })

  }

  render() {
    let { initInstall } = this.state
    if(initInstall == 0) {
      return (
        <Body>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} >
            <Loading />
          </View>
        </Body>
      )
    } else {
      return (
        <Provider store={store} >
          <RouterComponent
              initInstall={initInstall}
          />
        </Provider>
      );
    }
  }
}

export default App;
