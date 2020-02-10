import { myFirebase, db } from "../firebase/firebase";

export const FETCH_EVENTS_REQUEST = "FETCH_EVENTS_REQUEST";
export const FETCH_EVENTS_SUCCESS = "FETCH_EVENTS_SUCCESS";
export const FETCH_EVENTS_FAILURE = "FETCH_EVENTS_FAILURE";

export const CREATE_EVENT_REQUEST = "CREATE_EVENT_REQUEST";
export const CREATE_EVENT_SUCCESS = "CREATE_EVENT_SUCCESS";
export const CREATE_EVENT_FAILURE = "CREATE_EVENT_FAILURE";

export const UPDATE_EVENT_REQUEST = "UPDATE_EVENT_REQUEST";
export const UPDATE_EVENT_SUCCESS = "UPDATE_EVENT_SUCCESS";
export const UPDATE_EVENT_FAILURE = "UPDATE_EVENT_FAILURE";

const requestEvents = () => {
  return {
    type: FETCH_EVENTS_REQUEST
  };
};

const receiveEvents = events => {
  return {
    type: FETCH_EVENTS_SUCCESS,
    events
  };
};

const eventsError = () => {
  return {
    type: FETCH_EVENTS_FAILURE
  };
};

const requestEventCreation = () => {
  return {
    type: CREATE_EVENT_REQUEST
  };
};

const receiveEventCreation = events => {
  return {
    type: CREATE_EVENT_SUCCESS,
    events
  };
};

const errorEventCreation = () => {
  return {
    type: CREATE_EVENT_FAILURE
  };
};

const requestEventUpdate = () => {
  return {
    type: UPDATE_EVENT_REQUEST
  };
};

const receiveEventUpdate = events => {
  return {
    type: UPDATE_EVENT_SUCCESS,
    events
  };
};

const errorEventUpdate = () => {
  return {
    type: UPDATE_EVENT_FAILURE
  };
};

export const fetchEvents = ({ uid, startDate, endDate }) => dispatch => {
  dispatch(requestEvents());

  db.collection("events")
    .where("creatorId", "==", uid)
    .orderBy("date")
    .startAt(new Date(startDate))
    .endAt(new Date(endDate))
    .get()
    .then(snap =>
      dispatch(receiveEvents(snap ? snap.docs.map(d => d.data()) : []))
    )
    .catch(error => dispatch(eventsError()));
};

export const createEvent = params => dispatch => {
  dispatch(requestEventCreation());

  db.collection("events")
    .add({ ...params })
    .then(docRef => dispatch(receiveEventCreation(params))) //optimistic update
    .catch(error => dispatch(errorEventCreation()));
};

export const updateEvent = params => dispatch => {
  dispatch(requestEventUpdate());
  // const { title, description, place, creatorId, date, attendees } = params;

  // db.collection("events")
  // .where("creatorId", "==", uid)
  // .orderBy("date")
  // .startAt(new Date(startDate))
  // .endAt(new Date(endDate))
  // .get()
  // .then(snap => {
  // dispatch(receiveEventUpdate(params));
  // })
  // .catch(error => {
  // dispatch(errorEventUpdate());
  // });
};
