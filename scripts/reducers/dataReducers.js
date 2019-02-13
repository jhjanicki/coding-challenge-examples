import {
  FETCH_DATA_BEGIN,
  FETCH_DATA_SUCCESS
} from '../actions/dataActions';

const initialState = {
  data:[],
  fetchInProgress: true
};

export default function DataReducer(state = initialState, action) {
  switch(action.type) {
    case FETCH_DATA_BEGIN:
    console.log("FETCH_DATA_BEGIN")
      return {
        ...state,
        fetchInProgress: action.fetchInProgress
      };

    case FETCH_DATA_SUCCESS:
    console.log("FETCH_DATA_SUCCESS")
      return {
        ...state,
        data: action.data
      };

    default:
    console.log("DEFAULT")
      return state;
  }
}
