// frontend/src/components/DeleteSpotModal/index.js
import React, { useEffect, useState } from "react";
// import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import "./DeleteSpotModal.css";
import { deleteASpot, getASpot, getMySpots } from "../../store/spots";
import { useHistory } from "react-router-dom";
import { getSpotReviews } from "../../store/reviews";

function DeleteSpotModal({spotId}) {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state?.reviews?.[spotId])
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(window.location.pathname === '/spots/current') {
      setErrors([]);
      return dispatch(deleteASpot(spotId))
      .then(await dispatch(getSpotReviews(spotId)))
      .then(await dispatch(getMySpots()))
      .then(await dispatch(getASpot(spotId)))
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    if(window.location.pathname !== '/spots/current') {
      setErrors([]);
      return dispatch(deleteASpot(spotId))
        .then(closeModal)
        .then(history.push('/'))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });

    }
  };

useEffect(()=> {
  dispatch(getSpotReviews(spotId))
return ()=> {}
},[dispatch])

  return (
    <div className="delete_container">
      <h1>Confirm Delete</h1>

      <h3>Are you sure you want to remove this spot from the listings?</h3>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <div>
        <button className="delete_spot_modal_button" type="submit">Yes(Delete Spot)</button>
        </div>
        <div>
        <button className="delete_spot_modal_button" onClick={closeModal}>No(Keep Spot)</button>
        </div>
      </form>
    </div>
  );
}

export default DeleteSpotModal;
