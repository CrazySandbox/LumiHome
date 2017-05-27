import {
  SEARCH_SPEAKER,
  FINISH_LOAD_SPEAKER,
  SEARCH_SPEAKER_LOADING
} from '../actions/types';

INITIAL = {
  listSpeaker: {},
  loading: false,
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
        listSpeaker: action.payload,
        loading: false
      }
    default:
      return state
  }
}
