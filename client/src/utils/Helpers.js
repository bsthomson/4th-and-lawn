import Geocode from "react-geocode";
import API from "./API"

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);

export const getGeocode = (address) => {
    return Geocode.fromAddress(address)
        .then(response => {
            const { lat, lng } = response.results[0].geometry.location;
            return { lat: lat, lng: lng };
        })
        .catch(error => console.log(error))
}

export const getWalkingDistance = (origin, destination) => {
    return API.getDistance(origin, destination)
        .then((response) => {
            console.log({
                walkingDistance: response.data
            });

            return response.data;
        })
}