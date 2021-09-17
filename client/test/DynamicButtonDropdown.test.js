import "./jestConfig/enzyme.config.js";

import React from "react";
import { shallow } from "enzyme";
import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { DropdownItem, DropdownMenu } from "reactstrap";
import DynamicButtonDropdown from "../src/components/Buttons/DynamicButtonDropdown.js";

describe("DynamicButtonDropdown", () => {
  let wrapper;
  const onClick1 = jest.fn();
  const onClick2 = jest.fn();
  const onClick3 = jest.fn();
  const size = "sm";
  const buttonDataArr = [
    { id: "button 1", onClick: onClick1, text: "button 1", color: "success" },
    { id: "button 2", onClick: onClick2, text: "button 2", color: "success" },
    { id: "button 3", onClick: onClick3, text: "button 3", color: "success" }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    wrapper = shallow(
      <DynamicButtonDropdown
        buttonPropsArr={buttonDataArr}
        dropdownLabel="buttons"
        dropdownToggleColor="primary"
        dropdownToggleSize="sm"
      />
    );
  });

  it("Renders the the toggle and the correct number of buttons", () => {
    expect(wrapper.find(DropdownItem)).toHaveLength(3);
    expect(wrapper.find(DropdownMenu)).toHaveLength(1);
  });

  it("Allows all buttons to be clicked and calls the correct function", () => {
    let length = wrapper.find(DropdownItem).length;
    for (let i = 0; i < length; i++) {
      wrapper.find(DropdownItem).at(i).simulate("click");
    }
    expect(onClick1.mock.calls.length).toBe(1);
    expect(onClick2.mock.calls.length).toBe(1);
    expect(onClick3.mock.calls.length).toBe(1);
  });
});
