import React, { useState } from "react";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

const DynamicButtonDropdown = ({
  dropdownLabel,
  dropdownToggleSize,
  dropdownToggleColor,
  buttonPropsArr
}) => {
  const [dropdownOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!dropdownOpen);
  const buttons = buttonPropsArr.map(data => {
    return (
      <DropdownItem key={data.id} id={data.id} onClick={data.onClick}>
        {data.text}
      </DropdownItem>
    );
  });
  return (
    <ButtonDropdown
      isOpen={dropdownOpen}
      toggle={toggle}
      size={dropdownToggleSize}
    >
      <DropdownToggle caret color={dropdownToggleColor}>
        {dropdownLabel}
      </DropdownToggle>
      <DropdownMenu>
        {buttons}
      </DropdownMenu>
    </ButtonDropdown>
  );
};

export default DynamicButtonDropdown;
