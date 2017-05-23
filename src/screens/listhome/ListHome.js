import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Platform,
  TouchableOpacity
} from 'react-native';

import Body from '../../config/body';
import langs from '../../config/langs';
import imgs from '../../config/theme';
import commonStyle from '../../config/theme/theme1';

class ListHome extends Component {
  constructor(props) {
    super(props);
    this.state={

    }
  }

  render() {
    return (
      <Body>
        <View style={commonStyle.navBar}>
          <TouchableOpacity style={commonStyle.leftIconBar} onPress={() => this.props.toggleSideMenu()}>
            <Image source={imgs.iconSetting.hidemenu} style={commonStyle.imageLeftNav} />
          </TouchableOpacity>
          <Text style={commonStyle.navTitle}>
            {langs.listhome}
          </Text>
          <Text />
        </View>
      </Body>
    );
  }
}

export default ListHome;
