import {
  SEARCH_SPEAKER,
  FINISH_LOAD_SPEAKER,
  SEARCH_SPEAKER_LOADING,
  GET_MASTER_SLAVE,
  DEL_MASTER_SLAVE
} from '../actions/types';

INITIAL = {
  listIP: [],
  loading: false,
  listSlave: {},
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
        loading: false,
        listIP: action.payload,
      }
    case GET_MASTER_SLAVE:
      return {
        ...state,
        listSlave: action.payload,
      }
    case DEL_MASTER_SLAVE:
      return {
        ...state,
        listSlave: {},
      }
    default:
      return state
  }
}
