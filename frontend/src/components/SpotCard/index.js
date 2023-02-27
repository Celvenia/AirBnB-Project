const SpotCard = ({id, city, state, lat, lng, price}) => {
    console.log(id, city, state, lat, lng, price)
    return (
        <div className="spot_card" key={id}>
        <img src='https://wallpapercave.com/wp/wp7113919.jpg' />
      <div className="spot_card_text">
        {city}, {state}
        <br />
        {/* {lat}, {lng} */}
        miles away
        <br />
        ${price}
        Something
      </div>
    </div>
     );
}

export default SpotCard;
