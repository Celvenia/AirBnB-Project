import { csrfFetch } from "./csrf";

// constant variables for action creator
const POST_REVIEW = "/reviews/POST_REVIEW";
const LOAD_MY_REVIEWS = "/reviews/LOAD_MY_REVIEWS";
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

const loadMyReviews = () => ({
  type: LOAD_MY_REVIEWS,
});

const deleteReview = (reviewId) => ({
  type: DELETE_REVIEW,
  reviewId,
});

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
    return err;
  }

};

export const getSpotReviews = (spotId) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`);

    if (res.ok) {
      const reviews = await res.json();
      dispatch(loadSpotReviews(reviews));
      return reviews;
    }
  } catch (err) {
    return err.message
  }

};

export const postAReview = (reviewData, spotId) => async (dispatch) => {
  console.log(reviewData, spotId)
  try {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
      method: "POST",
      body: JSON.stringify(reviewData),
    });

    if (res.ok) {
      const review = await res.json();
      console.log('review!!!!!!!!!!!!!!!!', review)
      dispatch(postReview(review));
      return review;
    }
  } catch (err) {
    return err;
  }

};

export const deleteAReview = (reviewId) => async (dispatch) => {

    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
      method: "DELETE",
    });
      const response = await res.json();
      dispatch(deleteReview(response));
      return response;
};

const initialState = {};

// reducer
const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_REVIEW: {
      const newState = { ...state };
      newState[action.reviewData.id] = action.reviewData
      return { ...newState };
    }
    case LOAD_MY_REVIEWS: {
      const newState = { ...state };
      return { ...newState, ...action.spotId };
    }
    case LOAD_SPOT_REVIEWS: {
      const newState = { ...state };

      action.spotId.Reviews.forEach(review => {
        newState[review.id] = review
      })

      return { ...newState };
    }
    case DELETE_REVIEW: {
      const newState = { ...state };
      delete newState[action.reviewId.id];
      return newState
    }
    default:
      return state;
  }
};

export default reviewReducer;

// window.dispatch(window.spotsActions(getASpot(1)))
