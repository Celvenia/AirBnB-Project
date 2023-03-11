import { useSelector } from "react-redux";
import "./SpotCard.css";

const SpotCard = ({
  spot: { id, city, state, price, name, previewImage, avgStarRating }
}) => {
const spot = useSelector((state) => state?.spots[id])

  if(avgStarRating === undefined) {
    return <div>Loading...</div>
  }
  const address = `${city}, ${state}`;
  return (
    <div className="spot_card" title={`${name}`}>
      <div className="spot_card_image">
        <img src={previewImage} alt="home" />
      </div>

      <div className="spot_card_text">
        <div className="first_line">
          {address}
          <span>
            <i className="fa-sharp fa-solid fa-star"></i>
            {/* toFixed converts num to string with 2 decimals, parseFloat converts it to a number removing trailing zeros */}
            {avgStarRating !== 0 ? (avgStarRating % 1 === 0 ? avgStarRating.toFixed(1) : parseFloat(avgStarRating.toFixed(2))) : "New"}
          </span>
        </div>
        <div>location: # miles away</div>$ {price} night
      </div>
    </div>
  );
};

export default SpotCard;
