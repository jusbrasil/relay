/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule RelayDefaultHandlerProvider
 * 
 * @format
 */

'use strict';

var RelayConnectionHandler = require('./RelayConnectionHandler');
var RelayViewerHandler = require('./RelayViewerHandler');

var invariant = require('fbjs/lib/invariant');

function RelayDefaultHandlerProvider(handle) {
  switch (handle) {
    case 'connection':
      return RelayConnectionHandler;
    case 'viewer':
      return RelayViewerHandler;
  }
  !false ? process.env.NODE_ENV !== 'production' ? invariant(false, 'RelayDefaultHandlerProvider: No handler provided for `%s`.', handle) : invariant(false) : void 0;
}

module.exports = RelayDefaultHandlerProvider;