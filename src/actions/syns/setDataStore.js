import { AsyncStorage } from 'react-native';

export const setItemToStore = (item, value) => {
  try {
    AsyncStorage.setItem(item, value)
  } catch(error) {
    console.log('Error setData ',error)
  }
}

export const setLanguage = (value) => {
  setItemToStore('language', value);
}

export const setTheme = (value) => {
  setItemToStore('theme', value);
}

export const setAutoLogin = (value) => {
  setItemToStore('autoLogin', value);
}

export const setLastHome = (value) => {
  setItemToStore('lasthome', value);
}

export const setUser = (value) => {
  setItemToStore('user', value);
}

export const setPass = (value) => {
  setItemToStore('pass', value);
}

export const restFactory = () => {
  setLanguage('en');
  setTheme('dark-theme');
  setAutoLogin('0');
  setLastHome('0');
  setUser('');
  setPass('');
}
