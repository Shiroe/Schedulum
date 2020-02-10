import {
  FETCH_EVENTS_REQUEST,
  FETCH_EVENTS_SUCCESS,
  FETCH_EVENTS_FAILURE,
  CREATE_EVENT_REQUEST,
  CREATE_EVENT_SUCCESS,
  CREATE_EVENT_FAILURE,
  UPDATE_EVENT_REQUEST,
  UPDATE_EVENT_SUCCESS,
  UPDATE_EVENT_FAILURE
} from "../actions/";

export default (
  state = {
    events: [],
    isFetching: false,
    isCreating: false,
    isUpdating: false,
    fetchError: null,
    createError: null,
    updateError: null
  },
  action
) => {
  switch (action.type) {
    case FETCH_EVENTS_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case FETCH_EVENTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        events: action.events
      };
    case FETCH_EVENTS_FAILURE:
      return {
        ...state,
        isFetching: false,
        fetchError: "Error Fetching Events."
      };
    case CREATE_EVENT_REQUEST:
      return {
        ...state,
        isCreating: true
      };
    case CREATE_EVENT_SUCCESS:
      return {
        ...state,
        isCreating: false,
        event: action.event
      };
    case CREATE_EVENT_FAILURE:
      return {
        ...state,
        isCreating: false,
        updateError: "Error Creating Event."
      };
    case UPDATE_EVENT_REQUEST:
      return {
        ...state,
        isUpdating: true
      };
    case UPDATE_EVENT_SUCCESS:
      return {
        ...state,
        isUpdating: false,
        event: action.event
      };
    case UPDATE_EVENT_FAILURE:
      return {
        ...state,
        isUpdating: false,
        updateError: "Error Updating Event."
      };
    default:
      return state;
  }
};
