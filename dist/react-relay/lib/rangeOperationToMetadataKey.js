/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule rangeOperationToMetadataKey
 * 
 * @format
 */

'use strict';

var GraphQLMutatorConstants = require('./GraphQLMutatorConstants');

var mapObject = require('fbjs/lib/mapObject');

var RANGE_OPERATION_METADATA_PREFIX = '__rangeOperation';
var RANGE_OPERATION_METADATA_SUFFIX = '__';

/**
 * @internal
 *
 * A map from developer-friendly operation names ("append", "prepend", "remove")
 * to internal book-keeping keys used to store metadata on records
 * ("__rangeOperationAppend__" etc).
 */
var rangeOperationToMetadataKey = mapObject(GraphQLMutatorConstants.RANGE_OPERATIONS, function (value, key, object) {
  var capitalizedKey = key[0].toUpperCase() + key.slice(1);
  return RANGE_OPERATION_METADATA_PREFIX + capitalizedKey + RANGE_OPERATION_METADATA_SUFFIX;
});

module.exports = Object.freeze(rangeOperationToMetadataKey);