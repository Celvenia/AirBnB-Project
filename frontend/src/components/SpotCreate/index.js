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
  const [url2, setUrl2] = useState("");
  const [url3, setUrl3] = useState("");
  const [url4, setUrl4] = useState("");
  const [url5, setUrl5] = useState("");
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const validationErrors = [];

    // regex checks
    const numAndSymbolCheck = /\d|(?! )W/;
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
    if (name.length > 50)
      validationErrors.push("Name must be less than 50 characters");
    if (price < 0)
      validationErrors.push("Minimum price must be greater than or equal to 0");
    if (lat < -90 || lat > 90)
      validationErrors.push("Latitude is invalid, must be between -90 and 90");
    if (lng < -180 || lng > 180)
      validationErrors.push(
        "Longitude is invalid, must be between -180 and 180"
      );
    if (description.length < 30)
      validationErrors.push(
        "Description needs to be a minimum of 30 characters"
      );

    setErrors(validationErrors);

    if (validationErrors.length) {
      window.scroll(0, 0);
      return;
    }

    try {
      spot = await dispatch(createASpot(payload));

      // if spot successfully dispatched, and user entered url allow dispatch for postAImage
      if (spot) {
        let imageDataArr = [url, url2, url3, url4, url5];
        imageDataArr.forEach((url) => {
          if (url !== "") {
            let imageData = {
              url,
              preview: true,
            };
            dispatch(postAImage(spot, imageData));
          }
        });
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
    <div className="spot_create_container">
      <h2>Create a New Spot</h2>
      <h3>Where's your place located?</h3>
      <h5>
        Guests will only get your exact address once they have booked a
        reservation
      </h5>
      <form className="spot_create_form" onSubmit={handleSubmit}>
        <div className="red_divider" />
        <ul>
          {errors.length ? <h3>Errors</h3> : ""}
          <div className="errors">
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </div>
        </ul>

        <label>Country</label>
        <input
          className="spot_create_input"
          type="text"
          // value={country}
          placeholder="Country"
          onChange={(e) => setCountry(e.target.value)}
          required
        />

        <label>Street Address</label>
        <input
          className="spot_create_input"
          type="text"
          // value={address}
          placeholder="Address"
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <label>City</label>
        <input
          className="spot_create_input"
          type="text"
          // value={city}
          placeholder="City"
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <label>State</label>
        <input
          className="spot_create_input"
          type="text"
          // value={state}
          placeholder="STATE"
          onChange={(e) => setState(e.target.value)}
          required
        />

        <label>Latitude</label>
        <input
          className="spot_create_input"
          type="number"
          step="0.0000001"
          // value={lat}
          placeholder="Latitude"
          onChange={(e) => setLat(e.target.value)}
          required
        />
        <label>Longitude</label>
        <input
          type="number"
          step="0.0000001"
          // value={lng}
          placeholder="Longitude"
          onChange={(e) => setLng(e.target.value)}
          required
        />

        <div className="red_divider" />

        <h2>Describe your place to guests</h2>
        <h5>
          Mention the best features of your space, any special amenities like
          fast wifi or parking, and what you love about your neighborhood.
        </h5>
        <input
          className="spot_create_input"
          type="textarea"
          // value={description}
          placeholder="Description needs a a minimum of 30 characters"
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <div className="red_divider" />
        <h2>Create a title for you spot</h2>
        <h5>
          Catch guests' attention with a spot title that highlights what makes
          your place special.
        </h5>
        <input
          type="text"
          // value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <div className="red_divider" />
        <h2>Set a base price for your spot</h2>
        <h5>
          Competitive pricing can help your listing stand out and rank higher in
          search results.
        </h5>
        <label>Price $ </label>
        <input
          className="spot_create_input"
          type="number"
          step="0.01"
          // value={price}
          placeholder="Price per night (USD)"
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <div className="red_divider" />
        <h3> Liven up your spot with photos </h3>

        <h5>Submit a link to at least one photo to publish your spot</h5>
        <input
          className="spot_create_input"
          type="url"
          // value={url}
          placeholder="Preview Image URL"
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <input
          className="spot_create_input"
          type="url"
          // value={url}
          placeholder="image URL"
          onChange={(e) => setUrl2(e.target.value)}
        />
        <input
          className="spot_create_input"
          type="url"
          // value={url}
          placeholder="image URL"
          onChange={(e) => setUrl3(e.target.value)}
        />
        <input
          className="spot_create_input"
          type="url"
          // value={url}
          placeholder="image URL"
          onChange={(e) => setUrl4(e.target.value)}
        />
        <input
          className="spot_create_input"
          type="url"
          // value={url}
          placeholder="image URL"
          onChange={(e) => setUrl5(e.target.value)}
        />
        <button
          className="spot_create_button"
          type="submit"
          disabled={errors.length ? true : false}
        >
          Create
        </button>
      </form>
    </div>
  );
}

export default SpotCreate;
