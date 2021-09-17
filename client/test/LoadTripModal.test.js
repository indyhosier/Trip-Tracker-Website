import "./jestConfig/enzyme.config.js";
import { mount } from "enzyme";
import React from "react";
import { Button, Modal, Input } from "reactstrap";
import LoadTripModal from "../src/components/Modals/LoadTripModal.js";
import { expect } from "@jest/globals";

describe("LoadTripModal", () => {
  const loadFile = jest.fn();
  FileReader.prototype.readAsText = jest.fn();
  global.alert = jest.fn();
  let wrapper;
  beforeEach(() => {
    jest.clearAllMocks();
    wrapper = mount(<LoadTripModal loadFile={loadFile} />);
  });

  it("Renders correctly", () => {
    expect(wrapper.find(Button).length).toEqual(1);
    expect(wrapper.find(Modal).length).toEqual(1);
    expect(wrapper.find(Modal).prop("isOpen")).toBe(false);
  });

  it("Opens correctly", () => {
    wrapper.find(Button).simulate("click");
    expect(wrapper.find(Modal).prop("isOpen")).toBe(true);
    expect(wrapper.find(Input).length).toEqual(1);
  });

  it("Reads a file on submit", () => {
    wrapper.find(Button).simulate('click');
    wrapper.find(Input).simulate('change', {target: {files: ['file.json']}});
    wrapper.find(Button).at(1).simulate('click');
    expect(FileReader.prototype.readAsText.mock.calls.length).toEqual(1);
  })


});
