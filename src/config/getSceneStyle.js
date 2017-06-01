import { Platform } from 'react-native';

const getSceneStyle = (props, computedProps) => {
const style = {
  flex: 1,
  backgroundColor: '#000',
  shadowColor: null,
  shadowOffset: null,
  shadowOpacity: null,
  shadowRadius: null,
};
if (computedProps.isActive && Platform.OS == 'ios') {
  style.marginTop = computedProps.hideNavBar ? 0 : 64;
  style.marginBottom = computedProps.hideTabBar ? 0 : 54
}
if (computedProps.isActive && Platform.OS == 'android') {
  style.marginTop = computedProps.hideNavBar ? 0 : 54;
  style.marginBottom = computedProps.hideTabBar ? 0 : 54
}
return style;
};

module.exports = getSceneStyle;
