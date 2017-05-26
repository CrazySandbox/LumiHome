import {
  GETLANGUAGE,
  GETTHEME,
  GETAUTOLOGIN,
  GETLASTHOME,
  GETUSER,
  GETPASS,
  LOADFINISHDATA
} from '../types';
import { AsyncStorage } from 'react-native';
import langs from '../../config/langs';

export const getLangSuccess = data => {
  return {
    type: GETLANGUAGE,
    payload: data,
  }
}

export const getLangFail = () => {
  return {
    type: GETLANGUAGE,
    payload: "en",
  }
}

export const loadLanguageFromStore = () => {
  return (dispatch) => {
    AsyncStorage.getItem("language")
    .then((value) => {
      if(value !== null) {
        dispatch(getLangSuccess(value))
      } else {
        langs.setLanguage("en")
        dispatch(getLangFail())
      }
    })
  }
}

export const getThemeSuccess = data => {
  return {
    type: GETTHEME,
    payload: data,
  }
}

export const getThemeFail = () => {
  return {
    type: GETTHEME,
    payload: "dark-theme",
  }
}

export const loadThemeFromStore = () => {
  return (dispatch) => {
    AsyncStorage.getItem("theme")
    .then((value) => {
      if(value !== null) {
        dispatch(getThemeSuccess(value))
      } else {
        //Set theme default here
        dispatch(getThemeFail())
      }
    })
  }
}

export const getAutoLoginSuccess = data => {
  return {
    type: GETAUTOLOGIN,
    payload: data,
  }
}

export const getAutoLoginFail = () => {
  return {
    type: GETAUTOLOGIN,
    payload: "0",
  }
}

export const loadAutoLoginFromStore = () => {
  return (dispatch) => {
    AsyncStorage.getItem("autoLogin")
    .then((value) => {
      if(value !== null) {
        dispatch(getAutoLoginSuccess(value))
      } else {
        dispatch(getAutoLoginFail())
      }
    })
  }
}

export const getLastHomeSuccess = data => {
  return {
    type: GETLASTHOME,
    payload: data,
  }
}

export const getLastHomeFail = () => {
  return {
    type: GETLASTHOME,
    payload: "0",
  }
}

export const loadLastHomeFromStore = () => {
  return (dispatch) => {
    AsyncStorage.getItem("lasthome")
    .then((value) => {
      if(value !== null) {
        dispatch(getLastHomeSuccess(value))
      } else {
        dispatch(getLastHomeFail())
      }
    })
  }
}

export const getUserSuccess = data => {
  return {
    type: GETUSER,
    payload: data,
  }
}

export const getUserFail = () => {
  return {
    type: GETUSER,
    payload: "",
  }
}

export const loadUserFromStore = () => {
  return (dispatch) => {
    AsyncStorage.getItem("user")
    .then((value) => {
      if(value !== null) {
        dispatch(getUserSuccess(value))
      } else {
        dispatch(getUserFail())
      }
    })
  }
}

export const getPassSuccess = data => {
  return {
    type: GETPASS,
    payload: data,
  }
}

export const getPassFail = () => {
  return {
    type: GETPASS,
    payload: "",
  }
}

export const loadPassFromStore = () => {
  return (dispatch) => {
    AsyncStorage.getItem("pass")
    .then((value) => {
      if(value !== null) {
        dispatch(getPassSuccess(value))
      } else {
        dispatch(getPassFail())
      }
    })
    .then(() => {
      dispatch(loadDataFinish())
    })
  }
}

export const loadDataFinish = () => {
  return {
    type: LOADFINISHDATA
  }
}

export const LoadDataFromStore = () => {
  return (dispatch) => {
    dispatch(loadLanguageFromStore())
    dispatch(loadThemeFromStore())
    dispatch(loadAutoLoginFromStore())
    dispatch(loadLastHomeFromStore())
    dispatch(loadUserFromStore())
    dispatch(loadPassFromStore())
  }
}
