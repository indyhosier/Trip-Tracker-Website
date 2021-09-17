import './jestConfig/enzyme.config.js'
import React from 'react' 
import { shallow } from 'enzyme'
import About from '../src/components/About/About';
import CardMember from '../src/components/TeamMember/CardMember';
import TeamImage from '../src/components/TeamImage/TeamImage';

describe('<About />', () => {
    it ('renders the Member cards', ()=> {
        const wrapper = shallow(<About />);
        expect(wrapper.find(CardMember).length).toEqual(4);
    })
    it ('renders the TeamImage', ()=> {
        const wrapper = shallow(<About />);
        expect(wrapper.find(TeamImage).length).toEqual(1);
    })
    it ('tests team image return', ()=> { 
        const wrapper = shallow(<TeamImage src="" />);
        expect(wrapper.children().length).toEqual(1);
    })
})