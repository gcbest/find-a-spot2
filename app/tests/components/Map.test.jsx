import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import expect from 'expect';
var $ = require('jQuery');
import ReactTestUtils from 'react-dom/test-utils';

var {configure} = require('../../store/configureStore');
import Map from '../../components/Map';

describe('Map', () => {
   it('should exist', () => {
      expect(Map).toExist();
   });

    it('should have only one map displayed', () => {
        var store = configure();
        var provider = ReactTestUtils.renderIntoDocument(
            <Provider store={store}>
                <Map/>
            </Provider>
        );
        // var map = ReactTestUtils.renderIntoDocument(<Map/>);
        var $el = $(ReactDOM.findDOMNode(provider));

        var $map = $el.find('#map');
        expect($map.length).toBe(1);

    });
});