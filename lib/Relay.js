/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule Relay
 * 
 */

'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _promise = require('fbjs/lib/Promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var RelayDefaultNetworkLayer = require('./RelayDefaultNetworkLayer');
var RelayPublic = require('./RelayPublic');
var RelayStore = require('./RelayStore');
var warning = require('fbjs/lib/warning');

if (process.env.NODE_ENV !== 'production') {
  process.env.NODE_ENV !== 'production' ? warning(typeof _promise2['default'] === 'function' && Array.prototype.find, 'Relay relies on polyfills for ES6 features in older browsers. ' + 'Babel provides a good one: https://babeljs.io/docs/usage/polyfill/') : void 0;
}

// By default, assume that GraphQL is served at `/graphql` on the same domain.
// To override, use `Relay.injectNetworkLayer`.
RelayStore.injectDefaultNetworkLayer(new RelayDefaultNetworkLayer('/graphql'));

module.exports = (0, _extends3['default'])({}, RelayPublic, {
  // Expose the default network layer to allow convenient re-configuration.
  DefaultNetworkLayer: RelayDefaultNetworkLayer
});