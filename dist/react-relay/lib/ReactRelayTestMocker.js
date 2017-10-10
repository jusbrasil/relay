/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule ReactRelayTestMocker
 * 
 * @format
 */

'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var RelayNetwork = require('./RelayNetwork');

var areEqual = require('fbjs/lib/areEqual');
var emptyFunction = require('fbjs/lib/emptyFunction');
var invariant = require('fbjs/lib/invariant');
var isRelayModernEnvironment = require('./isRelayModernEnvironment');
var warning = require('fbjs/lib/warning');

/**
 * The next id to return from `generateId()`.
 */
var nextId = 0;

/**
 * The pending network fetches for the mocked network.
 */
var pendingFetches = [];

var ReactRelayTestMocker = function () {
  function ReactRelayTestMocker(env) {
    (0, _classCallCheck3['default'])(this, ReactRelayTestMocker);

    this._defaults = {};

    if (isRelayModernEnvironment(env)) {
      this._mockNetworkLayer(env);
    } else {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Netork mocking is currently only supported in Relay Modern. ' + 'You will not be able to resolve requests made with Relay ' + 'Classic environments.') : void 0;
    }

    this._environment = env;
  }

  /**
   * Get a unique id number (as a string). Note: will wrap around after 2^32
   * calls, if your test needs that many IDs.
   *
   * @returns a unique id string
   */


  ReactRelayTestMocker.generateId = function generateId() {
    var toRet = nextId.toString();
    nextId++;

    return toRet;
  };

  /**
   * Create a unique identifier for a (query, variables) pair.
   * @param operation: the operation associated with the query
   * @param variables: the variables associated with this invocation of the
   * query
   *
   * @returns a string which can later be used to uniquely identify this query
   * in the list of pending queries
   */


  ReactRelayTestMocker.getIdentifier = function getIdentifier(operation) {
    var queryName = operation.name;
    return queryName;
  };

  /**
   * Remove variables that we don't need from the query that will make it more
   * annoying to test (e.g. client_mutation_id, actor_id)
   */


  ReactRelayTestMocker.stripUnused = function stripUnused(variables) {
    if (variables.input) {
      var toRemove = ['client_mutation_id', 'actor_id', 'clientMutationId', 'actorId'];
      toRemove.forEach(function (item) {
        return variables.input[item] = undefined;
      });
    }

    return variables;
  };

  /**
   * Replace the environment's network layer with a mocked out one to allow for
   * better testing. Mocking the network allows testing without using a mocked
   * out QueryRenderer, and will allow for easier testing of components wrapped
   * in refetch containers, for example. It also allows test writers to see how
   * their components behave under error conditions.
   */


  ReactRelayTestMocker.prototype._mockNetworkLayer = function _mockNetworkLayer(env) {
    var _this = this;

    var fetch = function fetch(operation, variables, cacheConfig) {
      var resolve = emptyFunction;
      var reject = emptyFunction;
      var promise = new Promise(function (res, rej) {
        resolve = res;
        reject = rej;
      });

      var strippedVars = ReactRelayTestMocker.stripUnused(variables);
      var ident = ReactRelayTestMocker.getIdentifier(operation);
      var createOperationSelector = env.unstable_internal.createOperationSelector;

      // there's a default value for this query, use it

      if (_this._defaults[ident]) {
        var _payload = _this._defaults[ident];
        if (typeof _payload === 'function') {
          return _payload(strippedVars);
        } else {
          return _payload;
        }
      }

      var operationSelector = createOperationSelector(operation, variables);
      pendingFetches.push({
        ident: ident,
        cacheConfig: cacheConfig,
        deferred: { resolve: resolve, reject: reject },
        operation: operation,
        variables: variables,
        operationSelector: operationSelector
      });
      return promise;
    };

    function isLoading(ident) {
      return pendingFetches.some(function (pending) {
        return pending.ident === ident;
      });
    }

    function resolveRawQuery(toResolve, payload) {
      pendingFetches = pendingFetches.filter(function (pending) {
        return pending !== toResolve;
      });

      var deferred = toResolve.deferred;

      deferred.resolve(payload);
    }

    function rejectQuery(toResolve, payload) {
      pendingFetches = pendingFetches.filter(function (pending) {
        return pending !== toResolve;
      });

      var deferred = toResolve.deferred;

      deferred.reject(payload.error);
    }

    env.mock = {
      isLoading: isLoading,
      rejectQuery: rejectQuery,
      resolveRawQuery: resolveRawQuery,
      fetch: fetch
    };

    env.hasMockedNetwork = true;

    env.__setNet(RelayNetwork.create(fetch));
    return env;
  };

  ReactRelayTestMocker.prototype._getDefaults = function _getDefaults() {
    return this._defaults;
  };

  /**
   * set a default payload for a given query
   */


  ReactRelayTestMocker.prototype.setDefault = function setDefault(toSet) {
    var query = toSet.query,
        payload = toSet.payload;

    var operation = query;
    var ident = ReactRelayTestMocker.getIdentifier(operation);

    this._defaults[ident] = payload;
  };

  /**
   * remove a default payload for a given query
   */


  ReactRelayTestMocker.prototype.unsetDefault = function unsetDefault(toUnset) {
    var query = toUnset.query;

    var operation = query;
    var ident = ReactRelayTestMocker.getIdentifier(operation);

    delete this._defaults[ident];
  };

  /**
   * Write directly to the Relay store instead of trying to resolve a query that
   * was sent via the network.
   *
   * Use this method when testing a component wrapped in a fragment container
   * (via `createFragmentContainer`). The component under test should also be
   * wrapped in a `RelayTestRenderer`.
   */


  ReactRelayTestMocker.prototype.dataWrite = function dataWrite(config) {
    var query = config.query,
        variables = config.variables,
        payload = config.payload;
    var createOperationSelector = this._environment.unstable_internal.createOperationSelector;


    var operationSelector = createOperationSelector(query, variables);

    !(payload.data != null && payload.errors === undefined) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Only `data` can be written when using `writeDirect`. You may need to ' + 'wrap your payload in an object like `{data: payload}`.') : invariant(false) : void 0;

    this._environment.commitPayload(operationSelector, payload.data);
  };

  /**
   * Write the data specified in config's payload to the instance's environment.
   * NOTE: callers may need to invoke `jest.runOnlyPendingTimers()` after
   * calling this function.
   *
   * @param config: an object containing the data to write and the query and
   * variables that the payload is simulating a response to
   */


  ReactRelayTestMocker.prototype.networkWrite = function networkWrite(config) {
    !this._environment.hasMockedNetwork ? process.env.NODE_ENV !== 'production' ? invariant(false, 'You cannot resolve queries without a mocked environment. Did you mean ' + 'to use `writeDirect` instead?') : invariant(false) : void 0;
    var query = config.query,
        variables = config.variables,
        payload = config.payload;


    var ident = ReactRelayTestMocker.getIdentifier(query);

    var usedVars = void 0;

    if (variables) {
      var createOperationSelector = this._environment.unstable_internal.createOperationSelector;

      var _operationSelector = createOperationSelector(query, variables);
      usedVars = ReactRelayTestMocker.stripUnused(_operationSelector.variables);
    }

    var toResolve = void 0;
    pendingFetches.forEach(function (pending) {
      var pendingVars = pending.variables;
      if (pending.ident === ident) {
        !(!toResolve || variables) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Multiple queries with the same name are currently pending. You ' + 'should pass variables to `write` so that it can determine which ' + 'to resolve') : invariant(false) : void 0;
        if (variables) {
          if (areEqual(pendingVars, usedVars)) {
            toResolve = pending;
          }
        } else {
          toResolve = pending;
        }
      }
    });

    var varMessage = usedVars ? ' - variables: ' + JSON.stringify(usedVars) : '';

    !toResolve ? process.env.NODE_ENV !== 'production' ? invariant(false, 'You are attempting to resolve a query that has not been fetched ' + '(%s%s).\n\tPlease ensure you passed the correct variables, or use ' + '`writeDirect` instead.', ident, varMessage) : invariant(false) : void 0;

    var realPayload = typeof payload === 'function' ? payload(toResolve.variables) : payload;

    // if there are errors, reject the query
    if (realPayload.errors != null && realPayload.errors.length > 0) {
      this._environment.mock.rejectQuery(toResolve, {
        error: realPayload.errors[0]
      });
    } else {
      this._environment.mock.resolveRawQuery(toResolve, realPayload);
    }
  };

  return ReactRelayTestMocker;
}();

module.exports = ReactRelayTestMocker;