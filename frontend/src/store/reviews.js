import { csrfFetch } from "./csrf";

// constant variables for action creator
const POST_REVIEW = "/reviews/POST_REVIEW";
const LOAD_SPOT_REVIEWS = "/reviews/LOAD_SPOT_REVIEWS";
const DELETE_REVIEW = "/reviews/DELETE_REVIEW";

// action creators - define actions( objects with type/data )
const postReview = (reviewData, spotId) => ({
  type: POST_REVIEW,
  reviewData,
  spotId,
});

const loadSpotReviews = (spotId) => ({
  type: LOAD_SPOT_REVIEWS,
  spotId,
});

const deleteReview = (reviewId) => ({
  type: DELETE_REVIEW,
  reviewId,
});

// thunk action creators - for asynchronous code, i.e fetch calls prior to dispatching action creators

export const getSpotReviews = (spotId) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`);

    if (res.ok) {
      const reviews = await res.json();
      dispatch(loadSpotReviews(reviews));
      return reviews;
    }
  } catch (err) {
    return err.message;
  }
};

export const postAReview = (reviewData, spotId) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
      method: "POST",
      body: JSON.stringify(reviewData),
    });

    if (res.ok) {
      const review = await res.json();
      dispatch(postReview(review));
      return res
    }
  } catch (err) {
    return err;
  }
};

export const deleteAReview = (reviewId) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
      method: "DELETE",
    });
    if(res.ok) {
      const data = await res.json();
      dispatch(deleteReview(data));
      return res
    }
    if(!res.ok) {
      throw new Error("Failed to Delete")
    }
  } catch (err) {
    return err;
  }
};

const initialState = {};

// reducer
const reviewReducer = (state = initialState, action) => {

  switch (action.type) {
    case LOAD_SPOT_REVIEWS: {
      const newState = { ...state };
      action.spotId.Reviews.forEach((review) => {
        newState[review.id] = review;
      });
      return { ...newState };
    }

    case POST_REVIEW: {
      const newState = { ...state };
      newState[action.reviewData.id] = action.reviewData;
      return { ...newState };
    }

    case DELETE_REVIEW: {
      const newState = { ...state };
      delete newState[action.reviewId.id];
      return newState;
    }

    default:
      return state;
  }
};

export default reviewReducer;

// window.dispatch(window.spotsActions(getASpot(1)))
