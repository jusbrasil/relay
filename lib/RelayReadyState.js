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

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var resolveImmediate = require('fbjs/lib/resolveImmediate');
var warning = require('fbjs/lib/warning');

/**
 * @internal
 */
var RelayReadyState = function () {
  function RelayReadyState(onReadyStateChange) {
    (0, _classCallCheck3['default'])(this, RelayReadyState);

    this._onReadyStateChange = onReadyStateChange;
    this._readyState = {
      aborted: false,
      done: false,
      error: null,
      events: [],
      ready: false,
      stale: false
    };
    this._scheduled = false;
  }

  RelayReadyState.prototype.update = function update(nextReadyState, newEvents) {
    var prevReadyState = this._readyState;
    if (prevReadyState.aborted) {
      return;
    }
    if (prevReadyState.done || prevReadyState.error) {
      if (nextReadyState.stale) {
        if (prevReadyState.error) {
          this._mergeState(nextReadyState, newEvents);
        }
        // Do nothing if stale data comes after server data.
      } else if (!nextReadyState.aborted) {
        process.env.NODE_ENV !== 'production' ? warning(false, 'RelayReadyState: Invalid state change from `%s` to `%s`.', JSON.stringify(prevReadyState), JSON.stringify(nextReadyState)) : void 0;
      }
      return;
    }
    this._mergeState(nextReadyState, newEvents);
  };

  RelayReadyState.prototype._mergeState = function _mergeState(nextReadyState, newEvents) {
    var _this = this;

    this._readyState = (0, _extends3['default'])({}, this._readyState, nextReadyState, {
      events: newEvents && newEvents.length ? [].concat((0, _toConsumableArray3['default'])(this._readyState.events), (0, _toConsumableArray3['default'])(newEvents)) : this._readyState.events
    });
    if (this._scheduled) {
      return;
    }
    this._scheduled = true;
    resolveImmediate(function () {
      _this._scheduled = false;
      _this._onReadyStateChange(_this._readyState);
    });
  };

  return RelayReadyState;
}();

module.exports = RelayReadyState;