import React, {Component} from 'react';
import {Col, Container, Row} from 'reactstrap';


import {Map, Marker, Popup, TileLayer, Polyline} from 'react-leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import 'leaflet/dist/leaflet.css';

import { Places, Place} from '../Places/Places';
import TopBar from './TopBar';

import {getCoordinates} from '../../utils/coordinates';

const MAP_BOUNDS = [[-90, -180], [90, 180]];
const MAP_CENTER_DEFAULT = L.latLng(40.5734, -105.0865);
const MARKER_ICON = L.icon({iconUrl: icon, shadowUrl: iconShadow, iconAnchor: [12, 40]});
const MAP_LAYER_ATTRIBUTION = "&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors";
const MAP_LAYER_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const MAP_MIN_ZOOM = 1;
const MAP_MAX_ZOOM = 19;
const GEOCODE_URL = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&langCode=EN&location=";

export default class Atlas extends Component {

    constructor(props) {
        super(props);
        this.setMarker = this.setMarker.bind(this);
        this.removePlace = this.removePlace.bind(this);
        this.reverse = this.reverse.bind(this);
        this.clearPlaces = this.clearPlaces.bind(this);
        this.getUserLatLon = this.getUserLatLon.bind(this);
        this.setUserLatLon = this.setUserLatLon.bind(this);
        this.reverseGeocoding = this.reverseGeoCoding.bind(this);
        this.moveMapCenterAndMarker = this.moveMapCenterAndMarker.bind(this);
        this.getCurrentLocation = this.getCurrentLocation.bind(this);
        this.setEarthRadius = this.setEarthRadius.bind(this);
        this.setPlaces = this.setPlaces.bind(this);
        this.setUnits = this.setUnits.bind(this);
        this.updatePlaces = this.updatePlaces.bind(this); 
        this.swapPlaces = this.swapPlaces.bind(this);
        this.state = {
            markerPosition: null,
            places: [],
            userLatLon:"",
            mapCenter: MAP_CENTER_DEFAULT,
            address: null,
            earthRadius: 6371,
            units: 'km'
        };
    }

    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <TopBar 
                            getCurrentLocation={this.getCurrentLocation} 
                            latLonProps={this.getLatLonProps()} 
                            clearPlaces={this.clearPlaces}
                            setEarthRadius={this.setEarthRadius}
                            setUnits={this.setUnits}
                            updatePlaces={this.setPlaces}
                            serverSettings={this.props.serverSettings}
                        />
                    </Row>
                    <Row>    
                        <Col sm={12} md={{size: 10, offset: 1}}>
                            {this.renderLeafletMap()}
                        </Col>
                        <Col sm={12} md={{size: 10, offset: 1}}>
                            {this.renderPlaces()}
                        </Col>
                    </Row>
                </Container> 
            </div>
        );
    }
    
    componentDidMount() {
        this.getCurrentLocation(true);
    }    

    renderPlaces() {
        return (
        <Places
            places={this.state.places}
            earthRadius={this.state.earthRadius} 
            listLabel="Trip" 
            clearOrCloseLabel="Clear" 
            markerLocation={this.state.markerPosition} 
            remove={this.removePlace} 
            clearOrClose={this.clearPlaces} 
            goTo={this.moveMapCenterAndMarker}
            units={this.state.units}
            distances={this.state.distances}
            serverSettings={this.props.serverSettings}
            reverse={this.reverse}
            swap={this.swapPlaces}
        />);
    }

    clearPlaces() {
        this.setState({places: [], markerPosition: null});
    }
    reverse(){
        let placeReverse = this.state.places;
        placeReverse = placeReverse.reverse();
        console.log(placeReverse);
        this.setState({places: placeReverse});
    }

    getLatLonProps(){
        return {id: 'latLng', moveMarker: this.moveMapCenterAndMarker, onChange: this.setUserLatLon, onClick: this.getUserLatLon};
    }
    
    renderLeafletMap() {
        return (
            <Map
                className={'mapStyle'}
                boxZoom={false}
                useFlyTo={true}
                zoom={15}
                minZoom={MAP_MIN_ZOOM}
                maxZoom={MAP_MAX_ZOOM}
                maxBounds={MAP_BOUNDS}
                center={this.state.mapCenter}
                onClick={this.setMarker}
            >
                <TileLayer url={MAP_LAYER_URL} attribution={MAP_LAYER_ATTRIBUTION}/>
                {this.getMarker()}
                {this.renderLines()}
            </Map>
        );
    }

    removePlace(place) {
        const index = this.state.places.indexOf(place);
        if (index > -1) {
            let placeArr = this.state.places.slice();
            placeArr.splice(index, 1);
            if (this.state.markerPosition && (place.latLng === this.state.markerPosition)) { 
                this.setState({markerPosition: null})
            } 
            for (let i = index; i < placeArr.length; i++) {
                placeArr[i].id = i;
            }
            // removes the element at index
            this.setState({places: placeArr});
        }
    }

    swapPlaces(index1, index2) {
        console.log(`Swapping ${index1} and ${index2}`)
        // only swap if in bounds
        if (index1 >= 0 && index1 < this.state.places.length &&
            index2 >= 0 && index2 < this.state.places.length) {
                let tempPlaces = this.state.places.slice();
                console.log(tempPlaces);
                let tempPlace = tempPlaces[index1];
                tempPlaces[index1] = tempPlaces[index2];
                tempPlaces[index2] = tempPlace;
                console.log(tempPlaces)
                this.setPlaces(tempPlaces);
            }
       
    }

    async setMarker(mapClickInfo, updateTrip = true) {
        const setMk = async (updateTrip) => {
            await this.reverseGeocoding(mapClickInfo.latlng);
            this.setState({markerPosition: mapClickInfo.latlng});
            if (updateTrip) {
                this.updatePlaces();
            }
        }  
        setMk(updateTrip);
    }

    setMapCenter(latLng) {
        this.setState({mapCenter: latLng});
    }

    getMarker() {
        if (this.state.markerPosition && this.state.address) {
            return (
                <Marker ref={(ref) => this.showMarkerPopup(ref)} position={this.state.markerPosition} icon={MARKER_ICON}>
                    <Popup offset={[0, -18]} className="font-weight-bold">
                        {this.state.address.addressLabel}
                    </Popup>
                </Marker>
            );
        }
    }

    showMarkerPopup(ref) {
        if (ref) {
            ref.leafletElement.openPopup();
        }
    }

    setEarthRadius(radius) {
        this.setState({earthRadius: radius});
    }

    setUnits(units) {
        this.setState({units: units});
    }

    getLatLngText(latLng) {
        return latLng.lat.toFixed(6) + ', ' + latLng.lng.toFixed(6);
    }

    getCurrentLocation(updateTrip = true) {
        if (window.navigator.geolocation) {
            window.navigator.geolocation.getCurrentPosition((position) => {
                this.moveMapCenterAndMarker({lat: position.coords.latitude, lng: position.coords.longitude}, updateTrip);
            }, () => {alert("Error getting current location.\nAre location services enabled?")});
        } else {
            alert("Location services are not enabled or not available for this browser.");
        }
        
    }

    parseCoordinates(coordinates) {
        let position = getCoordinates(coordinates);
        if (!position) {
            window.alert("Invalid coordinates entered");
        }
        return position;
    }
    
    getUserLatLon(){
        const latLng = this.parseCoordinates(this.state.userLatLon);
        if (latLng) {
            this.moveMapCenterAndMarker(latLng, true)
        }
    }
    
    setUserLatLon(latlon){
        this.setState({userLatLon: latlon});
    }

    moveMapCenterAndMarker(latLng, updateTrip) {
        // latLng is an object like {lat: <latitude coordinates>, lng: <longitude coordinates>}
        this.setMarker({latlng: {lat: latLng.lat, lng: latLng.lng}}, updateTrip);
        this.setMapCenter(latLng);
    }
    //Reverse geocoding truns Latitude and Longitude into a friendlier address
    async reverseGeoCoding(coordinates) {
        try {
            const data = await ( await fetch(GEOCODE_URL+`${coordinates.lng},${coordinates.lat}`)).json();
            const addressLabel = data.address.LongLabel || '';
            const type = data.address.Type || '';
            const placeName = data.address.PlaceName || '';
            const address = data.address.Address || '';
            const city = data.address.City || '';
            const region = data.address.Region || '';
            const country = data.address.CountryCode || '';
            this.setState({ address: {addressLabel: addressLabel, type: type, placeName: placeName, city: city, address: address, region: region, country: country}});            
        }
        catch(err) {
            console.log('Reverse geocode error: ' + err);
            this.setState({ address: {addressLabel: 'Unknown', type: 'Unknown', placeName: 'Unknown', city: 'Unknown', address: 'Unknown', region: 'Unknown', country: 'Unknown'}})

        }
      }
    
    setPlaces(newPlaceList) {
        // should only be used to clear and set entire place list
        this.setState({places: newPlaceList})
    }

    updatePlaces() {
        if (this.state.markerPosition && this.state.address) {
            if ((!this.state.places) || 
            (this.state.places[this.state.places.length - 1]?.latLng.lat !== this.state.markerPosition.lat ||
                this.state.places[this.state.places.length - 1]?.latLng.lng !== this.state.markerPosition.lng)) {
                const place = new Place(
                    this.state.places.length,
                    this.state.markerPosition, 
                    this.state.address.placeName, 
                    this.state.address.type, 
                    this.state.address.address, 
                    this.state.address.city,
                    this.state.address.region,
                    this.state.address.country,
                    this.state.address.addressLabel
                );
                let placeArr = this.state.places.concat(place);
                this.setPlaces(placeArr);
            }
        }
    }
    //Gets an array of the current list of places, latitude and longitude only
    getLatLngArray(){
        let result = []
        let placesArr = this.state.places;
        for(let index = 0; index < placesArr.length - 1; index++){
           result.push([placesArr[index].latLng , placesArr[index+1].latLng])
        }
        if (this.state.places.length >= 2){
            result.push([placesArr[placesArr.length-1].latLng , placesArr[0].latLng])
        }
        return result;
    }
    //Renders Lines between adjacent locations
    renderLines(){
        let store = this.getLatLngArray();
        return (
        store.map((pair, index) => <Polyline key = {index} positions = {pair} />)
        )
    }
}
