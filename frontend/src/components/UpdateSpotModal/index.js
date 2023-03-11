// frontend/src/components/UpdateSpotModal/index.js
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getASpot, getSpots, updateASpot } from "../../store/spots";
import { useModal } from "../../context/Modal";
import "./UpdateSpotModal.css";
import { useHistory } from "react-router-dom";

function UpdateSpotModal({ spot }) {
  const sessionUser = useSelector((state) => state.session.user);
  const currentSpot = useSelector((state) => state.spots[spot.id]);
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const history = useHistory();
  const contentRef = useRef();

  const [country, setCountry] = useState(spot.country);
  const [address, setAddress] = useState(spot.address);
  const [city, setCity] = useState(spot.city);
  const [state, setState] = useState(spot.state);
  const [lat, setLat] = useState(spot.lat);
  const [lng, setLng] = useState(spot.lng);
  const [description, setDescription] = useState(spot.description);
  const [name, setName] = useState(spot.name);
  const [price, setPrice] = useState(spot.price);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const validationErrors = [];

    // allows for whitespace and semi-colon, excludes numbers and symbols
    const numAndSymbolCheck = /[\p{P}\d]+/u;

    const payload = {
      ...spot,
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    };

    // validates for numbers, symbols, or whitespace with regex
    if (numAndSymbolCheck.test(city))
      validationErrors.push("City should not include numbers or symbols");
    if (numAndSymbolCheck.test(state))
      validationErrors.push("State should not include numbers or symbols");
    if (numAndSymbolCheck.test(country))
      validationErrors.push("Country should not include numbers or symbols");

    // repetitive validation for the most part due to required trait on input fields
    if (!address) validationErrors.push("Street address is required");
    if (!city) validationErrors.push("City is required");
    if (!state) validationErrors.push("State is required");
    if (!country) validationErrors.push("Country is required");
    if (!lat) validationErrors.push("Latitude is not valid");
    if (!lng) validationErrors.push("Longitude is not valid");
    if (name.length > 50)
      validationErrors.push("Name must be less than 50 characters");
    if (!name) validationErrors.push("Name is required");
    if (!description) validationErrors.push("Description is required");
    if (!price) validationErrors.push("Price per day is required");
    if (!price) validationErrors.push("Price must be a number");
    setErrors(validationErrors);

    if (validationErrors.length) {
      contentRef.current.scrollTop = 0;
      return;
    }
    let data;
    try {
      data = await dispatch(updateASpot(payload, spot))
       history.push(`/spots/${spot.id}`)
    } catch (err) {
      setErrors(["Spot already exists with that address, try again"]);
    }
    closeModal();
  };

  //re-render when inputs are changed to allow removal of validation errors
  useEffect(() => {
    setErrors([]);
    getSpots();
    return () => {};
  }, [
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
    sessionUser,
    dispatch,
  ]);

  useEffect(() => {
    if (!sessionUser) {
      setErrors(["Please log in to create a spot"]);
    }

    return () => {};
  }, [sessionUser]);

  return (
    currentSpot && (
      <div className="update_spot_modal_container" ref={contentRef}>
        <form className="update_spot_form" onSubmit={handleSubmit}>
          <ul>
            {errors.length ? <h3>Errors</h3> : ""}
            <div className="errors">
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </div>
          </ul>
          <h1 className="update_spot_h1">Update your Spot</h1>
          <label className="update_spot_label">
            Country
            <input
              className="update_spot_input"
              type="text"
              value={country}
              placeholder={spot.country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </label>
          <label className="update_spot_label">
            Street Address
            <input
              className="update_spot_input"
              type="text"
              value={address}
              placeholder="Street address is required"
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </label>
          <label className="update_spot_label">
            City
            <input
              className="update_spot_input"
              type="text"
              value={city}
              placeholder="City is required"
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </label>
          <label className="update_spot_label">
            State
            <input
              className="update_spot_input"
              type="text"
              value={state}
              placeholder="State is required"
              onChange={(e) => setState(e.target.value)}
              required
            />
          </label>
          <label className="update_spot_label">
            Latitude
            <input
              className="update_spot_input"
              type="number"
              value={lat}
              placeholder="Optional"
              onChange={(e) => setLat(e.target.value)}
              required
            />
          </label>
          <label className="update_spot_label">
            Longitude
            <input
              className="update_spot_input"
              type="number"
              value={lng}
              placeholder="Optional"
              onChange={(e) => setLng(e.target.value)}
              required
            />
          </label>
          <label className="update_spot_label">
            Description
            <input
              className="update_spot_description"
              type="textarea"
              value={description}
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>
          <label className="update_spot_label">
            Price
            <input
              className="update_spot_input"
              type="number"
              value={price}
              placeholder="Price per day is required"
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </label>
          <label className="update_spot_label">
            Name
            <input
              className="update_spot_input"
              type="text"
              value={name}
              placeholder="Name is required"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <button
            className="update_spot_button"
            type="submit"
            disabled={errors.length ? true : false}
          >
            Update
          </button>
        </form>
      </div>
    )
  );
}

export default UpdateSpotModal;
