import "./jestConfig/enzyme.config.js";
import { shallow, mount } from "enzyme";
import React from "react";
import { Button, DropdownItem } from "reactstrap";
import TopBar from "../src/components/Atlas/TopBar";

describe("TopBar", () => {
  let wrapper;
  global.window.alert = jest.fn();
  const find = jest.fn();
  const moveMapCenterAndMarker = jest.fn();
  const setUserLatLon = jest.fn();
  const getUserLatLon = jest.fn();
  const numOfDefinedButtons = 4; // findme load findcoords findplace

  const latLonProps = {
    id: "latLng",
    moveMarker: moveMapCenterAndMarker,
    onChange: setUserLatLon,
    onClick: getUserLatLon
  };

  beforeEach(() => {
    jest.clearAllMocks();
    wrapper = shallow(
        <TopBar getCurrentLocation={find} latLonProps={latLonProps} />
    );
  });

  it("Renders the TopBar with all of the required buttons", () => {
    wrapper = mount(
      <TopBar getCurrentLocation={find} latLonProps={latLonProps} />
    );
    expect(wrapper.find(Button).length).toEqual(numOfDefinedButtons);
  });

  it("Likes being clicked", () => {
    wrapper = mount(
      <TopBar getCurrentLocation={find} latLonProps={latLonProps} />
    );

    let length = wrapper.find(Button).length;
    for (let i = 0; i < length; i++) {
      wrapper.find(Button).at(i).simulate("click");
      wrapper.update();
    }
    length = wrapper.find(DropdownItem).length;
    for (let i = 0; i < length; i++) {
      wrapper.find(DropdownItem).at(i).simulate("click");
    }
    expect(find.mock.calls.length).toBe(1);
    expect(getUserLatLon.mock.calls.length).toBe(1);
  });
});
