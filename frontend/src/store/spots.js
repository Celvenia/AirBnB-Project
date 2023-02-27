import { csrfFetch } from "./csrf";


// constant variables for action creator
const LOAD_SPOTS = '/spots/LOAD_SPOTS'
const ADD_SPOT = '/spots/ADD_SPOT'


// action creators - define actions( objects with type/data )
const loadSpots = (spots) => ({
    type: LOAD_SPOTS,
    spots
})

// thunk action creators - for asynchronous code, i.e fetch calls prior to dispatching action creators
export const getSpots = () => async (dispatch) => {
    const res = await csrfFetch('/api/spots');
    if(res.ok) {
        const spots = await res.json();
        dispatch(loadSpots(spots))
    }
}

const initialState = {}

// reducer
const spotReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_SPOTS:
            const newState = {...state}
            action.spots.Spots.forEach(spot => {
                newState[spot.id] = spot
            })
            return newState;
        default:
        return state;
    }
}

export default spotReducer;
