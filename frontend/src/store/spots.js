import { csrfFetch } from "./csrf";

// constant variables for action creator
const LOAD_SPOTS = "/spots/LOAD_SPOTS";
const LOAD_A_SPOT = "/spots/LOAD_A_SPOT";
const LOAD_MY_SPOTS = "/spots/LOAD_MY_SPOTS";
const POST_IMAGE = "/spots/POST_IMAGE";
const UPDATE_SPOT = "/spots/UPDATE_SPOT";
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

const updateSpot = (spot) => ({
  type: UPDATE_SPOT,
  spot
})

// thunk action creators - for asynchronous code, i.e fetch calls prior to dispatching action creators
export const getSpots = () => async (dispatch) => {
  try {
    const res = await csrfFetch("/api/spots");
    if (res.ok) {
      const spots = await res.json();
      dispatch(loadSpots(spots.Spots));
      return spots;
  }
  } catch (err) {
    return err
  }
};

export const getASpot = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`);

  if (res.ok) {
    const spot = await res.json();
    dispatch(loadASpot(spot));
    return spot;
  } else return res.json()
};

export const getMySpots = () => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/current`);

  if (res.ok) {
    const spots = await res.json();
    dispatch(loadMySpots(spots));
    return spots;
  } else return res.json()
};

export const createASpot = (data) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/spots`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      const spot = await res.json();
      dispatch(loadASpot(spot));
      return spot;
    } else return res.json()
  } catch (error) {
      throw error;
  }
};

export const postAImage = (spot, payload) => async (dispatch) => {
  console.log('spot', spot, 'payload', payload)
  const res = await csrfFetch(`/api/spots/${spot.id}/images`, {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (res.ok) {
    const image = await res.json();
    dispatch(postImage(spot, image));
    return image;
  } else return res.json()
};

export const deleteASpot = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    const spot = await res.json();
    dispatch(deleteSpot(spot));
    return spot;
  } else return res.json()
};

export const updateASpot = (payload, spot) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spot.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if(res.ok) {
    const data = await res.json();

    spot.address = data.address
    spot.city = data.city
    spot.country = data.country
    spot.lng = data.lng
    spot.lat = data.lat
    spot.name = data.name
    spot.description = data.description
    spot.price = data.price
    spot.updatedAt = data.updatedAt
    // spot.previewImage = data.previewImage
    // console.log(data)
    // console.log(spot)
    // console.log('this is the spot', spot)
     dispatch(updateSpot(spot))
     return data
  } else return res.json()
}

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
    case LOAD_MY_SPOTS: {
      const newState = { ...state };
      // console.log(action.spots)
      return {...newState, ...action.spots}
    }
    case POST_IMAGE: {
      const newState = { ...state };
      return { ...newState, [action.spot.id]: action.spot };
    }
    case DELETE_SPOT: {
      const newState = { ...state };
      delete newState[action.spotId.id];
      return newState;
    }
    case UPDATE_SPOT: {
      const newState = { ...state}
        return {...newState, [action.spot.id]: action.spot}
    }
    default: {
      return state;
    }
  }
};

export default spotReducer;
// window.dispatch(window.spotsActions(getASpot(1)))
