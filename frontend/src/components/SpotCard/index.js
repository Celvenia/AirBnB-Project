import "./SpotCard.css";

const SpotCard = ({ spot: { city, state, price, name, previewImage, avgStarRating } }) => {

  const address = `${city}, ${state}`
  return (
    <div className="spot_card" title={`${name}`}>

      <div className="spot_card_image">
        <img src={previewImage} alt="home" />
      </div>

      <div className="spot_card_text">
        <div className="address">
        {address}
        <span>
        <i class="fa-sharp fa-solid fa-star"></i>{avgStarRating}
        </span>
        </div>
        <div>
        location: # miles away
        </div>
        $ {price}
      </div>
    </div>
  );
};

export default SpotCard;
