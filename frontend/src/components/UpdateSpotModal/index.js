// frontend/src/components/UpdateSpotModal/index.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./UpdateSpotModal.css";
// import { useHistory } from "react-router-dom";
import { getMySpots, postAImage, updateASpot } from "../../store/spots";
import { useModal } from "../../context/Modal";


function UpdateSpotModal({ spot }) {
  const sessionUser = useSelector((state) => state.session.user);
  const formData = useSelector(state => state.spots)
  const dispatch = useDispatch();
    const { closeModal } = useModal();

  const [country, setCountry] = useState(spot.country);
  const [address, setAddress] = useState(spot.address);
  const [city, setCity] = useState(spot.city);
  const [state, setState] = useState(spot.state);
  const [lat, setLat] = useState(spot.lat);
  const [lng, setLng] = useState(spot.lng);
  const [description, setDescription] = useState(spot.description);
  const [name, setName] = useState(spot.name);
  const [price, setPrice] = useState(spot.price);
  const [url, setUrl] = useState(spot.previewImage);
  const [errors, setErrors] = useState([]);
//   const history = useHistory();

  //   console.log(spot.address)

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     setErrors([]);
  //     return dispatch(updateASpot(spot))
  //       .then(closeModal)
  //       .catch(async (res) => {
  //         const data = await res.json();
  //         if (data && data.errors) setErrors(data.errors);
  //       });
  //   };

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

    const payload = { ...spot,
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

    // let spot;

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
      return;
    }
    let data;
    try {
      data = await dispatch(updateASpot(payload));
      // if spot successfully dispatched, and user entered url allow dispatch for postAImage
    //   console.log("what is this", spot);
      if (url !== "No Preview Image") {
        let imageData = {
          url,
          preview: true,
        };
        // console.log(data)
        dispatch(postAImage(data, imageData));
      }
      if (data) {
        dispatch(getMySpots())
      }

      //   // if spot is successful and no errors, redirect to current page
      //   if (spot && !errors.length) {
      //     history.push(`/spots/current`);
      //   }
    } catch (err) {
      setErrors(["Spot already exists with that address, try again"]);
    }
    closeModal()
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
    url,
    dispatch
  ]);

  useEffect(() => {
    if (!sessionUser) {
      setErrors(["Please log in to create a spot"]);
      return () => {};
    }
    return () => {};
  }, [sessionUser]);

//   document.addEventListener("submit", closeModal);

  return (
    <div className="body_container">
      <h1>Update Spot</h1>

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
            value={country}
            placeholder={spot.country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </label>
        <label>
          Street Address
          <input
            type="text"
            value={address}
            placeholder="Street address is required"
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </label>
        <label>
          City
          <input
            type="text"
            value={city}
            placeholder="City is required"
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </label>
        <label>
          State
          <input
            type="text"
            value={state}
            placeholder="State is required"
            onChange={(e) => setState(e.target.value)}
            required
          />
        </label>
        <label>
          Latitude
          <input
            type="number"
            value={lat}
            placeholder="Optional"
            onChange={(e) => setLat(e.target.value)}
            required
          />
        </label>
        <label>
          Longitude
          <input
            type="number"
            value={lng}
            placeholder="Optional"
            onChange={(e) => setLng(e.target.value)}
            required
          />
        </label>
        <label>
          Description
          <input
            type="textarea"
            value={description}
            placeholder="Description is required"
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <label>
          Price
          <input
            type="number"
            value={price}
            placeholder="Price per day is required"
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>
        <label>
          Name
          <input
            type="text"
            value={name}
            placeholder="Name is required"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          URL
          <input
            type="text"
            value={url}
            placeholder="No Preview Image"
            onChange={(e) => setUrl(e.target.value)}
            // required
          />
        </label>
        <button type="submit" disabled={errors.length ? true : false}>
          Update
        </button>
      </form>
    </div>
  );
}

//   return (
//     <>
//       <h1>Update</h1>
//       <form onSubmit={handleSubmit}>
//         <ul>
//           {errors.map((error, idx) => (
//             <li key={idx}>{error}</li>
//           ))}
//         </ul>
//         <label>
//           Country
//           <input
//             type="text"
//             value={country}
//             onChange={(e) => setCountry(e.target.value)}
//             required
//           />
//         </label>
//         <label>
//           Password
//           <input
//             type="text"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </label>
//         <button type="submit">Update</button>
//       </form>
//     </>
//   );
// }

export default UpdateSpotModal;