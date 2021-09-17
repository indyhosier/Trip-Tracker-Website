import './jestConfig/enzyme.config.js';

import React from 'react';
import {shallow} from 'enzyme';
import {beforeEach, describe, expect, it, jest} from "@jest/globals";
import {Button} from 'reactstrap';
import DynamicButtonGroup from '../src/components/Buttons/DynamicButtonGroup';

describe('DynamicButtonGroup', () => {
    let wrapper;
    const onClick1 = jest.fn();
    const onClick2 = jest.fn();
    const onClick3 = jest.fn();
    const size = "sm";
    const buttonPropsArr = [
        {id: "button 1", onClick: onClick1, text: "button 1", color: "success"},
        {id: "button 2", onClick: onClick2, text: "button 2", color: "success"},
        {id: "button 3", onClick: onClick3, text: "button 3", color: "success"},
    ]

    beforeEach(() => {
        jest.clearAllMocks();
        wrapper = shallow(<DynamicButtonGroup buttonPropsArr={buttonPropsArr} size={size} />)
    })

    it('Renders the buttons correctly when given an array of button data', () => {
        expect(wrapper.find(Button)).toHaveLength(3);
    });

    it('Calls the correct onClick when each button is clicked', () => {
        let length = wrapper.find(Button).length;
        for (let i = 0; i < length; i++) {
            wrapper.find(Button).at(i).simulate('click');
        }
        expect(onClick1.mock.calls.length).toBe(1);
        expect(onClick2.mock.calls.length).toBe(1);
        expect(onClick3.mock.calls.length).toBe(1);
    });

    it('Renders buttons with the correct text and size', () => {
        let length = wrapper.find(Button).length;
        for (let i = 0; i < length; i++) {
            let props = wrapper.find(Button).at(i).props();
            expect(props.children).toBe("button " + (i + 1));
            expect(props.id).toBe("button " + (i + 1));
            expect(props.color).toBe("success");
        }
    });
});
