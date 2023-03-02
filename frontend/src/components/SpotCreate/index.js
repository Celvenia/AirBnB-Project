// frontend/src/components/SpotCreate/index.js
// react imports
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { createASpot, postAImage } from "../../store/spots";
import "./SpotCreate.css";
// import * as sessionActions from "../../store/session";

function SpotCreate() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

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
  const [url2, setUrl2] = useState("No Preview Image");
  const [url3, setUrl3] = useState("No Preview Image");
  const [url4, setUrl4] = useState("No Preview Image");
  const [url5, setUrl5] = useState("No Preview Image");
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const validationErrors = [];
    // const regexForNumberCheck = /\d/;
    // const regexForSymbolCheck = /\W/;

    // allows for whitespace and semi-colon, excludes numbers and symbols
    const numAndSymbolCheck = /\d|(?! )W/;
    // allows for whitespace but not semi-colon, exclues numbers and symbols
    // const regex = /(\d|(?! )\W|\s/;

    // checks 
    const imageCheck = /\.(png|jpe?g)$/i;

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

    let imageData = {
      url,
      preview: true,
    };

    let spot;

    // validates for numbers, symbols, or whitespace with regex
    if (numAndSymbolCheck.test(payload.city))
      validationErrors.push("City should not include numbers or symbols");
    if (numAndSymbolCheck.test(payload.state))
      validationErrors.push("State should not include numbers or symbols");
    if (numAndSymbolCheck.test(payload.country))
      validationErrors.push("Country should not include numbers or symbols");
    if (!imageCheck.test(url))
      validationErrors.push("Image URL must end in .png .jpg or .jpeg");
    // repetitive validation for the most part due to required trait on input fields
    if (name.length > 50)
      validationErrors.push("Name must be less than 50 characters");
    // if(!address) validationErrors.push("Street address is required")
    // if(!city) validationErrors.push("City is required")
    // if(!state) validationErrors.push("State is required")
    // if(!country) validationErrors.push("Country is required")
    // if(!lat) validationErrors.push("Latitude is not valid")
    // if(!lng) validationErrors.push("Longitude is not valid")
    // if(!name) validationErrors.push("Name is required")
    // if(!description) validationErrors.push("Description is required")
    // if(!price) validationErrors.push("Price per day is required")
    // if(!price) validationErrors.push("Price must be a number")
    setErrors(validationErrors);

    if (validationErrors.length) {
      return;
    }

    try {
      spot = await dispatch(createASpot(payload));

      // if spot successfully dispatched, and user entered url allow dispatch for postAImage
      if (spot && url !== "No Preview Image") {
        dispatch(postAImage(spot, imageData));
      }

      // if spot is successful and no errors, redirect to newly created spot
      if (spot && !errors.length) {
        history.push(`/spots/${spot.id}`);
      }
    } catch (err) {
      setErrors(["Spot already exists with that address, try again"]);
    }
  };

  //re-render when inputs are changed to allow removal of validation errors
  useEffect(() => {
    setErrors([]);
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
  ]);

  useEffect(() => {
    if (!sessionUser) {
      setErrors(["Please log in to create a spot"]);
      return () => {};
    }
    return () => {};
  }, [sessionUser]);

  return (
    <main>
    <div className="body_container">
      <div>
        <h2>Create a New Spot</h2>
        <h3>Where's your place located?</h3>
        <h5>
          Guests will only get your exact address once they have booked a
          reservation
        </h5>
      </div>
      <form className="spot_form" onSubmit={handleSubmit}>
        <ul>
          {errors.length ? <h3>Errors</h3> : ""}
          <div className="errors">
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </div>
        </ul>
        <div>
          <label>Country</label>
          <input
            type="text"
            // value={country}
            placeholder="Country"
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Street Address</label>
          <input
            type="text"
            // value={address}
            placeholder="Address"
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <label>City</label>
          <input
            type="text"
            // value={city}
            placeholder="City"
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div>
          <label>State</label>
          <input
            type="text"
            // value={state}
            placeholder="STATE"
            onChange={(e) => setState(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Latitude</label>
          <input
            type="number"
            // value={lat}
            placeholder="Latitude"
            onChange={(e) => setLat(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Longitude</label>
          <input
            type="number"
            // value={lng}
            placeholder="Longitude"
            onChange={(e) => setLng(e.target.value)}
            required
          />
        </div>
          <h2>Describe your place to guests</h2>
          <h5>
            Mention the best features of your space, any special amenities like
            fast wifi or parking, and what you love about your neighborhood.
          </h5>
          <div>
            <label>Description</label>
            <input
              type="textarea"
              // value={description}
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
        <label>
          Price
          </label>
          <input
            type="number"
            // value={price}
            placeholder="Price per day is required"
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        <label>
          Name
          </label>
          <input
            type="text"
            // value={name}
            placeholder="Name is required"
            onChange={(e) => setName(e.target.value)}
            required
          />
          <h3> Liven up your spot with photos </h3>

        <label>
          Submit a link to at least one photo to publish your spot
          </label>
          <input
            type="url"
            // value={url}
            placeholder="Preview Image URL"
            onChange={(e) => setUrl(e.target.value)}
            required
            />
          <input
            type="url"
            // value={url}
            placeholder="image URL"
            onChange={(e) => setUrl2(e.target.value)}
          />
          <input
            type="url"
            // value={url}
            placeholder="image URL"
            onChange={(e) => setUrl3(e.target.value)}
          />
          <input
            type="url"
            // value={url}
            placeholder="image URL"
            onChange={(e) => setUrl4(e.target.value)}
          />
          <input
            type="url"
            // value={url}
            placeholder="image URL"
            onChange={(e) => setUrl5(e.target.value)}
          />
        <button type="submit" disabled={errors.length ? true : false}>
          Create
        </button>
      </form>
    </div>
    </main>
  );
}

export default SpotCreate;
