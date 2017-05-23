import { StyleSheet } from 'react-native';

// Select tabBarStyle: backgroundColor=transparent will render LinearGradient in react-native-tabs

const commonStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarStyle: {
    backgroundColor: 'transparent',
  },
  navBar: {
    backgroundColor: '#000',
  },
  navTitle: {
    color: 'white',
    backgroundColor: 'transparent'
  },
  navRightTextButton: {
    backgroundColor: 'transparent',
    color: 'white',
  }
});

module.exports = commonStyle;
