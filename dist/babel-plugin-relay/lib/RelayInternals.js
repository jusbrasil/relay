/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule RelayInternals
 * 
 * @format
 */

'use strict';

var RelayStore = require('./RelayStore');

var flattenRelayQuery = require('./flattenRelayQuery');
var printRelayQuery = require('./printRelayQuery');

/**
 * This module contains internal Relay modules that we expose for development
 * tools. They should be considered private APIs.
 *
 * @internal
 */
var RelayInternals = {
  NetworkLayer: RelayStore.getStoreData().getNetworkLayer(),
  DefaultStoreData: RelayStore.getStoreData(),
  flattenRelayQuery: flattenRelayQuery,
  printRelayQuery: printRelayQuery
};

module.exports = RelayInternals;