import './jestConfig/enzyme.config.js'
import React from 'react' 
import { shallow } from 'enzyme'
import CardMember from '../src/components/TeamMember/CardMember';


describe('<CardMember />', () => {
    it ('Renders a CardMember component', () => {
        let wrapper = shallow(<CardMember name="Hello" image="" bio="Bio"/>);
        expect(wrapper.children().length).toEqual(1);
    });
})