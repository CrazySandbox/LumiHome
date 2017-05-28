import {
  SEARCH_SPEAKER,
  FINISH_LOAD_SPEAKER,
  SEARCH_SPEAKER_LOADING,
  FINSH_GET_SPEAKER,
  GESTDATASUCCESS,
  FINISH_LOAD_INFO_SPEAKER
} from '../actions/types';

INITIAL = {
  listSpeaker: {},
  loading: false,
  ip: [],
}

export default (state = INITIAL, action) => {
  switch (action.type) {
    case SEARCH_SPEAKER:
      return {
        ...state,
        loading: false
      }
    case SEARCH_SPEAKER_LOADING:
      return {
        ...state,
        loading: true
      }
    case FINISH_LOAD_SPEAKER:
      return {
        ...state,
        listSpeaker: action.payload,
        loading: false,
      }
    case FINSH_GET_SPEAKER:
      return {
        ...state,
        ip: action.payload
      }
    default:
      return state
  }
}
