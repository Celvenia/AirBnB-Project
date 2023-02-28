import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSpots } from "../../store/spots";

const SpotDetails = () => {
    const {spotId} = useParams()
    const spot = useSelector(state => state)
    const dispatch = useDispatch()



    useEffect(()=> {
        dispatch(getSpots())
    },[dispatch])
    console.log(spot)

    if(!spot) {
        return <div>Loading...</div>
    }

    return (
        <div>{spot}</div>
     );
}

export default SpotDetails;
