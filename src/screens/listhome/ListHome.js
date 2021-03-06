import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Platform,
  TouchableOpacity,
  FlatList,
  TouchableHighlight,
  Dimensions,
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
import NavBar from '../../components/navBar';

const PLACE = 'listhome/ListHome.js';
const { width, height } = Dimensions.get('window');

class ListHome extends Component {
  constructor(props) {
    super(props);
    this.state={
      isSwiping: false,
      data: this.props.Data.listhome
    }
  }

  componentWillMount() {
    checkData = (DATA, a) => {
      for(var i = 0; i< DATA.length; i++) {
        if(DATA[i].mac == a) {
          return true
        } else {
          return false
        }
      }
    }

    if(this.props.Data.autoLogin == "1" && this.props.Data.lasthome !== "0") {
      if(this.state.data.length > 0) {
        let check = checkData(this.state.data, this.props.Data.lasthome)
        if(check) {
          this.props.goHome(this.props.Data.lasthome, this.state.data)
        } else {
          return
        }
      }
    }
  }

  swipeable = null;

  handleUserBeganScrollingParentView() {
    this.swipeable.recenter();
  }

  _renderItem = ({item}) => {
    return (
      <Swipeable
        onRef={ref => this.swipeable = ref}
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
          activeOpacity={0.7}
          style={styles.item}
          onPress={() => this.props.goHome(item.mac, this.state.data)}
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
                  source={!item.state == "0" ? imgs.iconSetting.online : imgs.iconSetting.offline}
                />
              </View>
              <View style={styles.viewStatus}>
                <Text style={styles.textStatus}>
                  {!item.state == "0" ? "Online" : "Offline" }
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Swipeable>
    )
  }

  onLeft() {
    this.props.toggleSideMenu()
  }

  render() {
    const navBar = (
      <NavBar
        leftImage={imgs.iconSetting.hidemenu}
        onLeft={this.onLeft.bind(this)}
        title={langs.listhome}
      />
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
    backgroundColor: 'rgba(43, 56, 72, 0.3)',
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
    color: '#19c1ff',
    backgroundColor: 'transparent',
    textAlign: 'left',
  },
  doman: {
    fontSize: 15,
    fontWeight: '400',
    color: '#7e92a8',
    backgroundColor: 'transparent',
    textAlign: 'left',
  },
  mac: {
    fontSize: 13,
    fontWeight: '400',
    color: '#7e92a8',
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
    color: '#7e92a8',
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
    color: '#7e92a8'
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
    color: '#fff',
    backgroundColor: 'transparent',
  },
  textRight: {
    fontSize: 17,
    fontWeight: '500',
    color: '#fff',
    backgroundColor: 'transparent',
  }
})

const mapStateToProps = (state) => {
  return {
    Data: state.authen
  }
}
export default connect(mapStateToProps, { goHome })(ListHome);
