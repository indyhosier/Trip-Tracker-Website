import './jestConfig/enzyme.config.js'
import React from 'react' 
import { shallow } from 'enzyme'
import Paragraph from '../src/components/Paragraph/Paragraph.js'
import { Media } from 'reactstrap'

describe('<Paragraph />', () => {
    it ('renders the Member cards', ()=> {
        const wrapper = shallow(<Paragraph />);
        expect(wrapper.find(Media).length).toEqual(3);
    })
})