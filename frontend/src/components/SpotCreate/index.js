// frontend/src/components/SpotCreate/index.js
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SpotCreate.css";
import { createASpot, postAImage } from "../../store/spots";

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
  const [url, setUrl] = useState("No Preview Image");

  const [errors, setErrors] = useState([]);
  const history = useHistory();




  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([])
    const validationErrors = [];
    // const regexForNumberCheck = /\d/;
    // const regexForSymbolCheck = /\W/;

    // allows for whitespace and semi-colon, excludes numbers and symbols
    const numAndSymbolCheck = /\d|(?! )W/;
    // allows for whitespace but not semi-colon, exclues numbers and symbols
    // const regex = /(\d|(?! )\W|\s/;

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

    // validates for numbers, symbols, or whitespace with regex
    if(numAndSymbolCheck.test(payload.city)) validationErrors.push("City should not include numbers or symbols")
    if(numAndSymbolCheck.test(payload.state)) validationErrors.push("State should not include numbers or symbols")
    if(numAndSymbolCheck.test(payload.country)) validationErrors.push("Country should not include numbers or symbols")

    // repetitive validation for the most part due to required trait on input fields
    if(!address) validationErrors.push("Street address is required")
    if(!city) validationErrors.push("City is required")
    if(!state) validationErrors.push("State is required")
    if(!country) validationErrors.push("Country is required")
    if(!lat) validationErrors.push("Latitude is not valid")
    if(!lng) validationErrors.push("Longitude is not valid")
    if(name.length > 50) validationErrors.push("Name must be less than 50 characters")
    if(!name) validationErrors.push("Name is required")
    if(!description) validationErrors.push("Description is required")
    if(!price) validationErrors.push("Price per day is required")
    if(!price) validationErrors.push("Price must be a number")
    setErrors(validationErrors)

    if(validationErrors.length) {
    return
    }

    try {
      spot = await dispatch(createASpot(payload));

      // if spot successfully dispatched, and user entered url allow dispatch for postAImage
      if (spot && url !== "No Preview Image") {
        let imageData = {
          url,
          preview: true,
        };
          dispatch(postAImage(spot, imageData));
      }

      // if spot is successful and no errors, redirect to newly created spot
      if(spot && !errors.length) {
        history.push(`/spots/${spot.id}`);
      }

    } catch (err) {
      setErrors(["Spot already exists with that address, try again"])
    }
  };

  //re-render when inputs are changed to allow removal of validation errors
  useEffect(()=> {
    setErrors([])
  }, [address, city, state, country, lat, lng, name, description, price])

  return (
    <div className="body_container">
      <h1>Create a New Spot</h1>
      <h2>Where's your place located?</h2>
      <h3>Guests will only get your exact address once they have booked a reservation</h3>
      <form className="spot_form" onSubmit={handleSubmit}>
        <ul>
          {errors.length ? <h3>Errors</h3> : ""}
          <div className="errors">
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
            ))}
            {/* <button onClick={handleClick}>Refresh Page</button> */}
            </div>
        </ul>
        <label>
          Country
          <input
            type="text"
            // value={country}
            placeholder="Country is required"
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </label>
        <label>
          Street Address
          <input
            type="text"
            // value={address}
            placeholder="Street address is required"
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </label>
        <label>
          City
          <input
            type="text"
            // value={city}
            placeholder="City is required"
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </label>
        <label>
          State
          <input
            type="text"
            // value={state}
            placeholder="State is required"
            onChange={(e) => setState(e.target.value)}
            required
          />
        </label>
        <label>
          Latitude
          <input
            type="number"
            // value={lat}
            placeholder=""
            onChange={(e) => setLat(e.target.value)}
            required
          />
        </label>
        <label>
          Longitude
          <input
            type="number"
            // value={lng}
            onChange={(e) => setLng(e.target.value)}
            required
          />
        </label>
        <label>
          Description
          <input
            type="textarea"
            // value={description}
            placeholder="Description is required"
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <label>
          Price
          <input
            type="number"
            // value={price}
            placeholder="Price per day is required"
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>
        <label>
          Name
          <input
            type="text"
            // value={name}
            placeholder="Name is required"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          URL
          <input
            type="text"
            // value={url}
            placeholder="No Preview Image"
            onChange={(e) => setUrl(e.target.value)}
            // required
          />
        </label>
        <button type="submit" disabled={errors.length ? true : false}>Create</button>
      </form>
    </div>
  );
}

export default SpotCreate;



//     const handleSubmit = async (e) => {
//   e.preventDefault();
//   const payload = {
//     address,
//     city,
//     state,
//     country,
//     lat,
//     lng,
//     name,
//     description,
//     price,
//   };

//   let imageData = {
//     url,
//     preview: true,
//   };

//   setErrors([]);
//  return dispatch(createASpot(payload))
//   // let spot = dispatch(createASpot(payload))
//     .then((spot) => dispatch(postAImage(spot, imageData))
//     .then(() => history.push(`/spots/${spot.id}`)
//     .catch(async (res) => {
//       const data = await res.json();
//       if (data && data.errors) setErrors(data.errors);
//     })))
//     // })
//   }
