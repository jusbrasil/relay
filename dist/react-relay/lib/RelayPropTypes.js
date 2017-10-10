/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule RelayPropTypes
 * 
 * @format
 */

'use strict';

var PropTypes = require('prop-types');

var isClassicRelayEnvironment = require('./isClassicRelayEnvironment');
var isRelayContainer = require('./isRelayContainer');
var isRelayContext = require('./isRelayContext');
var isRelayEnvironment = require('./isRelayEnvironment');
var sprintf = require('fbjs/lib/sprintf');

var RelayPropTypes = {
  Container: function Container(props, propName, componentName) {
    var component = props[propName];
    if (component == null) {
      return new Error(sprintf('Required prop `%s` was not specified in `%s`.', propName, componentName));
    } else if (!isRelayContainer(component)) {
      return new Error(sprintf('Invalid prop `%s` supplied to `%s`, expected a RelayContainer.', propName, componentName));
    }
    return null;
  },
  Environment: function Environment(props, propName, componentName) {
    var context = props[propName];
    if (!isClassicRelayEnvironment(context) || !isRelayEnvironment(context)) {
      return new Error(sprintf('Invalid prop/context `%s` supplied to `%s`, expected `%s` to be ' + 'an object conforming to the `RelayEnvironment` interface.', propName, componentName, context));
    }
    return null;
  },


  QueryConfig: PropTypes.shape({
    name: PropTypes.string.isRequired,
    params: PropTypes.object.isRequired,
    queries: PropTypes.object.isRequired
  }),

  ClassicRelay: function ClassicRelay(props, propName, componentName) {
    var relay = props[propName];
    if (!isRelayContext(relay) || !isClassicRelayEnvironment(relay.environment)) {
      return new Error(sprintf('Invalid prop/context `%s` supplied to `%s`, expected `%s` to be ' + 'an object with a classic `environment` implementation and `variables`.', propName, componentName, relay));
    }
    return null;
  },
  Relay: function Relay(props, propName, componentName) {
    var relay = props[propName];
    if (!isRelayContext(relay)) {
      return new Error(sprintf('Invalid prop/context `%s` supplied to `%s`, expected `%s` to be ' + 'an object with an `environment` and `variables`.', propName, componentName, relay));
    }
    return null;
  }
};

module.exports = RelayPropTypes;