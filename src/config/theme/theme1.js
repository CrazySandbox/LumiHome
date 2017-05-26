import {
  StyleSheet,
  Platform,
  Dimensions
} from 'react-native';

const commonStyle = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: (Platform.OS === 'ios') ? 64 : 54,
    alignItems: 'center',
    paddingHorizontal: 13,
    paddingTop: 20,
  },
  leftIconBar: {
    height: 24,
    width: 24,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  imageLeftNav: {
    height: 18,
    width: 18,
    tintColor: 'white',
  },
  navTitle: {
    backgroundColor: 'transparent',
    fontSize: 17,
    fontWeight: '500',
    color: 'white',
    textAlign: 'center',
  },
  navMenu: {
    height: (Platform.OS === 'ios') ? 64 : 54,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(255, 255, 255, 0.5)',
  }
});

export default commonStyle;
