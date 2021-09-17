import "./jestConfig/enzyme.config.js";
import { mount } from "enzyme";
import React from "react";
import { Button, Modal } from "reactstrap";
import SaveTripModal from "../src/components/Modals/SaveTripModal.js";

describe("SaveTripModal", () => {
  const saveFile = jest.fn();
  let wrapper;
  beforeEach(() => {
    jest.clearAllMocks();
    wrapper = mount(<SaveTripModal saveAsFile={saveFile} />);
  });

  it("Renders correctly", () => {
    expect(wrapper.find(Button).length).toEqual(1);
    expect(wrapper.find(Modal).length).toEqual(1);
    expect(wrapper.find(Modal).prop("isOpen")).toBe(false);
  });

  it('Likes being clicked', () => {
      wrapper.find(Button).simulate("click");
      wrapper.update();
      expect(wrapper.find(Modal).prop("isOpen")).toBe(true);
      wrapper.find(Button).at(1).simulate("click");
      wrapper.find(Button).at(2).simulate("click");
      wrapper.find(Button).at(3).simulate("click"); // click the submit/save button
      expect(saveFile.mock.calls.length).toEqual(1);
  });
});
