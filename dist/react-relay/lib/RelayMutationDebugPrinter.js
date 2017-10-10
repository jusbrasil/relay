/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule RelayMutationDebugPrinter
 * 
 * @format
 */

'use strict';

var printRelayQuery = require('./printRelayQuery');

/**
 * @internal
 *
 * Helper functions to print mutation queries for debugging purposes.
 */
var RelayMutationDebugPrinter = {
  printOptimisticMutation: function printOptimisticMutation(query, response) {
    /* eslint-disable no-console-disallow */
    if (!console.groupCollapsed || !console.groupEnd) {
      return;
    }
    RelayMutationDebugPrinter.printMutation(query, 'Optimistic');

    console.groupCollapsed('Optimistic Response');
    console.log(response);
    console.groupEnd();
    /* eslint-enable no-console-disallow */
  },
  printMutation: function printMutation(query, name) {
    /* eslint-disable no-console-disallow */
    if (!console.groupCollapsed || !console.groupEnd) {
      return;
    }
    var printedQuery = query ? printRelayQuery(query) : null;
    name = name || 'Mutation';

    console.groupCollapsed(name + ' Variables');
    console.log(printedQuery ? printedQuery.variables : {});
    console.groupEnd();

    console.groupCollapsed(name + ' Query');
    console.log(printedQuery ? printedQuery.text : '');
    console.groupEnd();
    /* eslint-enable no-console-disallow */
  }
};

module.exports = RelayMutationDebugPrinter;