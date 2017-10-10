/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule ReactRelayClassicExports
 * 
 * @format
 */

'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var RelayDefaultNetworkLayer = require('./RelayDefaultNetworkLayer');
var RelayPublic = require('./RelayPublic');
var RelayStore = require('./RelayStore');

// As early as possible, check for the existence of the JavaScript globals which
// React Relay relies upon, and produce a clear message if they do not exist.
if (process.env.NODE_ENV !== 'production') {
  if (typeof Map !== 'function' || typeof Set !== 'function' || typeof Promise !== 'function' || typeof Object.assign !== 'function' || typeof Array.prototype.find !== 'function') {
    throw new Error('react-relay requires Map, Set, Promise, Object.assign, and Array#find ' + 'to exist. Use a polyfill to provide these for older browsers.');
  }
}

// By default, assume that GraphQL is served at `/graphql` on the same domain.
// To override, use `Relay.injectNetworkLayer`.
RelayStore.injectDefaultNetworkLayer(new RelayDefaultNetworkLayer('/graphql'));

module.exports = (0, _extends3['default'])({}, RelayPublic, {
  // Expose the default network layer to allow convenient re-configuration.
  DefaultNetworkLayer: RelayDefaultNetworkLayer
});