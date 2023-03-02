import { csrfFetch } from "./csrf";

// constant variables for action creator
const LOAD_SPOTS = "/spots/LOAD_SPOTS";
const LOAD_A_SPOT = "/spots/LOAD_A_SPOT";
const LOAD_MY_SPOTS = "/spots/LOAD_MY_SPOTS";
const POST_IMAGE = "/spots/POST_IMAGE";
const DELETE_SPOT = "/spots/DELETE_SPOT";

// action creators - define actions( objects with type/data )
const loadSpots = (spots) => ({
  type: LOAD_SPOTS,
  spots,
});

const loadASpot = (spot) => ({
  type: LOAD_A_SPOT,
  spot,
});

const loadMySpots = (spots) => ({
  type: LOAD_MY_SPOTS,
  spots,
});

const postImage = (spot, imageData) => ({
  type: POST_IMAGE,
  spot,
  imageData,
});

const deleteSpot = (spotId) => ({
  type: DELETE_SPOT,
  spotId,
});

// thunk action creators - for asynchronous code, i.e fetch calls prior to dispatching action creators
export const getSpots = () => async (dispatch) => {
  const res = await csrfFetch("/api/spots");
  if (res.ok) {
    const spots = await res.json();
    dispatch(loadSpots(spots.Spots));
    return spots;
  }
};

export const getASpot = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`);

  if (res.ok) {
    const spot = await res.json();
    dispatch(loadASpot(spot));
    return spot;
  }
};

export const getMySpots = () => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/current`);

  if (res.ok) {
    const spots = await res.json();
    console.log("testing", spots);
    dispatch(loadMySpots(spots));
    return spots;
  }
};

export const createASpot = (data) => async (dispatch) => {
  try {
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
      return spot;
    }
  } catch (error) {
    if (error.response && error.response.status === 422) {
      const errorMessage = error.response.data.message;
      dispatch(validationError(errorMessage))
    } else {
      throw error;
    }
  }
};

export const postAImage = (spot, payload) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spot.id}/images`, {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (res.ok) {
    const image = await res.json();
    dispatch(postImage(spot, image));
    return image;
  }
};

export const deleteASpot = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    const spot = await res.json();
    dispatch(deleteSpot(spot));
    return spot;
  }
};

// const initialState = {
//   validationError: null,
// };
const initialState = {}

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
    case LOAD_MY_SPOTS: {
      // const newState = { ...state };

      // console.log('further testing', newState)
      // return {...newState, ...action.spots}
      return { ...state, ...action.spots };
    }
    case POST_IMAGE: {
      const newState = { ...state };
      return { ...newState, [action.spot.id]: action.spot };
    }
    case DELETE_SPOT: {
      const newState = { ...state };
      delete newState[action.spotId];
      return newState;
    }
    default:
      return state;
  }
};

export default spotReducer;
// window.dispatch(window.spotsActions(getASpot(1)))
