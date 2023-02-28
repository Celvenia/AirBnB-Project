import { csrfFetch } from "./csrf";


// constant variables for action creator
const LOAD_SPOTS = "/spots/LOAD_SPOTS";
const LOAD_A_SPOT = "/spots/LOAD_A_SPOT";

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
    // console.log('THIS IS TESTING', spots.Spots)
    // dispatch(loadSpots(spots.Spots));
    dispatch(loadSpots(spots.Spots));
  }
};

export const getASpot = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`);

  if (res.ok) {
    const spot = await res.json();
    // console.log('this is another test', spot)
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
      const newState = { ...state};
      // newState.spots = {}
      // newState.spots[action.spot.id] = action.spot
      // console.log('testing', {...newState.spots, ...action.spot})
      //   return {...newState, ...action.spot}
      // return newState;
      return {...newState, [action.spot.id]: action.spot}
    }
    default:
      return state;
  }
};

export default spotReducer;
// window.dispatch(window.spotsActions(getASpot(1)))
