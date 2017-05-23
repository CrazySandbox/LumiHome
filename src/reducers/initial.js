import {
  SETLANGUAGE,
  SETRING,
  SETNOTIFI,
  SETTHEME,
} from '../actions/types';

INITIAL = {
  language: 'en',
  isRing: false,
  isNotifi: false,
  autoLogin: false,
  theme: 'darktheme',
};

export default (state = INITIAL, action) => {
  switch (action.type) {
    case SETLANGUAGE:
      return {
        ...state,
        language: action.payload,
      }
    case SETRING:
      return {
        ...state,
        isRing: action.payload,
      }
    case SETNOTIFI:
    console.log("notifi = ", action.payload)
      return {
        ...state,
        isNotifi: action.payload,
      }
    case SETTHEME:
      return {
        ...state,
        theme: action.payload,
      }
    default:
      return state;
  }
}
