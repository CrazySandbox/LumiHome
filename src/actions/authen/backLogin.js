import {
  BACK_LOGIN
} from '../types';
import { Actions } from 'react-native-router-flux';

export const backLogin = () => {
  Actions.login({type: 'reset'});
  return {
    type: BACK_LOGIN
  }
}
