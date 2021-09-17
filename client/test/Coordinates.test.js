import './jestConfig/enzyme.config.js';
import {getCoordinates} from '../src/utils/coordinates';

describe('Coordinates', () => {

    it('parses coordinates correctly', () => {
        const valid = [
            '11.1515,-124.15155',
            '-14.5552 , 55.25252',
            '14.151515, 51.151515',
            '17, 111',
            '11.1001, 1.0',
            '1.0, 11.1114',
            '90.0000, 180.0000',   // max lat and long
            '-90, -180', // min lat and long
            // Other formats taken from npm page for coordinate parser. Credit to its developer(s).
            `40.123° N 74.123° W`,
            `40° 7.38' , -74° 7.38’`,
            `N40°7’22.8, W74°7’22.8"`,
            `400722.8N740722.8W`,
            `40:7:22.8N 74:7:22.8W`,
            `40.123N 74.123W`,
            `40d 7’ 23" N 74d 7’ 23" W`,
            `40° 7.38, -74° 7.38`
            ]
            const invalid = [
                '15,15151, 51,15151', // Not a valid format.
                '1O.11525,55.767676', // O (the letter) instead of 0
            ]

            for (let latLong in valid) {
                expect(getCoordinates(valid[latLong])).toBeDefined();
            }
    
            for (let latLong in invalid) {
                expect(getCoordinates(invalid[latLong])).toBeNull();
            }
    })
})