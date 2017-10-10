/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule commitRelayModernMutation
 * 
 * @format
 */

'use strict';

var invariant = require('fbjs/lib/invariant');
var isRelayModernEnvironment = require('./isRelayModernEnvironment');
var setRelayModernMutationConfigs = require('./setRelayModernMutationConfigs');
var warning = require('fbjs/lib/warning');

/**
 * Higher-level helper function to execute a mutation against a specific
 * environment.
 */
function commitRelayModernMutation(environment, config) {
  !isRelayModernEnvironment(environment) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'commitRelayModernMutation: expect `environment` to be an instance of ' + '`RelayModernEnvironment`.') : invariant(false) : void 0;
  var _environment$unstable = environment.unstable_internal,
      createOperationSelector = _environment$unstable.createOperationSelector,
      getOperation = _environment$unstable.getOperation;

  var mutation = getOperation(config.mutation);
  var optimisticResponse = config.optimisticResponse,
      optimisticUpdater = config.optimisticUpdater,
      updater = config.updater;
  var configs = config.configs,
      onError = config.onError,
      variables = config.variables,
      uploadables = config.uploadables;

  var operation = createOperationSelector(mutation, variables);
  // TODO: remove this check after we fix flow.
  if (typeof optimisticResponse === 'function') {
    optimisticResponse = optimisticResponse();
    process.env.NODE_ENV !== 'production' ? warning(false, 'commitRelayModernMutation: Expected `optimisticResponse` to be an object, ' + 'received a function.') : void 0;
  }
  if (optimisticResponse && mutation.query.selections && mutation.query.selections.length === 1 && mutation.query.selections[0].kind === 'LinkedField') {
    var mutationRoot = mutation.query.selections[0].name;
    process.env.NODE_ENV !== 'production' ? warning(optimisticResponse[mutationRoot], 'commitRelayModernMutation: Expected `optimisticResponse` to be wrapped ' + 'in mutation name `%s`', mutationRoot) : void 0;
  }
  if (configs) {
    var _setRelayModernMutati = setRelayModernMutationConfigs(configs, mutation, optimisticUpdater, updater);

    optimisticUpdater = _setRelayModernMutati.optimisticUpdater;
    updater = _setRelayModernMutati.updater;
  }
  return environment.executeMutation({
    operation: operation,
    optimisticResponse: optimisticResponse,
    optimisticUpdater: optimisticUpdater,
    updater: updater,
    uploadables: uploadables
  }).subscribeLegacy({
    onNext: function onNext(payload) {
      // NOTE: commitRelayModernMutation has a non-standard use of
      // onCompleted() by calling it on every next value. It may be called
      // multiple times if a network request produces multiple responses.
      var onCompleted = config.onCompleted;

      if (onCompleted) {
        var snapshot = environment.lookup(operation.fragment);
        onCompleted(snapshot.data, payload.errors);
      }
    },
    onError: onError
  });
}

module.exports = commitRelayModernMutation;