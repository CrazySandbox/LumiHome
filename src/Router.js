import React, { Component } from 'react';
import { StyleSheet, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { Router, Scene, Modal } from 'react-native-router-flux';

// import components
import TabIcon from './components/TabIcon';
import langs from './config/langs';
import NavigationDrawer from './components/NavigationDrawer';
import commonStyle from './config/commonStyle';
import getSceneStyle from './config/getSceneStyle';
import imgs from './config/theme';

// import screen
import Home from './screens/home/Home';
import Event from './screens/home/Event';
import Room from './screens/room/Room';
import Scenes from './screens/scene/Scene';
import Camera from './screens/camera/Camera';
import Security from './screens/security/Security';
import Rule from './screens/rule/Rule';
import Speaker from './screens/speaker/Speaker';
import Login from './screens/login/Login';
import Register from './screens/login/Register';
import SettingLocal from './screens/login/settingLocal';
import ForgotPassword from './screens/login/forgotPass';
import ListHome from './screens/listhome/ListHome';
import SlideMenuHome from './screens/listhome/SlideMenuHome';
import Intro1 from './screens/intro/intro1';
import Intro2 from './screens/intro/intro2';
import Intro3 from './screens/intro/intro3';

import RenameSpeaker from './screens/speaker/rename';
import SpeakerInfo from './screens/speaker/infoSpeaker';
import PlaySpeaker from './screens/speaker/playSpeaker';
import SlideMenuSpeaker from './screens/speaker/SlideMenuSpeaker';
import ListMusicUSB from './screens/speaker/ListMusic';

//import LoginForm from './screens/login/LoginForm';

const RouterWithRedux = connect()(Router);

class RouterComponent extends Component {
  render() {
    const DATA = this.props;
    const { initInstall } = this.props
    return (
      <RouterWithRedux
        getSceneStyle={getSceneStyle}
        gradientEnable
        gradientColor={['#000', '#00000F', '#000']}
      >
        <Scene key="modal" component={Modal} >
          <Scene key="root" hideNavBar hideTabBar >
            <Scene key="login"
              component={Login}
              initial
              Data={DATA}
            />
            <Scene key="intro1"
              component={Intro1}
            />
            <Scene key="intro2"
              component={Intro2}
            />
            <Scene key="intro3"
              component={Intro3}
            />
            <Scene
              key="register"
              component={Register}
              title={langs.registerNav}
              hideNavBar={false}
              navigationBarStyle={commonStyle.navBar}
              titleStyle={commonStyle.navTitle}
              backButtonImage={imgs.iconSetting.backWhite}
            />
            <Scene
              key="settinglocal"
              component={SettingLocal}
              title={langs.setLocalNav}
              hideNavBar={false}
              navigationBarStyle={commonStyle.navBar}
              titleStyle={commonStyle.navTitle}
              backButtonImage={imgs.iconSetting.backWhite}
            />
            <Scene
              key="forgotpass"
              component={ForgotPassword}
              title={langs.forgotpassNav}
              hideNavBar={false}
              navigationBarStyle={commonStyle.navBar}
              titleStyle={commonStyle.navTitle}
              backButtonImage={imgs.iconSetting.backWhite}
            />
            <Scene
              key="menuhome"
              component={SlideMenuHome}
            />
            <Scene
              key="listhome"
              component={ListHome}
              title={langs.listhome}
              hideNavBar={false}
              navigationBarStyle={commonStyle.navBar}
              titleStyle={commonStyle.navTitle}
            />

            <Scene key="tabbar"  component={NavigationDrawer}>
              <Scene
                key="main"
                tabs
                tabBarStyle={commonStyle.tabBarStyle}
              >
                <Scene
                  key="tab1"
                  title={langs.home}
                  icon={TabIcon}
                  iconActive={imgs.iconTabBar.home.active}
                  iconInActive={imgs.iconTabBar.home.inactive}
                  titleStyle={commonStyle.navTitle}
                >
                  <Scene
                    key="home"
                    component={Home}
                    title={langs.home}
                    rightButtonTextStyle={commonStyle.navRightTextButton}
                  />
                  <Scene
                    key="event"
                    component={Event}
                    title="Event"
                    rightButtonTextStyle={commonStyle.navRightTextButton}
                  />
                </Scene>
                <Scene
                  key="tab2"
                  title={langs.room}
                  icon={TabIcon}
                  iconActive={imgs.iconTabBar.room.active}
                  iconInActive={imgs.iconTabBar.room.inactive}
                  titleStyle={commonStyle.navTitle}
                >
                  <Scene
                    key="room"
                    component={Room}
                    title={langs.room}
                  />
                </Scene>
                <Scene
                  key="tab3"
                  title={langs.scene}
                  icon={TabIcon}
                  iconActive={imgs.iconTabBar.scenes.active}
                  iconInActive={imgs.iconTabBar.scenes.inactive}
                  titleStyle={commonStyle.navTitle}
                >
                  <Scene
                    key="scenes"
                    component={Scenes}
                    title={langs.scene}
                  />
                </Scene>
                <Scene
                  key="tab4"
                  title={langs.camera}
                  icon={TabIcon}
                  iconActive={imgs.iconTabBar.camera.active}
                  iconInActive={imgs.iconTabBar.camera.inactive}
                  titleStyle={commonStyle.navTitle}
                >
                  <Scene
                    key="camera"
                    component={Camera}
                    title={langs.camera}
                  />
                </Scene>
                <Scene
                  key="tab5"
                  title={langs.security}
                  icon={TabIcon}
                  iconActive={imgs.iconTabBar.security.active}
                  iconInActive={imgs.iconTabBar.security.inactive}
                  titleStyle={commonStyle.navTitle}
                >
                  <Scene
                    key="security"
                    component={Security}
                    title={langs.security}
                  />
                </Scene>
                <Scene
                  key="tab6"
                  title={langs.rule}
                  icon={TabIcon}
                  iconActive={imgs.iconTabBar.rule.active}
                  iconInActive={imgs.iconTabBar.rule.inactive}
                  titleStyle={commonStyle.navTitle}
                >
                  <Scene
                    key="rule"
                    component={Rule}
                    title={langs.rule}
                  />
                </Scene>
                <Scene
                  key="tab7"
                  title={langs.speaker}
                  icon={TabIcon}
                  iconActive={imgs.iconTabBar.speaker.active}
                  iconInActive={imgs.iconTabBar.speaker.inactive}
                  titleStyle={commonStyle.navTitle}
                >
                  <Scene initial
                    key="speaker"
                    component={Speaker}
                    title={langs.speaker}
                    rightButtonTextStyle={commonStyle.navRightTextButton}
                  />
                  <Scene
                    key="renameSpeaker"
                    component={RenameSpeaker}
                    hideTabBar
                    title={langs.renameSpeaker}
                    rightButtonTextStyle={commonStyle.navRightTextButton}
                  />
                  <Scene
                    key="listMusicUSB"
                    component={ListMusicUSB}
                    hideTabBar
                    title={langs.listMusic}
                    rightButtonTextStyle={commonStyle.navRightTextButton}
                  />
                  <Scene
                    key="infoSpeaker"
                    component={SpeakerInfo}
                    hideTabBar
                    title={langs.infoSpeaker}
                  />
                  <Scene
                    key="playSpeaker"
                    component={PlaySpeaker}
                    hideNavBar
                  />
                  <Scene
                    key="slideMenuSpeaker"
                    component={SlideMenuSpeaker}
                    hideNavBar
                  />
                </Scene>
              </Scene>
            </Scene>
          </Scene>
        </Scene>
      </RouterWithRedux>
    );
  }
}

export default RouterComponent;
