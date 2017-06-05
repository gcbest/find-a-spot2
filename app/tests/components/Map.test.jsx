import React from 'react';
import ReactDOM from 'react-dom';
import expect from 'expect';
var $ = require('jQuery');
import TestUtils from 'react-addons-test-utils';

import Map from '../../components/Map';

describe('Map', () => {
   it('should exist', () => {
       var map = TestUtils.renderIntoDocument(<Map/>);
      expect(map).toExist();
   });

});