import './jestConfig/enzyme.config.js';
import { shallow, mount} from 'enzyme';
import { Button, DropdownItem, ListGroupItem } from 'reactstrap';
import React from 'react';
import {Places, Place} from '../src/components/Places/Places';
import {PlaceItem} from '../src/components/Places/PlaceItem';
import DynamicButtonDropdown from '../src/components/Buttons/DynamicButtonDropdown.js';

describe('Places', () => {
    let placesWrapper;

    const removeOne = jest.fn();
    const clearAll = jest.fn();
    const goTo = jest.fn();
    const swap = jest.fn();
    global.alert = jest.fn();
    console.log = jest.fn();
    const places = [
        new Place(0, {lat: 40, lng: -105}, 'place1', 'type1', 'address1', 'city1', 'subregion1', 'country1', 'addressLabel1'),
        new Place(1, {lat: 41, lng: -105}, 'place2', 'type2', 'address2', 'city2', 'subregion2', 'country2', 'addressLabel2'),
        new Place(2, {lat: 42, lng: -105}, 'place3', 'type3', 'address3', 'city3', 'subregion3', 'country3', 'addressLabel3')
    ];
    const markerLocation = {lat: 0, long: 0};
    
    beforeEach(() => {
        jest.clearAllMocks();
        placesWrapper = shallow(<Places places={places} listLabel="Trip" clearOrCloseLabel="Close" markerLocation={markerLocation} remove={removeOne} clearOrClose={clearAll} goTo={goTo} swap={swap}/>);
    });

    it('renders with two list item when no places are passed', () => {
        placesWrapper = shallow(<Places places={[]} removePlace={jest.fn()} clearPlaces={jest.fn()}/>);
        expect(placesWrapper.find(Button).length).toEqual(2);
    });

    it('renders correctly with the places it is passed', () => {
        expect(placesWrapper.find(ListGroupItem).length).toEqual(1);
        expect(placesWrapper.find(PlaceItem).length).toEqual(3);
    });

    it('renders all of the buttons', () => {
        const numOfButtonsPerPlaceItem = 3; // this will need to be changed as buttons on place item are changed
        const numOfButtonsAtListTop = 2; // reverse and clear buttons
        placesWrapper = mount(<Places places={places} markerLocation={markerLocation} remove={removeOne} clearPlaces={clearAll} goTo={goTo} swap={swap}/>)
        expect(placesWrapper.find(Button).length).toEqual(places.length * numOfButtonsPerPlaceItem + numOfButtonsAtListTop);
    });

    it("calls the correct function when an entry's buttons are clicked", () => {
        placesWrapper = mount(<Places places={places} markerLocation={markerLocation} remove={removeOne} clearPlaces={clearAll} goTo={goTo} swap={swap}/>)
        let length = placesWrapper.find(DynamicButtonDropdown).length;
        for (let i = 0; i < length; i++) {
            placesWrapper.find(DynamicButtonDropdown).at(i).simulate('click');
            placesWrapper.update();
        }

        length = placesWrapper.find(Button).length;
        for (let i = 0; i < length; i++) {
            placesWrapper.find(Button).at(i).simulate('click');
        }
        expect(removeOne.mock.calls.length).toBe(places.length);
        expect(swap.mock.calls.length).toBe(places.length * 2 - 2);
    });

})