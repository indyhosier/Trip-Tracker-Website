import './jestConfig/enzyme.config.js'
import React from 'react' 
import { shallow, mount } from 'enzyme'
import LatLon from '../src/components/Atlas/LatLon';
import {InputGroup, Input, Modal, Button} from 'reactstrap';
import { expect, jest } from '@jest/globals';

describe('LatLon', () =>{
    const onChange = jest.fn();


    it ('renders the LatLon Search bar', ()=> {
        const wrapper = shallow(<LatLon />);
        expect(wrapper.find(InputGroup).length).toEqual(1);
    })



    it("Find modal opens correctly", () => {
        const wrapper = mount(<LatLon onChange={onChange}/>);
        wrapper.find(Input).simulate('change', {target: {value: 'Vail'}});
        wrapper.find(Button).at(1).simulate('click')
        expect(wrapper.find(Modal).prop("isOpen")).toBe(true);
        expect(onChange.mock.calls.length).toEqual(1);
      });



});