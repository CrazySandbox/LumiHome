import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
} from 'react-native';

import { SideMenu } from 'react-native-elements';
import MenuHome from './MenuHome';
import Home from './Home';
import { Actions } from 'react-native-router-flux';

const { width, height } = Dimensions.get('window');

class SlideMenuDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    }
    this.toggleSideMenu = this.toggleSideMenu.bind(this)
  }

  componentWillMount() {
    //Actions.refresh({hideNavBar: true})
  }

  componentWillReceiveProps() {
    if(this.state.isOpen == true) {
      this.setState({
        isOpen: false
      })
    }
  }

  onSideMenuChange(isOpen: boolean) {
    this.setState({
      isOpen: isOpen
    });
  }

  toggleSideMenu () {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const menu = <MenuHome />
    return (
      <SideMenu
        isOpen={this.state.isOpen}
        onChange={this.onSideMenuChange.bind(this)}
        openMenuOffset={2*width/3}
        menuPosition='left'
        menu={menu}
      >
        <Home
          toggleSideMenu={this.toggleSideMenu.bind(this)}
        />
      </SideMenu>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default SlideMenuDashboard;
