import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getSpots } from "../../store/spots";
import SpotCard from "../SpotCard";

const Spots=()=>{

    const dispatch = useDispatch()
    const spotsArr = useSelector(state => Object.values(state.spots))

    // console.log(spotsArr)

    useEffect(()=>{
        dispatch(getSpots())
    },[dispatch])


    return (
      <div>
       {/* {!spotsArr.length && <span>No listing available right now.</span>} */}
        <div >
          {spotsArr.map((spot) => (
            // <SpotCard  spot={spot.city} key={spot.id} />
            <div className='spot_card' key={spot.id}>
                <div>
                {spot.city}, {spot.state}
                </div>
                <div>
                {spot.lat}, {spot.lng}
                </div>
                <div>
                {spot.price}
                </div>
            </div>
          ))}
          </div>
    //   </div>
    );
  };

  export default Spots
