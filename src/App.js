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
      langDefault: "vn",
      themeDefault: "darktheme",
      language: "",
      theme: "",
      initInstall: 0,
    }
  }

  componentWillMount() {
    SocketClient.getInstance().connect();
    AsyncStorage.getItem("language")
    .then((value) => {
      if(value !== null) {
        this.setState({
          language: value
        })
      } else {
        langs.setLanguage(this.state.langDefault)
        this.setState({
          language: this.state.langDefault
        })
      }
    })

    AsyncStorage.getItem("theme")
    .then((value) => {
      if(value !== null) {
        this.setState({
          theme: value
        })
      } else {
        this.setState({
          theme: this.state.themeDefault
        })
      }
    })

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
    if(this.state.language == "" || this.state.theme == "" || this.state.initInstall == 0) {
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
              language={this.state.language}
              theme={this.state.theme}
              initInstall={this.state.initInstall}
          />
        </Provider>
      );
    }
  }
}

export default App;
