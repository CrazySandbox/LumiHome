// Actions syns data reducer and store
import {
  SYNSDATA
} from '../types';

export const SysnData = (data) => {
  return {
    type: SYNSDATA,
    payload: data
  }
}
