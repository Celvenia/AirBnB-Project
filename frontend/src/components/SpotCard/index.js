import "./SpotCard.css";

const SpotCard = ({ spot: { city, state, price, name, previewImage } }) => {

  const address = `${city}, ${state}`
  return (
    <div className="spot_card" title={`${name}`}>
      <div className="spot_card_image">
        <img src={previewImage} alt="home image" />
      </div>
      <div className="spot_card_text">
        {address}
        <br />
        miles away
        <br />${price}
      </div>
    </div>
  );
};

export default SpotCard;
