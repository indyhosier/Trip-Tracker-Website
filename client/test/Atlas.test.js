import './jestConfig/enzyme.config.js';
import {shallow, mount} from 'enzyme';

import React from 'react';
import {Marker} from 'react-leaflet';
import {Place} from '../src/components/Places/Places'
import Atlas from '../src/components/Atlas/Atlas';
import TopBar from '../src/components/Atlas/TopBar.js';

describe('Atlas', () => {
    const createSnackBar = jest.fn();
    let atlasWrapper;
    global.navigator.geolocation = {getCurrentPosition: jest.fn(() => {return {lat: 0, lng: 0}})};
    global.window.alert = jest.fn();
    const places = [new Place(0, {lat: 40, lng: -105}), new Place(1, {lat: 41, lng: -105}), new Place(2, {lat: 42, lng: -105})];


    beforeEach(() => {
        atlasWrapper = shallow(<Atlas createSnackBar={createSnackBar}/>);
    });

    afterEach(() => jest.clearAllMocks());
    it('initializes as expected', () => {
        const actualMarkerPosition = atlasWrapper.state().markerPosition;
        const expectedMarkerPosition = null;

        expect(actualMarkerPosition).toEqual(expectedMarkerPosition);
    });

    it('renders a marker on click', async () => {
        global.fetch = jest.fn();
        const actualMarkerPosition = atlasWrapper.state().markerPosition;
        const expectedMarkerPosition = null;
        const map = atlasWrapper.instance();
        await map.setMarker({latlng: {lat: 0, lng: 0}})
        expect(fetch.mock.calls.length).toEqual(1);
    });

    it('calls gets current location on render', () => {
        expect(global.navigator.geolocation.getCurrentPosition.mock.calls.length).toEqual(1);
    })

    function simulateOnClickEvent(wrapper, event) {
        wrapper.find('Map').at(0).simulate('click', event);
        wrapper.update();
    }

    it('clears all entries', () => {
        atlasWrapper.setState({places: places});
        atlasWrapper.instance().clearPlaces();
        expect(atlasWrapper.instance().state.places.length).toBe(0);
    })

    it('clears single entries', () => {
        atlasWrapper.setState({places: places});
        atlasWrapper.instance().removePlace(places[1]);
        expect(atlasWrapper.instance().state.places.length).toBe(2);
        expect(atlasWrapper.instance().state.places).toEqual([places[0], places[2]]);
    })
    
    it ('renders the TopBar component', ()=> {
        expect(atlasWrapper.find(TopBar).length).toEqual(1);
    })

    

    it('accepts only valid coordinates', () => {
        const valid = [
            '11.1515,-124.15155',
            '-14.5552 , 55.25252',
            '14.151515, 51.151515',
            '17, 111',
            '11.1001, 1.0',
            '1.0, 11.1114',
            '90.0000, 180.0000',   // max lat and long
            '-90, -180'  // min lat and long
            ]
        const invalid = [
            '15,15151, 51,15151',
            '1O.11525,55.767676', // O (the letter) instead of 0
            '114.14114, 11.414', // too many leading digits in lat
            '90.0001, 180.000', // cases for breaking min and max
            '90.00, -180.001'
        ]

        for (let latLong in valid) {
            expect(atlasWrapper.instance().parseCoordinates(valid[latLong])).toBeDefined();
        }

        for (let latLong in invalid) {
            expect(atlasWrapper.instance().parseCoordinates(invalid[latLong])).toBeNull();
        }
    })

    it('updates places', () => {
        const map = atlasWrapper.instance();
        atlasWrapper.state().markerPosition = {lat: 0, lng: 0};
        atlasWrapper.state().address = "hello";
        map.updatePlaces();
        expect(atlasWrapper.state().places.length).toEqual(1);
    })

    it('checks reverseGeocoding', async function () {
        global.fetch = jest.fn(() => Promise.resolve({
        json: () => Promise.resolve({
            "address": {
             "Match_addr": "Ramskeller",
             "LongLabel": "Ramskeller, 8035 Campus Delivery, Fort Collins, CO, 80523, USA",
             "ShortLabel": "Ramskeller",
             "Addr_type": "POI",
             "Type": "Brewpub",
             "PlaceName": "Ramskeller",
             "AddNum": "8035",
             "Address": "8035 Campus Delivery",
             "Block": "",
             "Sector": "",
             "Neighborhood": "",
             "District": "",
             "City": "Fort Collins",
             "MetroArea": "",
             "Subregion": "Larimer County",
             "Region": "Colorado",
             "Territory": "",
             "Postal": "80523",
             "PostalExt": "",
             "CountryCode": "USA"
            },
            "location": {
             "x": -105.08652399999994,
             "y": 40.573427000000038,
             "spatialReference": {
              "wkid": 4326,
              "latestWkid": 4326
             }
            }
           }),
        }));
        let testInfo = {
            lat: 40.5734,
            lng: -105.0865,
        };
        let instance = atlasWrapper.instance();
        await instance.reverseGeoCoding(testInfo);
        expect(atlasWrapper.state('address').city).toEqual('Fort Collins');
        expect(atlasWrapper.state('address').country).toEqual('USA');
        expect(atlasWrapper.state('address').region).toEqual('Colorado');
        expect(atlasWrapper.state('address').address).toEqual('8035 Campus Delivery');
        expect(atlasWrapper.state('address').placeName).toEqual('Ramskeller');
        expect(atlasWrapper.state('address').addressLabel).toEqual("Ramskeller, 8035 Campus Delivery, Fort Collins, CO, 80523, USA");

    })
});