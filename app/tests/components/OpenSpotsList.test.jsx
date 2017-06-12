import React from 'react';
import {Provider} from 'react-redux';
import expect from 'expect';
import ReactTestUtils from 'react-dom/test-utils';


var {configure} = require('../../store/configureStore');
import ConnectedOpenSpotsList, {OpenSpotsList} from '../../components/OpenSpotsList';
import ConnectedOpenSpot from '../../components/OpenSpot';

describe('OpenSpotsList', () => {
    it('should exist', () => {
        expect(OpenSpotsList).toExist();
    });

    it('should render one OpenSpot component for each open spot', () => {
            var openSpotsTest = [
                {
                    lat: 43.303,
                    lng: -23.2030,
                    id: 5,
                    available: true,
                    markedOpenAt: "12:40",
                    markedClosedAt: undefined
                },
                {
                    lat: 33.303,
                    lng: -63.2030,
                    id: 7,
                    available: true,
                    markedOpenAt: "5:40",
                    markedClosedAt: undefined
                }
            ];
        var store = configure({
            locations: openSpotsTest
        });
        var provider = ReactTestUtils.renderIntoDocument(
            <Provider store={store}>
                <ConnectedOpenSpotsList/>
            </Provider>
        );

        var openSpotsList = ReactTestUtils.findRenderedComponentWithType(provider, ConnectedOpenSpotsList);
        var openSpots = ReactTestUtils.scryRenderedComponentsWithType(openSpotsList, ConnectedOpenSpot);
        expect(openSpots.length).toEqual(2);
    });
});