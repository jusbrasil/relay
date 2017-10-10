/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule RelayCompatMutations
 * 
 * @format
 */

'use strict';

var invariant = require('fbjs/lib/invariant');
var warning = require('fbjs/lib/warning');

var _require = require('./RelayCompatEnvironment'),
    getRelayClassicEnvironment = _require.getRelayClassicEnvironment,
    getRelayModernEnvironment = _require.getRelayModernEnvironment;

var _require2 = require('relay-runtime'),
    applyOptimisticMutation = _require2.applyOptimisticMutation,
    commitMutation = _require2.commitMutation;

var RelayCompatMutations = {
  commitUpdate: function commitUpdate(environment, config) {
    var relayStaticEnvironment = getRelayModernEnvironment(environment);
    if (relayStaticEnvironment) {
      return commitMutation(relayStaticEnvironment, config);
    } else {
      var relayClassicEnvironment = getRelayClassicEnvironment(environment);
      !relayClassicEnvironment ? process.env.NODE_ENV !== 'production' ? invariant(false, 'RelayCompatMutations: Expected an object that conforms to the ' + '`RelayEnvironmentInterface`, got `%s`.', environment) : invariant(false) : void 0;
      return commitRelayClassicMutation(
      // getRelayClassicEnvironment returns a RelayEnvironmentInterface
      // (classic APIs), but we need the modern APIs on old core here.
      relayClassicEnvironment, config);
    }
  },
  applyUpdate: function applyUpdate(environment, config) {
    var relayStaticEnvironment = getRelayModernEnvironment(environment);
    if (relayStaticEnvironment) {
      return applyOptimisticMutation(relayStaticEnvironment, config);
    } else {
      var relayClassicEnvironment = getRelayClassicEnvironment(environment);
      !relayClassicEnvironment ? process.env.NODE_ENV !== 'production' ? invariant(false, 'RelayCompatMutations: Expected an object that conforms to the ' + '`RelayEnvironmentInterface`, got `%s`.', environment) : invariant(false) : void 0;
      return applyRelayClassicMutation(
      // getRelayClassicEnvironment returns a RelayEnvironmentInterface
      // (classic APIs), but we need the modern APIs on old core here.
      relayClassicEnvironment, config);
    }
  }
};

function commitRelayClassicMutation(environment, _ref) {
  var configs = _ref.configs,
      mutation = _ref.mutation,
      onCompleted = _ref.onCompleted,
      onError = _ref.onError,
      optimisticResponse = _ref.optimisticResponse,
      variables = _ref.variables,
      uploadables = _ref.uploadables;
  var getOperation = environment.unstable_internal.getOperation;

  var operation = getOperation(mutation);
  // TODO: remove this check after we fix flow.
  if (typeof optimisticResponse === 'function') {
    process.env.NODE_ENV !== 'production' ? warning(false, 'RelayCompatMutations: Expected `optimisticResponse` to be an object, ' + 'received a function.') : void 0;
    optimisticResponse = optimisticResponse();
  }
  if (optimisticResponse) {
    optimisticResponse = validateOptimisticResponse(operation, optimisticResponse);
  }

  return environment.sendMutation({
    configs: configs || [],
    operation: operation,
    onCompleted: onCompleted,
    onError: onError,
    optimisticResponse: optimisticResponse,
    variables: variables,
    uploadables: uploadables
  });
}

function applyRelayClassicMutation(environment, _ref2) {
  var configs = _ref2.configs,
      mutation = _ref2.mutation,
      optimisticResponse = _ref2.optimisticResponse,
      variables = _ref2.variables;
  var getOperation = environment.unstable_internal.getOperation;

  var operation = getOperation(mutation);

  // RelayClassic can't update anything without response.
  if (!optimisticResponse) {
    return { dispose: function dispose() {} };
  }

  optimisticResponse = validateOptimisticResponse(operation, optimisticResponse);
  return environment.applyMutation({
    configs: configs || [],
    operation: operation,
    optimisticResponse: optimisticResponse,
    variables: variables
  });
}

function validateOptimisticResponse(operation, optimisticResponse) {
  if (operation.node.kind === 'Mutation' && operation.node.calls && operation.node.calls.length === 1) {
    var mutationRoot = operation.node.calls[0].name;
    if (optimisticResponse[mutationRoot]) {
      return optimisticResponse[mutationRoot];
    } else {
      process.env.NODE_ENV !== 'production' ? warning(false, 'RelayCompatMutations: Expected result from `optimisticResponse`' + 'to contain the mutation name `%s` as a property, got `%s`', mutationRoot, optimisticResponse) : void 0;
    }
  }
  return optimisticResponse;
}

module.exports = RelayCompatMutations;