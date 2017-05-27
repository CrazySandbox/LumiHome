// This is func with gradientColor theme
// Color default ['#136a8a', '#136a8a', '#267871']

import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import imgs from './theme';

const Body1 = ({children}) => {
  return (
    <LinearGradient
      style={styles.container}
      start={{x: 0.0, y: 0.0}} end={{x: 0.0, y: 1.0}}
      locations={[0,0.3,1]}
      colors={['#136a8a', '#136a8a', '#267871']}>
      {children}
    </LinearGradient>
  );
}

const Body = ({children}) => {
  return (
    <Image
      style={styles.containerImage}
      source={imgs.backGround.background}
    >
      <View style={styles.body}>
        {children}
      </View>
    </Image>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerImage: {
    flex: 1,
    width: undefined,
    height: undefined,
    backgroundColor:'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    backgroundColor: 'transparent',
    flex: 1
  }
});

export default Body;
