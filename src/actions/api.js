import { db } from "../firebase/firebase";

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

const receiveEventCreation = event => {
  return {
    type: CREATE_EVENT_SUCCESS,
    event
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

const receiveEventUpdate = event => {
  return {
    type: UPDATE_EVENT_SUCCESS,
    event
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
    .then(docRef => {
      dispatch(receiveEventCreation(docRef));
      console.log("Created! :", docRef);
    }) //optimistic update
    .catch(() => dispatch(errorEventCreation()));
};

export const updateEvent = ({ id, ...rest }) => dispatch => {
  dispatch(requestEventUpdate());

  db.collection("events")
    .doc(id)
    .set({ id, ...rest })
    .then(docRef => {
      dispatch(receiveEventUpdate(docRef));
      console.log("Updated! :", docRef);
    }) //optimistic update
    .catch(() => dispatch(errorEventUpdate()));
};
