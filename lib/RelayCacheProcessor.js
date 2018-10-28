/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */

'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var RelayQuery = require('./RelayQuery');
var RelayQueryVisitor = require('./RelayQueryVisitor');

var forEachRootCallArg = require('./forEachRootCallArg');
var invariant = require('fbjs/lib/invariant');
var isEmpty = require('fbjs/lib/isEmpty');
var warning = require('fbjs/lib/warning');

/**
 * An asynchronous traversal that knows how to read roots and nodes from a
 * `CacheManager`. Root reads yield the `dataID` of the root, if found.
 * Node reads yield the `Record` associated with a supplied `dataID`, if found.
 *
 * Visitors: Ensure that only one read is ever in flight for a given root/node.
 *           Maintain a list of states to process after each read completes.
 * Queuers:  Perform the work of kicking off a root/node read.
 * Handlers: Subclasses of `RelayCacheProcessor` can implement this method to
 *           actually perform work after a root/node read completes.
 */
var RelayCacheProcessor = function (_RelayQueryVisitor) {
  (0, _inherits3['default'])(RelayCacheProcessor, _RelayQueryVisitor);

  function RelayCacheProcessor(cacheManager, callbacks) {
    (0, _classCallCheck3['default'])(this, RelayCacheProcessor);

    var _this = (0, _possibleConstructorReturn3['default'])(this, _RelayQueryVisitor.call(this));

    _this._cacheManager = cacheManager;
    _this._callbacks = callbacks;
    _this._pendingNextStates = {};
    _this._pendingRoots = {};
    _this._state = 'PENDING';
    return _this;
  }

  RelayCacheProcessor.prototype.abort = function abort() {
    process.env.NODE_ENV !== 'production' ? warning(this._state === 'LOADING', 'RelayCacheProcessor: Can only abort an in-progress read operation.') : void 0;
    this._state = 'COMPLETED';
  };

  RelayCacheProcessor.prototype.handleFailure = function handleFailure(error) {
    !(this._state !== 'COMPLETED') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'RelayStoreReader: Query set already failed/completed.') : invariant(false) : void 0;
    this._state = 'COMPLETED';
    this._callbacks.onFailure && this._callbacks.onFailure(error);
  };

  RelayCacheProcessor.prototype.handleNodeVisited = function handleNodeVisited(node, dataID, record, nextState) {
    return;
  };

  RelayCacheProcessor.prototype.handleIdentifiedRootVisited = function handleIdentifiedRootVisited(query, dataID, identifyingArgKey, nextState) {
    return;
  };

  RelayCacheProcessor.prototype.process = function process(processorFn) {
    !(this._state === 'PENDING') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'RelayCacheProcessor: A `read` is in progress.') : invariant(false) : void 0;
    this._state = 'LOADING';
    processorFn();
    if (this._isDone()) {
      this._handleSuccess();
    }
  };

  RelayCacheProcessor.prototype.queueIdentifiedRoot = function queueIdentifiedRoot(query, identifyingArgKey, nextState) {
    var _this2 = this;

    var storageKey = query.getStorageKey();
    this._cacheManager.readRootCall(storageKey, identifyingArgKey || '', function (error, dataID) {
      if (_this2._state === 'COMPLETED') {
        return;
      }
      if (error) {
        _this2.handleFailure(error);
        return;
      }
      _this2.handleIdentifiedRootVisited(query, dataID, identifyingArgKey, nextState);
      var rootKey = _this2._getRootKey(storageKey, identifyingArgKey);
      var pendingRoots = _this2._pendingRoots[rootKey];
      delete _this2._pendingRoots[rootKey];
      for (var ii = 0; ii < pendingRoots.length; ii++) {
        if (_this2._state === 'COMPLETED') {
          return;
        }
        _this2.traverse(pendingRoots[ii], nextState);
      }
      if (_this2._isDone()) {
        _this2._handleSuccess();
      }
    });
  };

  RelayCacheProcessor.prototype.queueNode = function queueNode(node, dataID, nextState) {
    var _this3 = this;

    this._cacheManager.readNode(dataID, function (error, record) {
      if (_this3._state === 'COMPLETED') {
        return;
      }
      if (error) {
        _this3.handleFailure(error);
        return;
      }
      _this3.handleNodeVisited(node, dataID, record, nextState);
      var pendingNextStates = _this3._pendingNextStates[dataID];
      delete _this3._pendingNextStates[dataID];
      for (var ii = 0; ii < pendingNextStates.length; ii++) {
        if (_this3._state === 'COMPLETED') {
          return;
        }
        _this3.traverse(node, pendingNextStates[ii]);
      }
      if (_this3._isDone()) {
        _this3._handleSuccess();
      }
    });
  };

  RelayCacheProcessor.prototype.visitIdentifiedRoot = function visitIdentifiedRoot(query, identifyingArgKey, nextState) {
    var storageKey = query.getStorageKey();
    var rootKey = this._getRootKey(storageKey, identifyingArgKey);
    if (this._pendingRoots.hasOwnProperty(rootKey)) {
      this._pendingRoots[rootKey].push(query);
    } else {
      this._pendingRoots[rootKey] = [query];
      this.queueIdentifiedRoot(query, identifyingArgKey, nextState);
    }
  };

  RelayCacheProcessor.prototype.visitNode = function visitNode(node, dataID, nextState) {
    if (this._pendingNextStates.hasOwnProperty(dataID)) {
      this._pendingNextStates[dataID].push(nextState);
    } else {
      this._pendingNextStates[dataID] = [nextState];
      this.queueNode(node, dataID, nextState);
    }
  };

  RelayCacheProcessor.prototype.visitRoot = function visitRoot(query, nextState) {
    var _this4 = this;

    forEachRootCallArg(query, function (_ref) {
      var identifyingArgKey = _ref.identifyingArgKey;

      if (_this4._state === 'COMPLETED') {
        return;
      }
      _this4.visitIdentifiedRoot(query, identifyingArgKey, nextState);
    });
  };

  RelayCacheProcessor.prototype._getRootKey = function _getRootKey(storageKey, identifyingArgKey) {
    return storageKey + '*' + (identifyingArgKey || '');
  };

  RelayCacheProcessor.prototype._handleSuccess = function _handleSuccess() {
    !(this._state !== 'COMPLETED') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'RelayStoreReader: Query set already failed/completed.') : invariant(false) : void 0;
    this._state = 'COMPLETED';
    this._callbacks.onSuccess && this._callbacks.onSuccess();
  };

  RelayCacheProcessor.prototype._isDone = function _isDone() {
    return isEmpty(this._pendingRoots) && isEmpty(this._pendingNextStates) && this._state === 'LOADING';
  };

  return RelayCacheProcessor;
}(RelayQueryVisitor);

module.exports = RelayCacheProcessor;