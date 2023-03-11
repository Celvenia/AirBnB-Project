// frontend/src/components/DeleteSpotModal/index.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteASpot, getASpot, getMySpots } from "../../store/spots";
import { getSpotReviews } from "../../store/reviews";
import { useModal } from "../../context/Modal";
import "./DeleteSpotModal.css";

function DeleteSpotModal({ spotId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (window.location.pathname === "/spots/current") {
      setErrors([]);
      return dispatch(deleteASpot(spotId))
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    if (window.location.pathname !== "/spots/current") {
      setErrors([]);
      return dispatch(deleteASpot(spotId))
        .then(closeModal)
        .then(history.push("/"))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
  };

  return (
    <div className="delete_container">
      <h1>Confirm Delete</h1>

      <h3>Are you sure you want to remove this spot?</h3>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <div>
          <button
            className="delete_spot_delete_button"
            onClick={handleSubmit}
            type="submit"
          >
            Yes(Delete Spot)
          </button>
        </div>
        <div>
          <button className="delete_spot_keep_button" onClick={closeModal}>
            No(Keep Spot)
          </button>
        </div>
      </form>
    </div>
  );
}

export default DeleteSpotModal;
