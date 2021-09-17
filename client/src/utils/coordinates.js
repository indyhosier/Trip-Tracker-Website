import Coordinates from "coordinate-parser";

export const getCoordinates = (coordinates) => {
    try {
        let position = new Coordinates(coordinates);
        const latLng = {lat: position.getLatitude(), lng: position.getLongitude()};
        if (!isValidLatLong(latLng)) {
            return null;
        }
        return latLng;
    } catch (error) {
        return null;
    }
}

const isValidLatLong = (latLng) => {
    return (latLng && Math.abs(latLng.lat) <= 90.0 && Math.abs(latLng.lng) <= 180.0);
}
