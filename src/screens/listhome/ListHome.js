import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Platform,
  TouchableOpacity,
  FlatList,
  TouchableHighlight
} from 'react-native';

import Body from '../../config/body';
import langs from '../../config/langs';
import { connect } from 'react-redux';
import imgs from '../../config/theme';
import commonStyle from '../../config/theme/theme1';
import LinearGradient from 'react-native-linear-gradient';
import Swipeable from 'react-native-swipeable';
import SocketClient from '../../config/socket/socket-client';
import { goHome } from '../../actions';

const PLACE = 'listhome/ListHome.js';

class ListHome extends Component {
  constructor(props) {
    super(props);
    this.state={
      isSwiping: false,
      data: this.props.Data.listhome
    }
  }

  componentWillMount() {
    if(this.props.Data.autoLogin == "1" && this.props.Data.lasthome !== "0") {
      this.props.goHome(this.props.Data.lasthome)
    }
  }

  _renderItem = ({item}) => {
    return (
      <Swipeable
        onSwipeStart={() => this.setState({isSwiping: true})}
        onSwipeComplete={() => this.setState({isSwiping: false})}
        onSwipeMove={() => this.setState({isSwiping: true})}
        leftButtons={[
          <View style={styles.viewButtonLeft}>
            <View style={{flex: 1}}/>
            <TouchableHighlight style={styles.button}>
              <Text style={styles.textLeft}>
                {langs.edit}
              </Text>
            </TouchableHighlight>
          </View>
          ]
        }
        rightButtons={[
          <View style={styles.viewButton}>
            <TouchableHighlight style={styles.button}>
              <Text style={styles.textRight}>
                {langs.delete}
              </Text>
            </TouchableHighlight>
            <View />
          </View>
          ]
        }
      >
        <TouchableOpacity
          style={styles.item}
          onPress={() => this.props.goHome(item.mac)}
        >
          <View style={styles.image}>
            <Image source={item.img !== '1' ? imgs.iconSetting.avatar : {uri: 'data:image/jpeg;base64,' + item.img, isStatic: true}} style={item.img === '1' ? styles.Image : styles.ImageDefault} />
          </View>
          <View style={styles.renderRight}>
            <Text style={styles.homename}>
              {langs.namehome}{item.name}
            </Text>
            <Text style={styles.doman}>
              {langs.domainhome}{item.domain}
            </Text>
            <Text style={styles.mac}>
              {langs.machome}{item.mac}
            </Text>
            <View style={styles.status}>
              <View style={styles.imageStatus}>
                <Image
                  style={styles.imgs}
                  source={item.state == "0" ? imgs.iconSetting.online : imgs.iconSetting.offline}
                />
              </View>
              <View style={styles.viewStatus}>
                <Text style={styles.textStatus}>
                  {item.state == "0" ? "Online" : "Offline" }
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Swipeable>
    )
  }

  render() {
    const navBar = (
      <LinearGradient
        style={commonStyle.navBar}
        start={{x: 0.0, y: 0.0}} end={{x: 0.0, y: 1.0}}
        locations={[0,0.3,1]}
        colors={['#000', '#00000F', '#000']}>
          <TouchableOpacity style={commonStyle.leftIconBar} onPress={() => this.props.toggleSideMenu()}>
            <Image source={imgs.iconSetting.hidemenu} style={commonStyle.imageLeftNav} />
          </TouchableOpacity>
          <Text style={commonStyle.navTitle}>
            {langs.listhome}
          </Text>
          <Text />
      </LinearGradient>
    )

    const listHome = (
      <FlatList
        scrollEnabled={!this.state.isSwiping}
        keyExtractor={item => item.mac}
        data={this.state.data}
        renderItem={this._renderItem}
      />
    )

    const nohome = (
      <View style={styles.nohome}>
        <Text style={styles.textNohome}>
          {langs.listhomezero}
        </Text>
      </View>
    )

    return (
      <Body>
        {navBar}
        {
          this.props.Data.listhome.length == 0 ? nohome : listHome
        }
      </Body>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    height: 110,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    marginBottom: 1,
  },
  image: {
    height: 110,
    width: 110,
    justifyContent: 'center',
    alignItems: 'center',
  },
  renderRight: {
    flex: 1,
    paddingRight: 8,
    paddingTop: 8,
    paddingBottom: 13,
    justifyContent: 'space-between',
  },
  homename: {
    fontSize: 17,
    fontWeight: '500',
    color: 'white',
    backgroundColor: 'transparent',
    textAlign: 'left',
  },
  doman: {
    fontSize: 15,
    fontWeight: '400',
    color: 'white',
    backgroundColor: 'transparent',
    textAlign: 'left',
  },
  mac: {
    fontSize: 13,
    fontWeight: '400',
    color: 'white',
    backgroundColor: 'transparent',
    textAlign: 'left',
  },
  status: {
    flexDirection: 'row',
    height: 14,
  },
  viewStatus: {
    height: 14,
    justifyContent: 'center'
  },
  imageStatus: {
    height: 14,
    width: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgs: {
    height: 12,
    width: 12,
    borderRadius: 6,
  },
  textStatus: {
    fontSize: 12,
    fontWeight: '400',
    color: 'white',
    backgroundColor: 'transparent',
    textAlign: 'left',
    marginLeft: 8,
  },
  nohome: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textNohome: {
    backgroundColor: 'transparent',
    fontSize: 17,
    color: 'white'
  },
  Image: {
      height: 70,
      width: 70,
      borderRadius: 35,
    },
  ImageDefault: {
    height: 70,
    width: 70,
    borderRadius: 35,
    backgroundColor: 'transparent',
  },
  viewButton: {
    flexDirection: 'row',
    backgroundColor: '#19C1FF',
    height: 110,
    alignItems: 'flex-start'
  },
  viewButtonLeft: {
    flexDirection: 'row',
    backgroundColor: '#19C1FF',
    height: 110,
    alignItems: 'flex-end'
  },
  button: {
    height: 110,
    width: 75,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textLeft: {
    fontSize: 17,
    fontWeight: '500',
    textAlign: 'right',
    color: 'white',
    backgroundColor: 'transparent',
  },
  textRight: {
    fontSize: 17,
    fontWeight: '500',
    color: 'white',
    backgroundColor: 'transparent',
  }
})

const mapStateToProps = (state) => {
  return {
    Data: state.authen
  }
}
export default connect(mapStateToProps, { goHome })(ListHome);
