// frontend/src/components/SpotCreate/index.js
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SpotCreate.css";
import { createASpot, getSpots } from "../../store/spots";

function SpotCreate() {
  const dispatch = useDispatch();
  const spotsObj = useSelector((state) => state.spots);
  const spotsArr = Object.values(spotsObj);
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const prevLength = useRef(spotsArr.length);
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
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
    let spot;
    try {
      spot = dispatch(createASpot(payload));
    } catch (err) {
      setErrors([err.statusText]);
    }
  };


  // useRef to store prevLength of state, redirect when state increases in length
  useEffect(() => {
    if (spotsArr.length > prevLength.current) {
      let spotId = spotsArr[spotsArr.length - 1].id
      history.push(`/spots/${spotId}`);
    }
    return () => {};
  }, [spotsObj]);

  return (
    <>
      <h1>Create a New Spot</h1>
      <h1>Create a New Spot</h1>
      <h2>Payload</h2>
      <p>Country: {country}</p>
      <p>Address: {address}</p>
      <p>City: {city}</p>
      <p>State: {state}</p>
      <p>Lat: {lat}</p>
      <p>Lng: {lng}</p>
      <p>Description: {description}</p>
      <p>Price: {price}</p>

      <form className="spot_form" onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Country
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </label>
        <label>
          Street Address
          <input
            type="text"
            // value={username}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </label>
        <label>
          City
          <input
            type="text"
            // value={firstName}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </label>
        <label>
          State
          <input
            type="text"
            // value={lastName}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </label>
        <label>
          Latitude
          <input
            type="number"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            required
          />
        </label>
        <label>
          Longitude
          <input
            type="number"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
            required
          />
        </label>
        <label>
          Description
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <label>
          Price
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>
        <label>
          Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <button type="submit">Create</button>
      </form>
    </>
  );
}

export default SpotCreate;
