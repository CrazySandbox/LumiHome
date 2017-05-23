import { AsyncStorage } from 'react-native';
import {
  SETLANGUAGE,
  SETRING,
  SETNOTIFI,
  SETTHEME,
} from './types';
import langs from '../config/langs';

export const loadInitial = () => {
  return {
    type: SETTHEME
  }
}
