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
import Button from '../../components/base/button';
import SocketClient from '../../config/socket/socket-client';
import CommonData from '../../config/socket/CommonData';

var { height, width } = Dimensions.get('window');

const PLACE = 'home/Home.js'

class Home extends Component {
  constructor(props)
  {
    super(props)
    this.state = {
      refreshing:false,
      loading:true,
      count: 0,
      isRunning: false,
      floors:[
      ],
      refreshCount:0,
      idTimer:null
    }
    // CommonData.getInstance().setDomain(this.props.data.domain);
    // CommonData.getInstance().setMacAdress(this.props.data.mac);
    // CommonData.getInstance().clearRoom();
  }

  _onRefresh() {

    // SocketClient.getInstance().sendCommandStringInPlace(PLACE, "$mfloor=lst", {domain:''}, (data)=>{
    //     if(data.err != null)
    //     {
    //       this.setState({
    //         refreshing: false,
    //         loading  : false,
    //         floors : []
    //       });
    //       return;
    //     }
    //     var refreshCount = this.state.refreshCount + 1;
    //
    //     data.lst.sort(function(a, b){return parseInt(a.floorid) - parseInt(b.floorid)})
    //     this.setState({
    //       refreshing: false,
    //       loading  : false,
    //       floors : data.lst,
    //       refreshCount:refreshCount
    //     });
    // });
  }

  componentDidMount()
  {
    // if(this.state.loading)
    //   this._onRefresh();
  }

  onReconnect(data)
  {
    if(this.devices != null)
      SocketClient.getInstance().sendCommandStringInPlace(PLACE, '$mdev=reg', {dev:this.devices});
  }

  _onPress() {
    SocketClient.getInstance().sendCommandStringInPlace(this.PLACE, '$log=get', {domain:!this.props.data.domain ? '' : this.props.data.domain, type:'0', startime:String(startime.getTime()), space:String(space)}, (json)=>{
      console.log('get', json)
    })
  }

  render() {
    console.log(this.state.floors)
    return (
      <Body>
        <View style={styles.container}>
          <View>
            <TextInput />
            <Button
              style={{backgroundColor: '#19c1ff'}}
              title="Button"
              onPress={() => this._onPress()}
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
  return { data: state.authen.listhome[0] }
}

export default connect(mapStateToProps, { LoginAction })(Home);
