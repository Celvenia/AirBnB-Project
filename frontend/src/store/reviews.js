import { csrfFetch } from "./csrf";

// constant variables for action creator
const POST_REVIEW = "/reviews/POST_REVIEWS";
const LOAD_MY_REVIEWS = "/reviews/LOAD_MY_REVIEWS"
const LOAD_SPOT_REVIEWS = "/reviews/LOAD_REVIEWS"

// action creators - define actions( objects with type/data )
const postReview = (spotId) => ({
  type: POST_REVIEW,
  spotId,
});

const loadSpotReviews = (spotId) => ({
  type: LOAD_SPOT_REVIEWS,
  spotId,
});

const loadMyReviews = () => ({
  type: LOAD_MY_REVIEWS,
});

// const postImage = (spot, imageData) => ({
//   type: POST_IMAGE,
//   spot,
//   imageData,
// });

// const deleteSpot = (spotId) => ({
//   type: DELETE_SPOT,
//   spotId,
// });

// const updateSpot = (spot) => ({
//   type: UPDATE_SPOT,
//   spot
// })

// thunk action creators - for asynchronous code, i.e fetch calls prior to dispatching action creators
export const getMyReviews = () => async (dispatch) => {
    try {

        const res = await csrfFetch("/api/reviews/current");
        if (res.ok) {
            const reviews = await res.json();
            dispatch(loadMyReviews(reviews));
            return reviews;
        }
    } catch (err) {
        return console.log(err)
    }
};

// export const getASpot = (spotId) => async (dispatch) => {
//   const res = await csrfFetch(`/api/spots/${spotId}`);

//   if (res.ok) {
//     const spot = await res.json();
//     dispatch(loadASpot(spot));
//     return spot;
//   } else return res.json()
// };

export const getSpotReviews = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`);

  if (res.ok) {
    const reviews = await res.json();
    console.log(reviews)
    dispatch(loadSpotReviews(reviews));
    return reviews;
  } else return res.json()
};

// export const createASpot = (data) => async (dispatch) => {
//   try {
//     const res = await csrfFetch(`/api/spots`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });

//     if (res.ok) {
//       const spot = await res.json();
//       dispatch(loadASpot(spot));
//       return spot;
//     } else return res.json()
//   } catch (error) {
//       throw error;
//   }
// };

export const postAReview = (spotId, reviewData) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
      method: "POST",
      body: JSON.stringify(reviewData),
    });

    if (res.ok) {
      const review = await res.json();
      dispatch(postReview(review));
      console.log('thunk review', review)
      return review;
    }
  } catch (err) {
    return console.log(err)
  }
};

// export const deleteASpot = (spotId) => async (dispatch) => {
//   const res = await csrfFetch(`/api/spots/${spotId}`, {
//     method: "DELETE",
//   });

//   if (res.ok) {
//     const spot = await res.json();
//     dispatch(deleteSpot(spot));
//     return spot;
//   } else return res.json()
// };

// export const updateASpot = (spot) => async (dispatch) => {
//   const res = await csrfFetch(`/api/spots/${spot.id}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(spot),
//   });
//   if(res.ok) {
//     const spot = await res.json();
//      dispatch(updateSpot(spot))
//     //  console.log(spot)
//      return spot
//     // .then(dispatch(loadMySpots()))
//   } else return res.json()
// }

const initialState = {};

// reducer
const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_REVIEW: {
      const newState = { ...state };
      newState.reviews[action.spotId].push(action.review)
      return {...newState }
    }
    case LOAD_MY_REVIEWS: {
        const newState = { ...state }
        return {...newState, ...action.spotId}
    }
    case LOAD_SPOT_REVIEWS: {
        const newState = { ...state }
        newState[action.spotId.Reviews[0].spotId] = action.spotId.Reviews
        return { ...newState }
    }
    default:
      return state;
  }
};
// const spotReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case LOAD_SPOTS: {
//       const newState = { ...state };
//       action.spots.forEach((spot) => {
//         // if(spot.id !== undefined) {
//           newState[spot.id] = spot;
//         // }
//       });
//       return newState;
//     }
//     case LOAD_A_SPOT: {
//       const newState = { ...state };
//       return { ...newState, [action.spot.id]: action.spot };
//     }
//     case LOAD_MY_SPOTS: {
//       const newState = { ...state };
//       // console.log(action.spots)
//       return {...newState, ...action.spots}
//     }
//     case POST_IMAGE: {
//       const newState = { ...state };
//       return { ...newState, [action.spot.id]: action.spot };
//     }
//     case DELETE_SPOT: {
//       const newState = { ...state };
//       delete newState[action.spotId];
//       return newState;
//     }
//     case UPDATE_SPOT: {
//       const newState = { ...state}
//       // newState[action.spot.id] = action.spot
//       // console.log('testing this', Object.values(newState))
//         return {...newState, [action.spot.id]: action.spot}
//     }
//     default: {
//       return state;
//     }
//   }
// };

export default reviewReducer;

// window.dispatch(window.spotsActions(getASpot(1)))
