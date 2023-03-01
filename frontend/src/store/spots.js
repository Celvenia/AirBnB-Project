import { csrfFetch } from "./csrf";


// constant variables for action creator
const LOAD_SPOTS = "/spots/LOAD_SPOTS";
const LOAD_A_SPOT = "/spots/LOAD_A_SPOT";
const CREATE_SPOT = "/spots/CREATE_SPOT";

// action creators - define actions( objects with type/data )
const loadSpots = (spots) => ({
  type: LOAD_SPOTS,
  spots,
});

const loadASpot = (spot) => ({
  type: LOAD_A_SPOT,
  spot,
});

// thunk action creators - for asynchronous code, i.e fetch calls prior to dispatching action creators
export const getSpots = () => async (dispatch) => {
  const res = await csrfFetch("/api/spots");
  if (res.ok) {
    const spots = await res.json();
    dispatch(loadSpots(spots.Spots));
  }
};

export const getASpot = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`);

  if (res.ok) {
    const spot = await res.json();
    dispatch(loadASpot(spot));
  }
};

export const createASpot = (data) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const spot = await response.json();

    dispatch(loadASpot(spot));
  }
};


const initialState = {};

// reducer
const spotReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SPOTS: {
      const newState = { ...state };
      action.spots.forEach((spot) => {
        newState[spot.id] = spot;
      });
      return newState;
    }
    case LOAD_A_SPOT: {
      const newState = { ...state };
      return { ...newState, [action.spot.id]: action.spot };
    }
    // case CREATE_SPOT: {
    //   // if (!state.spots[action.spot.id]) {
    //   //   const newState = {
    //   //     ...state,
    //   //     [action.spot.id]: action.spot,
    //   //   };
    //   //   return newState;
    //   // }
    //   const newState = { ...state, spots: [...state.spots, action.spot] };
    //   return newState;
    // }
    default:
      return state;
  }
};

export default spotReducer;
// window.dispatch(window.spotsActions(getASpot(1)))
