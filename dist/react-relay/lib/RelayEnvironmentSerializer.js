/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule RelayEnvironmentSerializer
 * 
 * @format
 */

'use strict';

var RelayEnvironment = require('./RelayEnvironment');
var RelayStoreData = require('./RelayStoreData');

var RelayEnvironmentSerializer = {
  serialize: function serialize(relayEnvironment) {
    return JSON.stringify(relayEnvironment.getStoreData());
  },
  deserialize: function deserialize(str) {
    return new RelayEnvironment(RelayStoreData.fromJSON(JSON.parse(str)));
  }
};

module.exports = RelayEnvironmentSerializer;